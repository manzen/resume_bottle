class CreateResumes < ActiveRecord::Migration[5.2]
  def change
    create_table :resumes do |t|
      t.string :image
      t.string :email

      t.timestamps
    end
  end
end
