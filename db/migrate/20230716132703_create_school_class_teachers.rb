class CreateSchoolClassTeachers < ActiveRecord::Migration[6.0]
  def change
    create_table :school_class_teachers do |t|
      t.references :teachers, null:false
      t.references :school_classes, null:false
      t.string :teacher_type, null:false
      t.timestamps
    end
  end
end
