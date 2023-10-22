# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# db/seeds.rb
require 'csv'

#Grade事前設定データベース

## school_typeデータベース

# school_type = ['小学校', '中学校', '高校']

# school_type.each do |type_name|
#     SchoolType.create(type_name: type_name)
# end


## Gradeデータベース
# Grade.create(grade_name: '1年生', school_types_id: 1)  # 小学校1年生
# Grade.create(grade_name: '2年生', school_types_id: 1)
# Grade.create(grade_name: '3年生', school_types_id: 1)
# Grade.create(grade_name: '4年生', school_types_id: 1)
# Grade.create(grade_name: '5年生', school_types_id: 1)
# Grade.create(grade_name: '6年生', school_types_id: 1)
# Grade.create(grade_name: '1年生', school_types_id: 2)
# Grade.create(grade_name: '2年生', school_types_id: 2)
# Grade.create(grade_name: '3年生', school_types_id: 2)
# Grade.create(grade_name: '1年生', school_types_id: 3)
# Grade.create(grade_name: '2年生', school_types_id: 3)
# Grade.create(grade_name: '3年生', school_types_id: 3)


# subject読み仮名付き
# Subject.create(subject_name: "国語", yomigana: "こくご")
# Subject.create(subject_name: "算数", yomigana: "さんすう")
# Subject.create(subject_name: "音楽", yomigana: "おんがく")
# Subject.create(subject_name: "体育", yomigana: "たいいく")
# Subject.create(subject_name: "生活", yomigana: "せいかつ")
# Subject.create(subject_name: "道徳", yomigana: "どうとく")
# Subject.create(subject_name: "図画工作", yomigana: "ずがこうさく")
# Subject.create(subject_name: "特別活動", yomigana: "とくべつかつどう")
# Subjectデータベース
# subjects =['社会', '理科', '生活', '英語', '家庭', '総合', '外国語活動', '学級活動', 'プログラミング', '地理', '歴史', '公民', '現代社会', '数学', '美術', '技術', '現代文', '古典', '言語文化', '地学', '世界史', '日本史', '政治・経済', '公共', '数学Ⅰ', '数学Ⅱ', '数学Ⅲ', '数学A', '数学B', '数学活用', '数学C', '物理', '化学', '生物', '理科課題研究', 'コミュニケーション英語', '英語表現', '英語会話', '書道', '理数', '情報',
# '国語総合', '国語表現', '現代文Ａ', '古典Ａ', '世界史Ａ', '日本史Ａ', '地理Ａ', 'コミュニケーション英語基礎', '科学と人間生活', '物理基礎', '化学基礎', '生物基礎', '地学基礎', '家庭基礎', '情報の科学', '総合的な学習の時間', '保健', '現代文Ｂ', '古典Ｂ', '世界史Ｂ', '日本史Ｂ', '地理Ｂ', '倫理', '家庭総合', '生活デザイン', '社会と情報', '保健', '音楽Ⅰ', '美術Ⅰ', '工芸Ⅰ', '書道Ⅰ',
# '倫理', '政治・経済', 'コミュニケーション英語Ⅰ', '英語表現Ⅰ',  '社会と情報', '音楽Ⅱ', '美術Ⅱ', '工芸Ⅱ', '書道Ⅱ'
# 'コミュニケーション英語Ⅱ', 'コミュニケーション英語Ⅲ', '英語表現Ⅱ', '英語会話', '音楽Ⅲ', '美術Ⅲ', '工芸Ⅲ', '書道Ⅲ']

# subjects =['国語総合', '国語表現', '現代文Ａ', '古典Ａ', '世界史Ａ', '日本史Ａ', '地理Ａ', 'コミュニケーション英語基礎', '英語会話', '科学と人間生活', '物理基礎', '化学基礎', '生物基礎', '地学基礎', '家庭基礎', '情報の科学', '総合的な学習の時間', '保健', '現代文Ｂ', '古典Ｂ', '世界史Ｂ', '日本史Ｂ', '地理Ｂ', '倫理', '家庭総合', '生活デザイン', '社会と情報']

# subjects =['保健', '音楽Ⅰ', '美術Ⅰ', '工芸Ⅰ', '書道Ⅰ']

# subjects = []

# subjects.each do |subject|
#     Subject.create(subject_name: subject)
# end


## grade_sbujectデータベース

#小学1年生
# subject_for1 =  ['国語', '算数', '音楽', '体育', '生活', '道徳', '図画工作', '特別活動']
# subject_for1.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 1, subjects_id: subject_id)
# end

# # 小学2年生
# subject_for2 =  ['国語', '算数', '音楽', '体育', '生活', '道徳', '図画工作', '特別活動']
# subject_for2.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 2, subjects_id: subject_id)
# end

# # 小学3年生
# subject_for3 =   ['国語', '社会', '算数', '理科', '音楽', '図画工作', '体育', '道徳', '総合', '特別活動']
# subject_for3.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 3, subjects_id: subject_id)
# end

# # 小学4年生
# subject_for4 =   ['国語', '社会', '算数', '理科', '音楽', '図画工作', '体育', '道徳', '総合', '特別活動']
# subject_for4.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 4, subjects_id: subject_id)
# end

# # 小学5年生
# subject_for5 =   ['国語', '社会', '算数', '理科', '音楽', '図画工作', '家庭', '体育', '道徳', '外国語活動', '総合', '特別活動']
# subject_for5.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 5, subjects_id: subject_id)
# end

# # 小学6年生
# subject_for6 =   ['国語', '社会', '算数', '理科', '音楽', '図画工作', '家庭', '体育', '道徳', '外国語活動', '総合', '特別活動']
# subject_for6.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 6, subjects_id: subject_id)
# end

# # 中学１年生
# subject_for7 =   ['国語', '社会', '数学', '理科', '音楽', '美術', '保健体育', '技術・家庭', '外国語', '道徳', '総合', '特別活動']
# subject_for7.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 7, subjects_id: subject_id)
# end

# # # 中学2年生
# subject_for8 =   ['国語', '社会', '数学', '理科', '音楽', '美術', '保健体育', '技術・家庭', '外国語', '道徳', '総合', '特別活動']
# subject_for8.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 8, subjects_id: subject_id)
# end

# # # 中学3年生
# subject_for9 =   ['国語', '社会', '数学', '理科', '音楽', '美術', '保健体育', '技術・家庭', '外国語', '道徳', '総合', '特別活動']
# subject_for9.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 9, subjects_id: subject_id)
# end

# # # 高校1年生
# subject_for10 =   ['国語総合', '国語表現', '現代文Ａ', '古典Ａ', '世界史Ａ', '日本史Ａ', '地理Ａ', 'コミュニケーション英語基礎', '数学Ⅰ', '数学A', '科学と人間生活', '物理基礎', '化学基礎', '生物基礎', '地学基礎', '家庭基礎', '情報の科学', '総合的な学習の時間', '保健', '体育', '音楽Ⅰ', '美術Ⅰ', '工芸Ⅰ', '書道Ⅰ']
# subject_for10.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 10, subjects_id: subject_id)
# end

# # # 高校2年生
# subject_for11 =  ['国語総合', '国語表現', '現代社会', '現代文Ｂ', '古典Ｂ', '世界史Ｂ', '日本史Ｂ', '地理Ｂ', '物理', '化学', '生物', '地学', '数学Ⅱ', '数学B', '総合的な学習の時間', '保健体育', '家庭総合', '生活デザイン', '倫理', '政治・経済', 'コミュニケーション英語Ⅰ', '英語表現Ⅰ',  '社会と情報', '音楽Ⅱ', '美術Ⅱ', '工芸Ⅱ', '書道Ⅱ']
# subject_for11.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 11, subjects_id: subject_id)
# end

# # # 高校3年生
# subject_for12 =  ['国語総合', '国語表現', '数学Ⅲ', '数学活用', '理科課題研究', '総合的な学習の時間', '保健体育', 'コミュニケーション英語Ⅱ', 'コミュニケーション英語Ⅲ', '英語表現Ⅱ', '英語会話', '音楽Ⅲ', '美術Ⅲ', '工芸Ⅲ', '書道Ⅲ']
# subject_for12.each do |subject|
#     subject_id = Subject.where(subject_name: subject).first.id
#     GradeSubject.create(grades_id: 12, subjects_id: subject_id)
# end

# 教科書会社
# CSV.foreach(Rails.root.join('db/csv/textbookscomp.csv'), headers: true) do |row|
#     TextBookComp.create(
#       comp_name: row['comp_name'],
#       abbreviation: row['abbreviation']
#     )
#   end

# user_type= ['教職員', '生徒', '保護者']
# user_type.each do |user_type|
#     UserType.create(type_name: user_type)
# end