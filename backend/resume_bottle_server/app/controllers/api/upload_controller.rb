class Api::UploadController < Api::ApplicationController

  include Epson

  def create
    # TODO デモでは即どこかのエプソンに履歴書をプリントアウトする
    resume = Resume.new(create_params)

    begin
      resume.save!

      token = auth
      job = create_job token[:subject_id], token[:access_token]
      upload job[:upload_uri]
      print token[:subject_id], job[:job_id], token[:access_token]

      response = {message: "upload success"}
      render json: response, status: 200
    rescue
      response = {message: "upload failed"}
      render json: response, status: 400
    end
  end

  def is_sent
    resume = Resume.find_by(email: params["email"])
    response = {is_sent: resume.present?}
    render json: response, status: 200
  end

  private
  def create_params
    params.permit(:email, :image)
  end

end
