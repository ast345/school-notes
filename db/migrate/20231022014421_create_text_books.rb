class CreateTextBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :text_books do |t|
      t.references :grade_subject, null: false
      t.references :text_book_comp, null: false
      t.string :text_book_name, null: false
      t.integer :revision_year, null: false
      t.timestamps
    end
  end
end
