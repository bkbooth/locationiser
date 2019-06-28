defmodule Locationiser.Locations.Pin do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "pins" do
    field(:lat, :decimal)
    field(:lng, :decimal)
    field(:title, :string)
    field(:description, :string)

    belongs_to(:user, Locationiser.Accounts.User)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(pin, attrs) do
    pin
    |> cast(attrs, [:lat, :lng, :title, :description])
    |> validate_required([:lat, :lng, :title, :description])
    |> cast_assoc(:user)
  end
end
