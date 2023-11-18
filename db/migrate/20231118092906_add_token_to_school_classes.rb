class AddTokenToSchoolClasses < ActiveRecord::Migration[6.0]
  def change
    add_column :school_classes, :token, :string
    add_index :school_classes, :token, unique: true
  end
end
