class CreateTeachers < ActiveRecord::Migration[6.0]
  def change
    create_table :teachers do |t|
      t.references :users, foreign_key: true
      t.string :display_name
      t.timestamps
    end
  end
end
