class CreateLessons < ActiveRecord::Migration[6.0]
  def change
    create_table :lessons do |t|
      t.date :date
      t.integer :day_of_week
      t.integer :period
      t.timestamps
    end
  end
end
