class Moodboard < ApplicationRecord
    has_many :images, dependent: :destroy
end
