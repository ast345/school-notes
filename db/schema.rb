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

ActiveRecord::Schema.define(version: 2024_01_04_073105) do

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

  create_table "break_act_displays", force: :cascade do |t|
    t.bigint "school_class_id", null: false
    t.boolean "display", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["school_class_id"], name: "index_break_act_displays_on_school_class_id"
  end

  create_table "break_activities", force: :cascade do |t|
    t.string "activity_name", null: false
    t.date "date"
    t.integer "day_of_week"
    t.bigint "school_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["date", "school_class_id"], name: "index_break_activities_on_date_and_school_class_id", unique: true
    t.index ["school_class_id"], name: "index_break_activities_on_school_class_id"
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
    t.bigint "text_book_id"
    t.index ["grade_subject_id"], name: "index_grade_subject_units_on_grade_subject_id"
    t.index ["text_book_id"], name: "index_grade_subject_units_on_text_book_id"
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

  create_table "lesson_periods", force: :cascade do |t|
    t.integer "start_of_period", null: false
    t.integer "end_of_period", null: false
    t.bigint "school_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["school_class_id"], name: "index_lesson_periods_on_school_class_id"
  end

  create_table "lesson_wdays", force: :cascade do |t|
    t.bigint "school_class_id", null: false
    t.date "start_of_week", null: false
    t.boolean "monday", default: true, null: false
    t.boolean "tuesday", default: true, null: false
    t.boolean "wednesday", default: true, null: false
    t.boolean "thursday", default: true, null: false
    t.boolean "friday", default: true, null: false
    t.boolean "saturday", default: false, null: false
    t.boolean "sunday", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["school_class_id", "start_of_week"], name: "index_lesson_wdays_on_school_class_id_and_start_of_week", unique: true
    t.index ["school_class_id"], name: "index_lesson_wdays_on_school_class_id"
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

  create_table "morning_activities", force: :cascade do |t|
    t.string "activity_name", null: false
    t.date "date"
    t.integer "day_of_week"
    t.bigint "school_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["date", "school_class_id"], name: "index_morning_activities_on_date_and_school_class_id", unique: true
    t.index ["school_class_id"], name: "index_morning_activities_on_school_class_id"
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
    t.string "class_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "token"
    t.index ["grade_id"], name: "index_school_classes_on_grade_id"
    t.index ["token"], name: "index_school_classes_on_token", unique: true
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
    t.string "yomigana"
  end

  create_table "teachers", force: :cascade do |t|
    t.bigint "user_id"
    t.string "display_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_teachers_on_user_id"
  end

  create_table "template_break_activities", force: :cascade do |t|
    t.string "activity_name", null: false
    t.integer "day_of_week", null: false
    t.bigint "school_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["day_of_week", "school_class_id"], name: "temp_b_act_validates", unique: true
    t.index ["school_class_id"], name: "index_template_break_activities_on_school_class_id"
  end

  create_table "template_class_leaving_times", force: :cascade do |t|
    t.time "leaving_time"
    t.integer "day_of_week"
    t.bigint "school_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["day_of_week", "school_class_id"], name: "temp_leav_times_validates", unique: true
    t.index ["school_class_id"], name: "index_template_class_leaving_times_on_school_class_id"
  end

  create_table "template_date_items", force: :cascade do |t|
    t.string "item_name", null: false
    t.integer "day_of_week"
    t.bigint "school_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["day_of_week", "school_class_id"], name: "temp_d_items_validates", unique: true
    t.index ["school_class_id"], name: "index_template_date_items_on_school_class_id"
  end

  create_table "template_lesson_classes", force: :cascade do |t|
    t.bigint "school_class_id", null: false
    t.bigint "template_lesson_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["school_class_id"], name: "index_template_lesson_classes_on_school_class_id"
    t.index ["template_lesson_id"], name: "index_template_lesson_classes_on_template_lesson_id"
  end

  create_table "template_lessons", force: :cascade do |t|
    t.integer "day_of_week", null: false
    t.integer "period", null: false
    t.bigint "grade_subject_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grade_subject_id"], name: "index_template_lessons_on_grade_subject_id"
  end

  create_table "template_morning_activities", force: :cascade do |t|
    t.string "activity_name", null: false
    t.integer "day_of_week", null: false
    t.bigint "school_class_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["day_of_week", "school_class_id"], name: "temp_m_act_validates", unique: true
    t.index ["school_class_id"], name: "index_template_morning_activities_on_school_class_id"
  end

  create_table "text_book_comps", force: :cascade do |t|
    t.string "comp_name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "abbreviation", null: false
  end

  create_table "text_books", force: :cascade do |t|
    t.bigint "grade_subject_id", null: false
    t.bigint "text_book_comp_id", null: false
    t.string "text_book_name", null: false
    t.integer "revision_year", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grade_subject_id"], name: "index_text_books_on_grade_subject_id"
    t.index ["text_book_comp_id"], name: "index_text_books_on_text_book_comp_id"
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

  create_table "using_texts", force: :cascade do |t|
    t.bigint "school_class_id", null: false
    t.bigint "text_book_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["school_class_id"], name: "index_using_texts_on_school_class_id"
    t.index ["text_book_id"], name: "index_using_texts_on_text_book_id"
  end

  add_foreign_key "grade_subjects", "grades", column: "grades_id"
  add_foreign_key "grade_subjects", "subjects", column: "subjects_id"
  add_foreign_key "grades", "school_types", column: "school_types_id"
  add_foreign_key "teachers", "users"
  add_foreign_key "user_to_types", "user_types", column: "user_types_id"
  add_foreign_key "user_to_types", "users", column: "users_id"
end
