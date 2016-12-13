class MessagesController < ApplicationController
  def index
    @messages = Message.all
  end

  def create
  end

  private

  def message_params
  end
end
