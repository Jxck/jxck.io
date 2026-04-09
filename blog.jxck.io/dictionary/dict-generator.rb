#!/usr/bin/env ruby
require "optparse"
require "digest"
require "base64"

InputFile = Struct.new(:abs_path, :rel_path, :data, :slice_ids, :selected_ranges, keyword_init: true)
Candidate = Struct.new(:file_index, :score, :position, :generation, keyword_init: true)

class MaxHeap
  def initialize(&higher_priority)
    @data = []
    @higher_priority = higher_priority
  end

  def empty?
    @data.empty?
  end

  def peek
    @data[0]
  end

  def higher_priority?(left, right)
    @higher_priority.call(left, right)
  end

  def push(item)
    @data << item
    sift_up(@data.length - 1)
  end

  def pop
    return if @data.empty?

    top = @data[0]
    tail = @data.pop
    if !@data.empty?
      @data[0] = tail
      sift_down(0)
    end
    top
  end

  private

  def sift_up(index)
    while index > 0
      parent = (index - 1) / 2
      break unless higher_priority?(@data[index], @data[parent])

      @data[index], @data[parent] = @data[parent], @data[index]
      index = parent
    end
  end

  def sift_down(index)
    size = @data.length
    loop do
      left = (index * 2) + 1
      right = left + 1
      best = index

      if left < size && higher_priority?(@data[left], @data[best])
        best = left
      end

      if right < size && higher_priority?(@data[right], @data[best])
        best = right
      end

      break if best == index

      @data[index], @data[best] = @data[best], @data[index]
      index = best
    end
  end
end

def relative_path(path, cwd)
  prefix = "#{cwd}/"
  return path.delete_prefix(prefix) if path.start_with?(prefix)

  path
end

def qualifying_slice?(slice_id, active_scores)
  slice_id && slice_id >= 0 && active_scores[slice_id].positive?
end

def add_range(ranges, start_pos, end_pos)
  return if start_pos >= end_pos

  merged_start = start_pos
  merged_end = end_pos
  index = 0

  while index < ranges.length && ranges[index][1] < merged_start
    index += 1
  end

  while index < ranges.length && ranges[index][0] <= merged_end
    merged_start = [merged_start, ranges[index][0]].min
    merged_end = [merged_end, ranges[index][1]].max
    ranges.delete_at(index)
  end

  ranges.insert(index, [merged_start, merged_end])
end

def subtract_ranges(start_pos, end_pos, ranges)
  cursor = start_pos
  residuals = []

  ranges.each do |range_start, range_end|
    next if range_end <= cursor
    break if range_start >= end_pos

    residuals << [cursor, [range_start, end_pos].min] if range_start > cursor
    cursor = [cursor, range_end].max
    break if cursor >= end_pos
  end

  residuals << [cursor, end_pos] if cursor < end_pos
  residuals
end

def trim_block(slice_ids, start_pos, window_span, slice_length, active_scores)
  left = start_pos
  right = start_pos + window_span - 1

  while left <= right && !qualifying_slice?(slice_ids[left], active_scores)
    left += 1
  end

  return unless left <= right

  while right >= left && !qualifying_slice?(slice_ids[right], active_scores)
    right -= 1
  end

  [left, right + slice_length]
end

def block_residuals(file, start_pos, window_span, slice_length, active_scores)
  trimmed = trim_block(file.slice_ids, start_pos, window_span, slice_length, active_scores)
  return [] unless trimmed

  subtract_ranges(trimmed[0], trimmed[1], file.selected_ranges)
end

def cover_block(slice_ids, start_pos, window_span, active_scores)
  seen = {}
  block_end = start_pos + window_span - 1

  start_pos.upto(block_end) do |pos|
    slice_id = slice_ids[pos]
    next unless slice_id && slice_id >= 0
    next if seen.key?(slice_id)

    active_scores[slice_id] = 0
    seen[slice_id] = true
  end
end

def refresh_file_candidate(file_index, file, active_scores, window_span, generation)
  slice_ids = file.slice_ids
  return Candidate.new(file_index: file_index, score: 0, position: 0, generation: generation) if slice_ids.length < window_span

  counts = Hash.new(0)
  current_score = 0
  best_score = 0
  best_position = 0
  left = 0

  slice_ids.each_index do |right|
    slice_id = slice_ids[right]
    if slice_id >= 0
      if counts[slice_id].zero?
        current_score += active_scores[slice_id]
      end
      counts[slice_id] += 1
    end

    while right - left + 1 > window_span
      drop_id = slice_ids[left]
      if drop_id >= 0
        counts[drop_id] -= 1
        if counts[drop_id].zero?
          counts.delete(drop_id)
          current_score -= active_scores[drop_id]
        end
      end
      left += 1
    end

    next unless right - left + 1 == window_span

    if current_score > best_score
      best_score = current_score
      best_position = left
    end
  end

  Candidate.new(file_index: file_index, score: best_score, position: best_position, generation: generation)
end

opts = {
  output: "dictionary.dict",
  size: 256 * 1024,
  slice_length: 12,
  block_length: 4096,
  min_frequency: 3,
  verbose: false,
}

OptionParser.new do |o|
  o.banner = "Usage: #{$0} [options] samples..."
  o.on("-o", "--output FILE", "Output dictionary file (default: #{opts[:output]})") { |v| opts[:output] = v }
  o.on("-s", "--size BYTES", Integer, "Target dictionary size in bytes (default: #{opts[:size]})") { |v| opts[:size] = v }
  o.on("-l", "--slice-length N", Integer, "Slice length in bytes (default: #{opts[:slice_length]})") { |v| opts[:slice_length] = v }
  o.on("-b", "--block-length N", Integer, "Block length in bytes (default: #{opts[:block_length]})") { |v| opts[:block_length] = v }
  o.on("-f", "--min-frequency N", Integer, "Minimum file count for a slice (default: #{opts[:min_frequency]})") { |v| opts[:min_frequency] = v }
  o.on("-v", "--verbose", "Print progress information") { opts[:verbose] = true }
  o.on("-h", "--help", "Show help") { puts o; exit }
end.parse!

if ARGV.empty?
  $stderr.puts "error: no input files"
  exit 1
end

if opts[:slice_length] <= 0 || opts[:block_length] <= 0 || opts[:size] <= 0 || opts[:min_frequency] <= 0
  $stderr.puts "error: options must be positive"
  exit 1
end

if opts[:block_length] < opts[:slice_length]
  $stderr.puts "error: block length must be >= slice length"
  exit 1
end

cwd = File.realpath(Dir.pwd)
paths = ARGV.map { |path| File.realpath(path) }.uniq.sort_by { |path| relative_path(path, cwd) }
files = paths.map do |path|
  InputFile.new(
    abs_path: path,
    rel_path: relative_path(path, cwd),
    data: File.binread(path),
    slice_ids: [],
    selected_ranges: [],
  )
end

total_bytes = files.sum { |file| file.data.bytesize }
$stderr.puts "reading #{files.size} files (#{total_bytes} bytes)" if opts[:verbose]

slice_length = opts[:slice_length]
block_length = opts[:block_length]
window_span = block_length - slice_length + 1

document_frequency = Hash.new(0)

files.each_with_index do |file, index|
  next if file.data.bytesize < slice_length

  seen = {}
  limit = file.data.bytesize - slice_length
  pos = 0
  while pos <= limit
    seen[file.data.byteslice(pos, slice_length)] = true
    pos += 1
  end
  seen.each_key { |slice| document_frequency[slice] += 1 }
  $stderr.puts "  counted #{index + 1}/#{files.size}: #{file.rel_path}" if opts[:verbose]
end

slice_lookup = {}
active_scores = []

document_frequency.each do |slice, score|
  next if score < opts[:min_frequency]

  slice_lookup[slice] = active_scores.length
  active_scores << score
end

if active_scores.empty?
  $stderr.puts "error: no slices found matching criteria"
  exit 1
end

$stderr.puts "qualified #{active_scores.length} slices (freq >= #{opts[:min_frequency]})" if opts[:verbose]

document_frequency = nil
GC.start

files.each do |file|
  slice_count = file.data.bytesize - slice_length + 1
  if slice_count <= 0
    file.slice_ids = []
    next
  end

  slice_ids = Array.new(slice_count, -1)
  pos = 0
  while pos < slice_count
    slice_id = slice_lookup[file.data.byteslice(pos, slice_length)]
    slice_ids[pos] = slice_id || -1
    pos += 1
  end
  file.slice_ids = slice_ids
end

slice_lookup = nil
GC.start

heap = MaxHeap.new do |left, right|
  if left.score != right.score
    left.score > right.score
  elsif left.file_index != right.file_index
    left.file_index < right.file_index
  else
    left.position < right.position
  end
end

generation = 0
files.each_with_index do |file, file_index|
  heap.push(refresh_file_candidate(file_index, file, active_scores, window_span, generation))
end

selected_bytes = 0
selected_blocks = 0

while selected_bytes < opts[:size] && !heap.empty?
  candidate = heap.pop
  break if candidate.score <= 0

  if candidate.generation != generation
    heap.push(refresh_file_candidate(candidate.file_index, files[candidate.file_index], active_scores, window_span, generation))
    next
  end

  top = heap.peek
  if top && heap.higher_priority?(top, candidate)
    heap.push(candidate)
    next
  end

  file = files[candidate.file_index]
  remaining = opts[:size] - selected_bytes

  block_residuals(file, candidate.position, window_span, slice_length, active_scores).each do |range_start, range_end|
    break if remaining <= 0

    if range_end - range_start > remaining
      range_end = range_start + remaining
    end

    add_range(file.selected_ranges, range_start, range_end)
    length = range_end - range_start
    selected_bytes += length
    remaining -= length
  end

  cover_block(file.slice_ids, candidate.position, window_span, active_scores)
  generation += 1
  selected_blocks += 1
  heap.push(refresh_file_candidate(candidate.file_index, file, active_scores, window_span, generation))

  if opts[:verbose]
    $stderr.print("\r  selected #{selected_blocks} blocks (#{selected_bytes}/#{opts[:size]} bytes)")
  end
end

dictionary = String.new(encoding: Encoding::BINARY)

files.each do |file|
  file.selected_ranges.each do |range_start, range_end|
    break if dictionary.bytesize >= opts[:size]

    remaining = opts[:size] - dictionary.bytesize
    length = [range_end - range_start, remaining].min
    dictionary << file.data.byteslice(range_start, length)
  end
end

File.binwrite(opts[:output], dictionary)

sha256 = Digest::SHA256.digest(dictionary)
hash = Base64.strict_encode64(sha256)

if opts[:verbose]
  $stderr.puts
  $stderr.puts "wrote #{opts[:output]} (#{dictionary.bytesize} bytes)"
  $stderr.puts "sha256: :#{hash}:"
end
