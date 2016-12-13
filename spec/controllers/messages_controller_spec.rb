require 'rails_helper'

RSpec.describe MessagesController, type: :controller do
  describe 'messages#index' do
    it 'should list the messages in the database' do
      message1 = FactoryGirl.create(:message)
      message2 = FactoryGirl.create(:message)
      message1.update_attributes(person: 'buyer', dialog: 'I want to buy')
      message2.update_attributes(person: 'seller', dialog: 'I want to sell')
      get :index
      expect(response).to have_http_status :success
      response_value = ActiveSupport::JSON.decode(@response.body)
      expect(response_value.count).to eq(2)
      response_ids = response_value.collect do |message|
        message['id']
      end
      expect(response_ids).to eq([message1.id, message2.id])
    end
  end

  describe 'message#create' do
    it 'should allow new messages to be created' do
      post :create, message: { person: 'buyer', dialog: 'I want to buy' }
      expect(response).to have_http_status(:success)
      response_value = ActiveSupport::JSON.decode(@response.body)
      expect(response_value['person']).to eq('buyer')
      expect(Message.last.person).to eq('buyer')
    end
  end
end
