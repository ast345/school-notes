class CreateUsingTexts < ActiveRecord::Migration[6.0]
  def change
    create_table :using_texts do |t|
      t.references :school_class, null:false
      t.references :text_book, null:false
      t.timestamps
    end
  end
end
