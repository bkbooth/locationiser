defmodule Locationiser.LocationsTest do
  use Locationiser.DataCase

  alias Locationiser.Repo
  alias Locationiser.Locations
  alias Locationiser.Locations.Pin

  setup _ do
    owner = user_fixture()
    {:ok, owner: owner}
  end

  test "create_pin/2 with valid data creates a pin", %{owner: owner} do
    assert {:ok, %Pin{} = pin} = Locations.create_pin(owner, valid_pin())
    assert pin.lat == Decimal.new("-34.423015")
    assert pin.lng == Decimal.new("150.907125")
    assert pin.title == "A Pin"
    assert pin.description == "A description of a pin"
  end

  test "create_pin/2 with invalid data returns error changeset", %{owner: owner} do
    assert {:error, %Ecto.Changeset{}} = Locations.create_pin(owner, invalid_pin())
  end

  describe "with existing pin" do
    setup %{owner: owner} do
      pin = pin_fixture(owner)
      {:ok, pin: pin}
    end

    test "list_pins/0 returns all pins", %{pin: pin} do
      assert Locations.list_pins() |> Repo.preload(:user) == [pin]
    end

    test "get_pin!/1 returns the pin with given id", %{pin: pin} do
      assert Locations.get_pin!(pin.id) |> Repo.preload(:user) == pin
    end

    test "update_pin/2 with valid data updates the pin", %{pin: pin} do
      attrs = %{lat: "-33.820457", lng: "151.297659"}
      assert {:ok, pin} = Locations.update_pin(pin, attrs)
      assert %Pin{} = pin
      assert pin.lat == Decimal.new("-33.820457")
      assert pin.lng == Decimal.new("151.297659")
    end

    test "update_pin/2 with invalid data returns error changeset", %{pin: pin} do
      assert {:error, %Ecto.Changeset{}} = Locations.update_pin(pin, invalid_pin())
      assert pin == Locations.get_pin!(pin.id) |> Repo.preload(:user)
    end

    test "delete_pin/1 deletes the pin", %{pin: pin} do
      assert {:ok, %Pin{}} = Locations.delete_pin(pin)
      assert_raise Ecto.NoResultsError, fn -> Locations.get_pin!(pin.id) end
    end

    test "change_pin/2 returns a pin changeset", %{pin: pin, owner: owner} do
      assert %Ecto.Changeset{} = Locations.change_pin(owner, pin)
    end
  end
end
