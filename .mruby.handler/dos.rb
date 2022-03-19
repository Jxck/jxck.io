require "dos_detector.rb"
DoSDetector.new({
  :strategy => DoSDetector::CountingStrategy.new({
    :period     => 30,
    :threshold  => 15,
    :ban_period => 3000,
  }),
})
