# frozen_string_literal: true

FactoryBot.define do
  factory :video_file do
    url { "https://s3.amazonaws.com/gumroad-specs/specs/ScreenRecording.mov" }
    filetype { "mov" }
    user { create(:user) }
    record { user }

    trait :with_thumbnail do
      after(:build) do |video_file|
        video_file.thumbnail.attach(
          io: File.open(Rails.root.join("spec/support/fixtures/test-small.png")),
          filename: "thumbnail.png",
          content_type: "image/png"
        )
      end
    end
  end
end
