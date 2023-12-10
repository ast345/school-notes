class ChangeClassNamesNullable < ActiveRecord::Migration[6.0]
  def up
    change_column :school_classes, :class_name, :string, null: true
  end

  def down
    change_column :school_classes, :class_name, :string, null: false
  end
end