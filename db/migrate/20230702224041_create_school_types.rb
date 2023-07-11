class CreateSchoolTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :school_types do |t|
      t.string :type_name
      t.timestamps
    end
  end
end
