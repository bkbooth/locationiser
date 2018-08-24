defmodule Locationiser.Locations do
  @moduledoc """
  The Locations context.
  """

  import Ecto.Query, warn: false

  alias Locationiser.Repo
  alias Locationiser.Accounts.User
  alias Locationiser.Locations.Pin

  @doc """
  Returns the list of pins.

  ## Examples

      iex> list_pins()
      [%Pin{}, ...]

  """
  def list_pins do
    Repo.all(Pin)
  end

  @doc """
  Returns the list of pins for a given user.

  ## Examples

      iex> list_pins(user)
      [%Pin{}, ...]

  """
  def list_user_pins(%User{} = user) do
    Pin
    |> user_pins_query(user)
    |> Repo.all()
  end

  @doc """
  Gets a single pin.

  Raises `Ecto.NoResultsError` if the Pin does not exist.

  ## Examples

      iex> get_pin!(123)
      %Pin{}

      iex> get_pin!(456)
      ** (Ecto.NoResultsError)

  """
  def get_pin!(id), do: Repo.get!(Pin, id)

  @doc """
  Gets a single pin for a given user.

  Raises `Ecto.NoResultsError` if the Pin does not exist or if the user isn't the owner.

  ## Examples

      iex> get_pin!(owner, 123)
      %Pin{}

      iex> get_pin!(owner, 456)
      ** (Ecto.NoResultsError)

      iex> get_pin!(non_owner, 123)
      ** (Ecto.NoResultsError)

  """
  def get_user_pin!(%User{} = user, id) do
    from(p in Pin, where: p.id == ^id)
    |> user_pins_query(user)
    |> Repo.one!()
  end

  @doc """
  Creates a pin.

  ## Examples

      iex> create_pin(user, %{field: value})
      {:ok, %Pin{}}

      iex> create_pin(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_pin(%User{} = user, attrs \\ %{}) do
    %Pin{}
    |> Pin.changeset(attrs)
    |> put_user(user)
    |> Repo.insert()
  end

  @doc """
  Updates a pin.

  ## Examples

      iex> update_pin(pin, %{field: new_value})
      {:ok, %Pin{}}

      iex> update_pin(pin, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_pin(%Pin{} = pin, attrs) do
    pin
    |> Pin.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Pin.

  ## Examples

      iex> delete_pin(pin)
      {:ok, %Pin{}}

      iex> delete_pin(pin)
      {:error, %Ecto.Changeset{}}

  """
  def delete_pin(%Pin{} = pin) do
    Repo.delete(pin)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking pin changes.

  ## Examples

      iex> change_pin(user, pin)
      %Ecto.Changeset{source: %Pin{}}

  """
  def change_pin(%User{} = user, %Pin{} = pin) do
    pin
    |> Pin.changeset(%{})
    |> put_user(user)
  end

  defp put_user(changeset, user) do
    Ecto.Changeset.put_assoc(changeset, :user, user)
  end

  defp user_pins_query(query, %User{id: user_id}) do
    from(p in query, where: p.user_id == ^user_id)
  end
end
