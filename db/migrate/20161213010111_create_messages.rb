class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :person
      t.string :dialog
      t.timestamps
    end
  end
end
