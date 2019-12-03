class CreateMoodboards < ActiveRecord::Migration[6.0]
  def change
    create_table :moodboards do |t|
      t.string :artist_name
      t.string :theme

      t.timestamps
    end
  end
end
