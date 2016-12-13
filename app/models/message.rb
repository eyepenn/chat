class Message < ActiveRecord::Base
  validates :person, presence: true, length: { maximum: 25, minimum: 1 }
  validates :dialog, presence: true, length: { maximum: 140, minimum: 1 }
end
