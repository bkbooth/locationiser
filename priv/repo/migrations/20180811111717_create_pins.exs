defmodule Locationiser.Repo.Migrations.CreatePins do
  use Ecto.Migration

  def change do
    create table(:pins, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :lat, :decimal
      add :lng, :decimal
      add :title, :string
      add :description, :text
      add :user_id, references(:users, on_delete: :delete_all, type: :binary_id), null: false

      timestamps()
    end

    create(index(:pins, [:user_id]))
  end
end
