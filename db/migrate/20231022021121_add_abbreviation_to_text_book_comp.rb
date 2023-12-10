class AddAbbreviationToTextBookComp < ActiveRecord::Migration[6.0]
  def change
    add_column :text_book_comps, :abbreviation, :string, null: false
  end
end
