defmodule Locationiser.TestFixtures do
  alias Locationiser.{Accounts, Locations}

  def valid_user do
    %{
      name: "Test User",
      email: "#{unique_username()}@example.com",
      password_hash: "password123"
    }
  end

  def invalid_user do
    %{name: nil, email: nil, password_hash: nil}
  end

  def user_fixture(attrs \\ %{}) do
    attrs = Enum.into(valid_user(), attrs)

    with {:ok, user} <- Accounts.create_user(attrs) do
      user
    end
  end

  def valid_pin do
    %{
      lat: "-34.423015",
      lng: "150.907125",
      title: "A Pin",
      description: "A description of a pin"
    }
  end

  def invalid_pin do
    %{lat: nil, lng: nil, title: nil, description: nil}
  end

  def pin_fixture(%Accounts.User{} = owner, attrs \\ %{}) do
    attrs = Enum.into(valid_pin(), attrs)

    with {:ok, pin} <- Locations.create_pin(owner, attrs) do
      pin
    end
  end

  defp unique_username do
    "user#{System.unique_integer([:positive])}"
  end
end
