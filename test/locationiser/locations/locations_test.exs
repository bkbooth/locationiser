defmodule Locationiser.LocationsTest do
  use Locationiser.DataCase

  alias Locationiser.Locations

  describe "pins" do
    alias Locationiser.Locations.Pin

    @valid_attrs %{
      description: "some description",
      lat: "-34.423015",
      lng: "150.907125",
      title: "some title"
    }
    @update_attrs %{
      description: "some updated description",
      lat: "-33.820457",
      lng: "151.297659",
      title: "some updated title"
    }
    @invalid_attrs %{description: nil, lat: nil, lng: nil, title: nil}
    @valid_user %{
      name: "some user",
      email: "user@example.com",
      password_hash: "abc123"
    }

    def user_fixture() do
      {:ok, user} = Locationiser.Accounts.create_user(@valid_user)
      user
    end

    def pin_fixture(attrs \\ %{}) do
      user = user_fixture()

      {:ok, pin} =
        %{user_id: user.id}
        |> Enum.into(attrs)
        |> Enum.into(@valid_attrs)
        |> Locations.create_pin()

      pin
    end

    test "list_pins/0 returns all pins" do
      pin = pin_fixture()
      assert Locations.list_pins() == [pin]
    end

    test "get_pin!/1 returns the pin with given id" do
      pin = pin_fixture()
      assert Locations.get_pin!(pin.id) == pin
    end

    test "create_pin/1 with valid data creates a pin" do
      user = user_fixture()
      attrs = Enum.into(%{user_id: user.id}, @valid_attrs)
      assert {:ok, %Pin{} = pin} = Locations.create_pin(attrs)
      assert pin.description == "some description"
      assert pin.lat == Decimal.new("-34.423015")
      assert pin.lng == Decimal.new("150.907125")
      assert pin.title == "some title"
      assert pin.user_id == user.id
    end

    test "create_pin/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Locations.create_pin(@invalid_attrs)
    end

    test "update_pin/2 with valid data updates the pin" do
      pin = pin_fixture()
      assert {:ok, pin} = Locations.update_pin(pin, @update_attrs)
      assert %Pin{} = pin
      assert pin.description == "some updated description"
      assert pin.lat == Decimal.new("-33.820457")
      assert pin.lng == Decimal.new("151.297659")
      assert pin.title == "some updated title"
    end

    test "update_pin/2 with invalid data returns error changeset" do
      pin = pin_fixture()
      assert {:error, %Ecto.Changeset{}} = Locations.update_pin(pin, @invalid_attrs)
      assert pin == Locations.get_pin!(pin.id)
    end

    test "delete_pin/1 deletes the pin" do
      pin = pin_fixture()
      assert {:ok, %Pin{}} = Locations.delete_pin(pin)
      assert_raise Ecto.NoResultsError, fn -> Locations.get_pin!(pin.id) end
    end

    test "change_pin/1 returns a pin changeset" do
      pin = pin_fixture()
      assert %Ecto.Changeset{} = Locations.change_pin(pin)
    end
  end
end
