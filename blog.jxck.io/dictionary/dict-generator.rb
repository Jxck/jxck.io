#!/usr/bin/env ruby
require "optparse"
require "set"
require "digest"
require "base64"

# defaults
opts = {
  output: "dictionary.dict",
  size: 32768,
  slice_length: 16,
  step: 1,
  min_frequency: 2,
  verbose: false,
}

OptionParser.new do |o|
  o.banner = "Usage: #{$0} [options] samples..."
  o.on("-o", "--output FILE", "Output dictionary file (default: #{opts[:output]})") { |v| opts[:output] = v }
  o.on("-s", "--size BYTES", Integer, "Target dictionary size in bytes (default: #{opts[:size]})") { |v| opts[:size] = v }
  o.on("-l", "--slice-length N", Integer, "Slice length in bytes (default: #{opts[:slice_length]})") { |v| opts[:slice_length] = v }
  o.on("-S", "--step N", Integer, "Step size for sliding window (default: #{opts[:step]})") { |v| opts[:step] = v }
  o.on("-f", "--min-frequency N", Integer, "Minimum file count for a substring (default: #{opts[:min_frequency]})") { |v| opts[:min_frequency] = v }
  o.on("--fast", "Fast mode (slice:32, step:8, freq:3)") {
    opts[:slice_length] = 32
    opts[:step] = 8
    opts[:min_frequency] = 3
  }
  o.on("--thorough", "Thorough mode (slice:16, step:1, freq:2)") {
    opts[:slice_length] = 16
    opts[:step] = 1
    opts[:min_frequency] = 2
  }
  o.on("-v", "--verbose", "Print progress information") { opts[:verbose] = true }
  o.on("-h", "--help", "Show help") { puts o; exit }
end.parse!

files = ARGV
if files.empty?
  $stderr.puts "error: no input files"
  exit 1
end

base_slice = opts[:slice_length]
step = opts[:step]

# 1. read all files
file_data = []
total_bytes = 0
files.each do |file|
  data = File.binread(file)
  total_bytes += data.bytesize
  file_data << data
end
$stderr.puts "reading #{files.size} files (#{total_bytes} bytes)" if opts[:verbose]

# 2. multi-length slice extraction and frequency counting
slice_lengths = [base_slice / 2, base_slice, base_slice * 2, base_slice * 4].select { |l| l >= 8 }
all_slices = {}  # slice_bytes => Set of file indices

slice_lengths.each do |sl|
  file_data.each_with_index do |data, idx|
    next if data.bytesize < sl
    pos = 0
    while pos + sl <= data.bytesize
      s = data.byteslice(pos, sl)
      s.freeze
      entry = all_slices[s]
      if entry
        entry.add(idx)
      else
        all_slices[s] = Set.new([idx])
      end
      pos += step
    end
  end
  $stderr.puts "  slice_length=#{sl}: #{all_slices.size} unique slices" if opts[:verbose]
end

# 3. frequency filter
all_slices.select! { |_, file_set| file_set.size >= opts[:min_frequency] }
$stderr.puts "filtered to #{all_slices.size} unique slices (freq >= #{opts[:min_frequency]})" if opts[:verbose]

if all_slices.empty?
  $stderr.puts "error: no slices found matching criteria"
  exit 1
end

# 4. build contiguous ranges per slice length
ranges = {}  # range_bytes => Set of file indices

slice_lengths.each do |sl|
  file_data.each_with_index do |data, idx|
    next if data.bytesize < sl

    positions = []
    pos = 0
    while pos + sl <= data.bytesize
      s = data.byteslice(pos, sl)
      positions << pos if all_slices.key?(s)
      pos += step
    end

    next if positions.empty?
    range_start = positions[0]
    prev = positions[0]
    positions[1..].each do |p|
      if p == prev + step
        prev = p
      else
        range_bytes = data.byteslice(range_start, prev + sl - range_start)
        range_bytes.freeze
        (ranges[range_bytes] ||= Set.new).add(idx)
        range_start = p
        prev = p
      end
    end
    range_bytes = data.byteslice(range_start, prev + sl - range_start)
    range_bytes.freeze
    (ranges[range_bytes] ||= Set.new).add(idx)
  end
end

file_data = nil
all_slices = nil

$stderr.puts "built #{ranges.size} unique ranges" if opts[:verbose]

# 5. filter and prepare scored list
ranges.select! { |_, file_set| file_set.size >= opts[:min_frequency] }
scored = ranges.map { |r, file_set| [r, file_set.size] }
ranges = nil

$stderr.puts "scoring #{scored.size} ranges" if opts[:verbose]

# 6. greedy selection with coverage tracking
# Track which slices are already covered by the dictionary.
# For each candidate range, compute "new bytes" not yet in dictionary.
dictionary = String.new(encoding: Encoding::BINARY)
covered = Set.new  # set of base_slice-length slices already in dictionary
selected = 0

# initial sort: frequency desc, size desc
scored.sort_by! { |r, freq| [-freq, -r.bytesize] }

while dictionary.bytesize < opts[:size] && !scored.empty?
  # rescore based on new bytes
  best_idx = nil
  best_score = -1

  scored.each_with_index do |(range, freq), i|
    # count new slices this range would add
    new_bytes = 0
    pos = 0
    while pos + base_slice <= range.bytesize
      s = range.byteslice(pos, base_slice)
      new_bytes += 1 unless covered.include?(s)
      pos += step
    end
    # also count tail bytes not covered by full slices
    new_bytes = [new_bytes * step, range.bytesize].min if step > 1

    effective_score = new_bytes * freq
    if effective_score > best_score
      best_score = effective_score
      best_idx = i
    end
  end

  break if best_score <= 0

  range, _freq = scored.delete_at(best_idx)

  # skip if fully contained
  next if dictionary.include?(range)

  remaining = opts[:size] - dictionary.bytesize
  if range.bytesize > remaining
    range = range.byteslice(0, remaining)
  end

  dictionary << range

  # update coverage
  pos = 0
  while pos + base_slice <= range.bytesize
    covered.add(range.byteslice(pos, base_slice))
    pos += step
  end

  selected += 1
  $stderr.print "\r  selected #{selected} ranges (#{dictionary.bytesize}/#{opts[:size]} bytes)" if opts[:verbose]
end

# 7. output
File.binwrite(opts[:output], dictionary)

sha256 = Digest::SHA256.digest(dictionary)
hash = Base64.strict_encode64(sha256)

$stderr.puts "" if opts[:verbose]
$stderr.puts "wrote #{opts[:output]} (#{dictionary.bytesize} bytes)" if opts[:verbose]
$stderr.puts "sha256: :#{hash}:" if opts[:verbose]
