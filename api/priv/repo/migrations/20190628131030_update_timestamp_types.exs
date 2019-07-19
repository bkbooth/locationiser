defmodule Locationiser.Repo.Migrations.UpdateTimestampTypes do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify(:inserted_at, :timestamptz)
      modify(:updated_at, :timestamptz)
    end

    alter table(:pins) do
      modify(:inserted_at, :timestamptz)
      modify(:updated_at, :timestamptz)
    end
  end
end
