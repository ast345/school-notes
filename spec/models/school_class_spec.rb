require 'rails_helper'

RSpec.describe SchoolClass, type: :model do
  let!(:school_type) do
    SchoolType.create!({
      type_name: "小学校"
    })
  end

  let!(:grade) do
    Grade.create!({
      grade_name: '1年生',
      school_types_id: school_type.id
    })
  end

  context '学年とクラス名が入力されている場合' do

    let!(:school_class) do
      SchoolClass.create({
        grade_id: grade.id,
        class_name: 'rspecクラス',
        token: SecureRandom.hex(20)
      })
    end

    it 'school_classが作成できる' do
      expect(school_class).to be_valid
    end
  end

  context '学年が選択されていない場合' do
    let!(:school_class) do
      SchoolClass.create({
        class_name: 'rspecクラス',
        token: SecureRandom.hex(20)
      })
    end

    it 'school_classを作成できない' do
      expect(school_class.errors.messages[:class_name][0]).to eq(nil)
    end
  end


end
