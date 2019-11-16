CarrierWave.configure do |config|

  if Rails.env.production? || Rails.env.staging?
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider:              "AWS",
      region:                "ap-northeast-1",
      aws_access_key_id: ENV.fetch("S3_ACCESS_KEY"),
      aws_secret_access_key: ENV.fetch("S3_SECRET_KEY")
    }
    config.fog_directory = ENV.fetch("S3_BUCKET")
    config.storage = :fog
  else
    config.storage = :file
  end

end
