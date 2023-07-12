class CreateUserToTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :user_to_types do |t|
      t.references :user_types, foreign_key: true
      t.references :users, foreign_key: true
      t.timestamps
    end
  end
end
