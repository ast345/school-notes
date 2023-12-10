class CreateLessonPeriods < ActiveRecord::Migration[6.0]
  def change
    create_table :lesson_periods do |t|
      t.integer :start_of_period, null: false
      t.integer :end_of_period, null: false
      t.references :school_class, null: false
      t.timestamps
    end
  end
end
