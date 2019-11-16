class Api::UploadController < Api::ApplicationController

  def create
    # TODO デモでは即どこかのエプソンに履歴書をプリントアウトする
    resume = Resume.new(create_params)
    begin
      resume.save!
      response = {message: "upload success"}
      render json: response, status: 200
    rescue
      response = {message: "upload faild"}
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
