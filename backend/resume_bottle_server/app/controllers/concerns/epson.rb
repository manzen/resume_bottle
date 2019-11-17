require 'net/http'
require 'uri'

module Epson
  extend ActiveSupport::Concern

  ROOT_ENDPOINT = Rails.application.credentials[:root_endpoint]
  CLIENT_ID = Rails.application.credentials[:client_id]
  CLIENT_SECRET = Rails.application.credentials[:client_secret]
  PRINTER_EMAIL = Rails.application.credentials[:printer_email]
  POST = "POST"

  def auth
    p '認証API実行'
    target_uri = ROOT_ENDPOINT + "oauth2/auth/token?subject=printer&grant_type=password&username=" + PRINTER_EMAIL + "&password="

    res = auth_client(target_uri, POST)
    p "subject_id: #{res['subject_id']}"
    p "access_token: #{res['access_token']}"
    {subject_id: res['subject_id'], access_token: res['access_token']}
  end

  def create_job printer_id, access_token
    p 'ジョブ作成API実行'
    target_uri = ROOT_ENDPOINT + "printers/" + printer_id + "/jobs"
    query = {
        "job_name": "password",
        "print_mode": "photo"
    }.to_json
    res = job_client(target_uri, query, access_token, POST)
    p "id: #{res['id']}"
    p "upload_uri: #{res['upload_uri']}"
    {job_id: res['id'], upload_uri: res['upload_uri']}
  end

  def upload uri
    p 'アップロードAPI実行'
    file_path = 'public/uploads/resume/image/1/image.jpeg'
    file_name = '1.jpeg'
    target_uri = uri + "&File=" + file_name
    upload_client(target_uri, File.size(file_path), POST)
  end

  def print printer_id, job_id, access_token
    p '実行API実行'
    p "printer_id: #{printer_id}"
    p "job_id: #{job_id}"
    target_uri = "https://api.epsonconnect.com/api/1/printing/printers/" + printer_id + "/jobs/" + job_id + "/print"
    print_client(target_uri, access_token, POST)
  end

  private

  # This method returns the http request response.
  def auth_client(target_uri, method)
    return {} if target_uri.nil? || method.nil?

    uri = URI.parse(target_uri)
    https = Net::HTTP.new(uri.host, uri.port)
    https.use_ssl = true

    begin
      req = Net::HTTP::Post.new(uri.request_uri)
      req["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8"
      req.basic_auth(CLIENT_ID, CLIENT_SECRET)

      response = https.request(req)

      puts "code -> #{response.code}"
      puts "body -> #{response.body}"

      case response
      when Net::HTTPSuccess
        body = response.body
        JSON.parse(body)
      else
        puts [uri.to_s, response.value].join(" : ")
        return nil
      end
    rescue => e
      logger.error [uri.to_s, e.class, e].join(" : ")
      return nil
    end

  end

  # This method returns the http request response.
  def job_client(target_uri, query, access_token, method)
    return {} if target_uri.nil? || method.nil?

    uri = URI.parse(target_uri)
    https = Net::HTTP.new(uri.host, uri.port)
    https.use_ssl = true

    begin
      req = Net::HTTP::Post.new(uri.request_uri)
      req["Content-Type"] = "application/json; charset=utf-8"
      req["Authorization"] = "Bearer #{access_token}"
      req.body = query

      response = https.request(req)

      puts "code -> #{response.code}"
      puts "body -> #{response.body}"

      case response
      when Net::HTTPSuccess
        body = response.body
        JSON.parse(body)
      else
        puts [uri.to_s, response.value].join(" : ")
        return nil
      end
    rescue => e
      logger.error [uri.to_s, e.class, e].join(" : ")
      return nil
    end

  end

  # This method returns the http request response.
  def upload_client(target_uri, file_size, method)
    return {} if target_uri.nil? || method.nil?

    uri = URI.parse(target_uri)
    https = Net::HTTP.new(uri.host, uri.port)
    https.use_ssl = true

    begin
      req = Net::HTTP::Post.new(uri.request_uri)
      req["Content-Type"] = "image/jpeg"
      req["Content-Length"] = file_size

      response = https.request(req)

      puts "code -> #{response.code}"
      puts "body -> #{response.body}"
    rescue => e
      logger.error [uri.to_s, e.class, e].join(" : ")
      return nil
    end

  end

  # This method returns the http request response.
  def print_client(target_uri, access_token, method)
    return {} if target_uri.nil? || method.nil?

    uri = URI.parse(target_uri)
    https = Net::HTTP.new(uri.host, uri.port)
    https.use_ssl = true

    begin
      req = Net::HTTP::Post.new(uri.request_uri)
      req["Content-Type"] = "application/json; charset=utf8"
      req["Authorization"] = "Bearer #{access_token}"

      response = https.request(req)

      puts "code -> #{response.code}"
      puts "body -> #{response.body}"

      case response
      when Net::HTTPSuccess
        body = response.body
        JSON.parse(body)
      else
        puts [uri.to_s, response.value].join(" : ")
        return nil
      end
    rescue => e
      logger.error [uri.to_s, e.class, e].join(" : ")
      return nil
    end

  end
end