class CreateSchoolClasses < ActiveRecord::Migration[6.0]
  def change
    create_table :school_classes do |t|
      t.references :grade, null: false
      t.string :class_name, null: false
      t.timestamps
    end
  end
end
