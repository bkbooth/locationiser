defmodule Locationiser.Repo.Migrations.AddZoomToPins do
  use Ecto.Migration

  def change do
    alter table(:pins) do
      add(:zoom, :integer)
    end
  end
end
