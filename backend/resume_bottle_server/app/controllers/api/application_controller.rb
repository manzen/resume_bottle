class Api::ApplicationController < ActionController::API
  rescue_from Exception,                        with: :_render_500
  rescue_from ActiveRecord::RecordNotFound,     with: :_render_404
  rescue_from ActionController::RoutingError,   with: :_render_404

  def routing_error
    raise ActionController::RoutingError, params[:path]
  end

  private

  def _render_404(e = nil)
    logger.error "Rendering 404 with exception: #{e.message}" if e
    render json: { error: '404 error' }, status: :not_found
  end

  def _render_500(e = nil)
    logger.error "Rendering 500 with exception: #{e.message}" if e
    render json: { error: '500 error' }, status: :internal_server_error
  end
end
