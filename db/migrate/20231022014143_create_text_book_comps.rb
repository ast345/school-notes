class CreateTextBookComps < ActiveRecord::Migration[6.0]
  def change
    create_table :text_book_comps do |t|
      t.string :comp_name, null: false
      t.timestamps
    end
  end
end
