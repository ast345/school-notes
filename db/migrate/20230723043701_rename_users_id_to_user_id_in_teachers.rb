class RenameUsersIdToUserIdInTeachers < ActiveRecord::Migration[6.0]
  def change
    rename_column :teachers, :users_id, :user_id
  end
end
