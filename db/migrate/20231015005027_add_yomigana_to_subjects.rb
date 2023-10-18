class AddYomiganaToSubjects < ActiveRecord::Migration[6.0]
  def change
    add_column :subjects, :yomigana, :string
  end
end
