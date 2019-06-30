defmodule Locationiser.LocationsTest do
  use Locationiser.DataCase

  alias Locationiser.Repo
  alias Locationiser.Locations
  alias Locationiser.Locations.Pin

  setup _ do
    {:ok, owner: user_fixture()}
  end

  test "create_pin/2 with valid data creates a pin", %{owner: owner} do
    assert {:ok, %Pin{} = pin} = Locations.create_pin(owner, valid_pin())
    assert pin.lat == Decimal.new("-34.423015")
    assert pin.lng == Decimal.new("150.907125")
    assert pin.zoom == 16
    assert pin.title == "A Pin"
    assert pin.description == "A description of a pin"
  end

  test "create_pin/2 with invalid data returns error changeset", %{owner: owner} do
    assert {:error, %Ecto.Changeset{}} = Locations.create_pin(owner, invalid_pin())
  end

  describe "with existing pins" do
    setup %{owner: owner} do
      other_user = user_fixture()
      {:ok, owned_pin: pin_fixture(owner), other_pin: pin_fixture(other_user)}
    end

    test "list_pins/0 returns all pins", %{owned_pin: owned_pin, other_pin: other_pin} do
      all_pins = Locations.list_pins() |> Repo.preload(:user)
      assert length(all_pins) == 2
      assert List.first(all_pins) == owned_pin
      assert List.last(all_pins) == other_pin
    end

    test "list_user_pins/1 returns all pins for a user", %{owned_pin: pin, owner: owner} do
      user_pins = Locations.list_user_pins(owner) |> Repo.preload(:user)
      assert length(user_pins) == 1
      assert List.first(user_pins) == pin
    end

    test "get_pin!/1 returns the pin with given id", %{owned_pin: pin} do
      assert Locations.get_pin!(pin.id) |> Repo.preload(:user) == pin
    end

    test "get_user_pin!/2 returns the pin if the user is the owner", %{
      owned_pin: pin,
      owner: owner
    } do
      assert Locations.get_user_pin!(owner, pin.id) |> Repo.preload(:user) == pin
    end

    test "get_user_pin!/2 raises error if the user is not the owner", %{
      other_pin: pin,
      owner: owner
    } do
      assert_raise Ecto.NoResultsError, fn ->
        Locations.get_user_pin!(owner, pin.id)
      end
    end

    test "update_pin/2 with valid data updates the pin", %{owned_pin: %Pin{id: id} = pin} do
      attrs = %{lat: "-33.820457", lng: "151.297659", zoom: 17}
      assert {:ok, %Pin{} = pin} = Locations.update_pin(pin, attrs)
      assert pin.id == id
      assert pin.lat == Decimal.new("-33.820457")
      assert pin.lng == Decimal.new("151.297659")
      assert pin.zoom == 17
    end

    test "update_pin/2 with invalid data returns error changeset", %{owned_pin: pin} do
      assert {:error, %Ecto.Changeset{}} = Locations.update_pin(pin, invalid_pin())
      assert pin == Locations.get_pin!(pin.id) |> Repo.preload(:user)
    end

    test "delete_pin/1 deletes the pin", %{owned_pin: pin} do
      assert {:ok, %Pin{}} = Locations.delete_pin(pin)
      assert_raise Ecto.NoResultsError, fn -> Locations.get_pin!(pin.id) end
    end

    test "change_pin/2 returns a pin changeset", %{owned_pin: pin, owner: owner} do
      assert %Ecto.Changeset{} = Locations.change_pin(owner, pin)
    end
  end
end
