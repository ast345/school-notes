class CreateTemplateDateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :template_date_items do |t|
      t.string :item_name, null: false
      t.integer :day_of_week
      t.references :school_class, null: false
      t.timestamps
    end
    add_index :template_date_items, [:day_of_week, :school_class_id], unique: true, name: "temp_d_items_validates"
  end
end
