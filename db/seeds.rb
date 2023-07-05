# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# db/seeds.rb

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

# Subjectデータベース
# subjects =['国語', '社会', '算数', '理科', '生活', '英語', '音楽', '図工', '家庭', '図画工作', '体育', '道徳', '総合', '外国語活動', '特別活動', '学級活動', 'プログラミング', '地理', '歴史', '公民', '現代社会', '数学', '美術', '技術', '現代文', '古典', '言語文化', '地学', '世界史', '日本史', '政治・経済', '公共', '数学Ⅰ', '数学Ⅱ', '数学Ⅲ', '数学A', '数学B', '数学活用', '数学C', '物理', '化学', '生物', '理科課題研究', 'コミュニケーション英語', '英語表現', '英語会話', '書道', '理数', '情報']

# subjects.each do |subject|
#     Subject.create(subject_name: subject)
# end