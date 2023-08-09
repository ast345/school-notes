class CreateDateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :date_items do |t|
      t.string :item_name, null: false
      t.date :date
      t.integer :day_of_week
      t.references :school_class, null: false
      t.timestamps
    end
  end
end
