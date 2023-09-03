# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_09_03_222408) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assigned_subjects", force: :cascade do |t|
    t.bigint "school_class_teachers_id", null: false
    t.bigint "grade_subjects_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grade_subjects_id"], name: "index_assigned_subjects_on_grade_subjects_id"
    t.index ["school_class_teachers_id"], name: "index_assigned_subjects_on_school_class_teachers_id"
  end

  create_table "class_leaving_times", force: :cascade do |t|
    t.time "leaving_time", null: false
    t.date "date"
    t.integer "day_of_week"
    t.bigint "school_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["date", "school_class_id"], name: "index_class_leaving_times_on_date_and_school_class_id", unique: true
    t.index ["school_class_id"], name: "index_class_leaving_times_on_school_class_id"
  end

  create_table "date_items", force: :cascade do |t|
    t.string "item_name", null: false
    t.date "date"
    t.integer "day_of_week"
    t.bigint "school_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["date", "school_class_id"], name: "index_date_items_on_date_and_school_class_id", unique: true
    t.index ["school_class_id"], name: "index_date_items_on_school_class_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "event_name", null: false
    t.date "date"
    t.integer "day_of_week"
    t.bigint "school_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["date", "school_class_id"], name: "index_events_on_date_and_school_class_id", unique: true
    t.index ["school_class_id"], name: "index_events_on_school_class_id"
  end

  create_table "grade_subject_units", force: :cascade do |t|
    t.string "unit_name", null: false
    t.bigint "grade_subject_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grade_subject_id"], name: "index_grade_subject_units_on_grade_subject_id"
    t.index ["unit_name", "grade_subject_id"], name: "index_grade_subject_units_on_unit_name_and_grade_subject_id", unique: true
  end

  create_table "grade_subjects", force: :cascade do |t|
    t.bigint "grades_id"
    t.bigint "subjects_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grades_id"], name: "index_grade_subjects_on_grades_id"
    t.index ["subjects_id"], name: "index_grade_subjects_on_subjects_id"
  end

  create_table "grades", force: :cascade do |t|
    t.string "grade_name"
    t.bigint "school_types_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["school_types_id"], name: "index_grades_on_school_types_id"
  end

  create_table "lesson_classes", force: :cascade do |t|
    t.bigint "school_class_id", null: false
    t.bigint "lesson_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["lesson_id"], name: "index_lesson_classes_on_lesson_id"
    t.index ["school_class_id"], name: "index_lesson_classes_on_school_class_id"
  end

  create_table "lessons", force: :cascade do |t|
    t.date "date"
    t.integer "day_of_week"
    t.integer "period"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "grade_subject_unit_id"
    t.bigint "grade_subject_id"
    t.index ["grade_subject_id"], name: "index_lessons_on_grade_subject_id"
    t.index ["grade_subject_unit_id"], name: "index_lessons_on_grade_subject_unit_id"
  end

  create_table "school_class_teachers", force: :cascade do |t|
    t.bigint "teachers_id", null: false
    t.bigint "school_classes_id", null: false
    t.string "teacher_type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["school_classes_id"], name: "index_school_class_teachers_on_school_classes_id"
    t.index ["teachers_id"], name: "index_school_class_teachers_on_teachers_id"
  end

  create_table "school_classes", force: :cascade do |t|
    t.bigint "grade_id", null: false
    t.string "class_name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grade_id"], name: "index_school_classes_on_grade_id"
  end

  create_table "school_types", force: :cascade do |t|
    t.string "type_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "subjects", force: :cascade do |t|
    t.string "subject_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "teachers", force: :cascade do |t|
    t.bigint "user_id"
    t.string "display_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_teachers_on_user_id"
  end

  create_table "user_to_types", force: :cascade do |t|
    t.bigint "user_types_id"
    t.bigint "users_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_types_id"], name: "index_user_to_types_on_user_types_id"
    t.index ["users_id"], name: "index_user_to_types_on_users_id"
  end

  create_table "user_types", force: :cascade do |t|
    t.string "type_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "encrypted_password", null: false
    t.string "name", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid", null: false
    t.string "provider", default: "", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "grade_subjects", "grades", column: "grades_id"
  add_foreign_key "grade_subjects", "subjects", column: "subjects_id"
  add_foreign_key "grades", "school_types", column: "school_types_id"
  add_foreign_key "teachers", "users"
  add_foreign_key "user_to_types", "user_types", column: "user_types_id"
  add_foreign_key "user_to_types", "users", column: "users_id"
end
