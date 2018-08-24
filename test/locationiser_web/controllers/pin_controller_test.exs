defmodule LocationiserWeb.PinControllerTest do
  use LocationiserWeb.ConnCase

  alias Locationiser.Accounts.Guardian
  alias Locationiser.Locations.Pin

  setup %{conn: conn} do
    owner = user_fixture()

    conn =
      conn
      |> put_req_header("accept", "application/json")
      |> Guardian.Plug.sign_in(owner)

    {:ok, conn: conn, owner: owner}
  end

  test "create pin renders pin when data is valid", %{conn: conn, owner: owner} do
    conn = post(conn, pin_path(conn, :create), pin: valid_pin())
    assert %{"id" => id} = json_response(conn, 201)["data"]

    conn =
      conn
      |> recycle_and_authorize(owner)
      |> get(pin_path(conn, :show, id))

    data = json_response(conn, 200)["data"]
    assert data["id"] == id
    assert data["lat"] == "-34.423015"
    assert data["lng"] == "150.907125"
    assert data["title"] == "A Pin"
    assert data["description"] == "A description of a pin"
  end

  test "create pin renders errors when data is invalid", %{conn: conn} do
    conn = post(conn, pin_path(conn, :create), pin: invalid_pin())
    assert json_response(conn, 422)["errors"] != %{}
  end

  describe "with existing pin" do
    setup %{owner: owner} do
      pin = pin_fixture(owner)
      {:ok, pin: pin}
    end

    test "index lists all pins", %{conn: conn, pin: %Pin{id: id}} do
      conn = get(conn, pin_path(conn, :index))
      data = json_response(conn, 200)["data"]
      assert length(data) == 1
      assert List.first(data)["id"] == id
    end

    test "update renders pin when data is valid", %{
      conn: conn,
      pin: %Pin{id: id} = pin,
      owner: owner
    } do
      attrs = %{lat: "-33.820457", lng: "151.297659"}
      conn = put(conn, pin_path(conn, :update, pin), pin: attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn =
        conn
        |> recycle_and_authorize(owner)
        |> get(pin_path(conn, :show, id))

      data = json_response(conn, 200)["data"]
      assert data["id"] == id
      assert data["lat"] == "-33.820457"
      assert data["lng"] == "151.297659"
    end

    test "update renders errors when data is invalid", %{conn: conn, pin: pin} do
      conn = put(conn, pin_path(conn, :update, pin), pin: invalid_pin())
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "delete deletes chosen pin", %{conn: conn, pin: pin, owner: owner} do
      conn = delete(conn, pin_path(conn, :delete, pin))
      assert response(conn, 204)

      conn = recycle_and_authorize(conn, owner)

      assert_error_sent(404, fn ->
        get(conn, pin_path(conn, :show, pin))
      end)
    end
  end
end
