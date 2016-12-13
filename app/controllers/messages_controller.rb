class MessagesController < ApplicationController
  def index
    render json: Message.order(:id)
  end

  def create
    message = Message.create(message_params)
    render json: message
  end

  private

  def message_params
    params.require(:message).permit(:person, :dialog)
  end
end
