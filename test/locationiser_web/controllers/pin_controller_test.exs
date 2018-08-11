defmodule LocationiserWeb.PinControllerTest do
  use LocationiserWeb.ConnCase

  alias Locationiser.Locations
  alias Locationiser.Locations.Pin

  @create_attrs %{
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

  def fixture(:pin) do
    user = user_fixture()

    {ok, pin} =
      %{user_id: user.id}
      |> Enum.into(@create_attrs)
      |> Locations.create_pin()

    pin
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all pins", %{conn: conn} do
      conn = get(conn, pin_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create pin" do
    test "renders pin when data is valid", %{conn: conn} do
      user = user_fixture()
      attrs = Enum.into(%{user_id: user.id}, @create_attrs)
      conn = post(conn, pin_path(conn, :create), pin: attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, pin_path(conn, :show, id))

      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "description" => "some description",
               "lat" => "-34.423015",
               "lng" => "150.907125",
               "title" => "some title"
             }
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, pin_path(conn, :create), pin: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update pin" do
    setup [:create_pin]

    test "renders pin when data is valid", %{conn: conn, pin: %Pin{id: id} = pin} do
      conn = put(conn, pin_path(conn, :update, pin), pin: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, pin_path(conn, :show, id))

      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "description" => "some updated description",
               "lat" => "-33.820457",
               "lng" => "151.297659",
               "title" => "some updated title"
             }
    end

    test "renders errors when data is invalid", %{conn: conn, pin: pin} do
      conn = put(conn, pin_path(conn, :update, pin), pin: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete pin" do
    setup [:create_pin]

    test "deletes chosen pin", %{conn: conn, pin: pin} do
      conn = delete(conn, pin_path(conn, :delete, pin))
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, pin_path(conn, :show, pin))
      end)
    end
  end

  defp create_pin(_) do
    pin = fixture(:pin)
    {:ok, pin: pin}
  end
end
