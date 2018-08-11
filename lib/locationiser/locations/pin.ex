defmodule Locationiser.Locations.Pin do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "pins" do
    field(:description, :string)
    field(:lat, :decimal)
    field(:lng, :decimal)
    field(:title, :string)
    belongs_to(:user, Locationiser.Accounts.User)

    timestamps()
  end

  @doc false
  def changeset(pin, attrs) do
    pin
    |> cast(attrs, [:lat, :lng, :title, :description, :user_id])
    |> validate_required([:lat, :lng, :title, :description, :user_id])
    |> cast_assoc(:user)
  end
end
