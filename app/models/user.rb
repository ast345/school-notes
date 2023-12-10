# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           not null
#  encrypted_password     :string           not null
#  name                   :string           not null
#  provider               :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  uid                    :string           not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_name                  (name)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_uid_and_provider      (uid,provider) UNIQUE
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :user_to_types, foreign_key: 'users_id', dependent: :destroy
  has_one :teacher, dependent: :destroy
  after_create :create_user_rel

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:azure_activedirectory_v2, :google_oauth2]

  before_create :generate_uid, unless: :uid_present?

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]

    # MEMO: 氏名やアバター画像等を取得したい場合は有効化する
      user.name = auth.info.name
    # user.image = auth.info.image
    end
  end

  private
  def generate_uid
    self.uid = SecureRandom.uuid
  end

  def uid_present?
    uid.present?
  end

  def create_user_rel
    self.user_to_types.create(users_id: self.id, user_types_id: 1)
    @teacher = self.build_teacher(user_id: self.id, display_name: self.name)
    @teacher.save
  end
end
