require "dos_detector.rb"
DoSDetector.new({
  :strategy => DoSDetector::CountingStrategy.new({
    :period     => 10,
    :threshold  => 100,
    :ban_period => 300,
  }),
})
