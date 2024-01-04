class CreateBreakActDisplays < ActiveRecord::Migration[6.0]
  def change
    create_table :break_act_displays do |t|
      t.references :school_class, null: false
      t.boolean :display, null:false, default: false
      t.timestamps
    end
  end
end
