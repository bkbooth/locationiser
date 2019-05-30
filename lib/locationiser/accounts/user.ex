defmodule Locationiser.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Bcrypt

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users" do
    field(:email, :string)
    field(:name, :string)
    field(:password, :string, virtual: true)
    field(:password_hash, :string)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email])
    |> validate_required([:name, :email])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
  end

  @doc false
  def password_changeset(user, attrs) do
    user
    |> cast(attrs, [:password])
    |> validate_required([:password])
    |> validate_length(:password, min: 8)
    |> put_password_hash()
  end

  @doc false
  def registration_changeset(user, attrs) do
    user
    |> changeset(attrs)
    |> password_changeset(attrs)
  end

  defp put_password_hash(%Ecto.Changeset{valid?: true, changes: %{password: pwd}} = changeset) do
    change(changeset, Bcrypt.add_hash(pwd))
  end

  defp put_password_hash(changeset), do: changeset
end
