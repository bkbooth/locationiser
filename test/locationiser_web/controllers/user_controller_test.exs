defmodule LocationiserWeb.UserControllerTest do
  use LocationiserWeb.ConnCase

  alias Locationiser.Accounts.{Guardian, User}

  test "create user renders auth token when data is valid", %{conn: conn} do
    conn = post(conn, user_path(conn, :create), user: valid_user())
    assert %{"token" => token} = json_response(conn, 201)["data"]
    assert token =~ ~r/^[\w-]+\.[\w-]+\.[\w-]+$/
    assert {:ok, %User{id: id}, _claims} = Guardian.resource_from_token(token)

    conn = get(conn, user_path(conn, :show, id))

    data = json_response(conn, 200)["data"]
    assert data["id"] == id
    assert data["name"] == "Test User"
    refute data["email"]
    refute data["password"]
    refute data["password_hash"]
  end

  test "create user renders errors when data is invalid", %{conn: conn} do
    conn = post(conn, user_path(conn, :create), user: invalid_user())
    assert json_response(conn, 422)["errors"] != %{}
  end

  describe "with existing user" do
    setup _ do
      {:ok, user: user_fixture()}
    end

    test "index lists all users", %{conn: conn, user: %User{id: id}} do
      conn = get(conn, user_path(conn, :index))
      data = json_response(conn, 200)["data"]
      assert length(data) == 1
      assert List.first(data)["id"] == id
    end
  end

  describe "with authorized user" do
    @tag :authorize
    test "current renders current user", %{conn: conn, user: %User{id: id} = user} do
      conn = get(conn, user_path(conn, :current))
      data = json_response(conn, 200)["data"]
      assert data["id"] == id
      assert data["name"] == user.name
    end

    @tag :authorize
    test "update renders user when data is valid", %{conn: conn, user: %User{id: id} = user} do
      attrs = %{name: "Updated Name"}
      conn = put(conn, user_path(conn, :update, user), user: attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, user_path(conn, :show, id))

      data = json_response(conn, 200)["data"]
      assert data["id"] == id
      assert data["name"] == "Updated Name"
    end

    @tag :authorize
    test "update renders errors when data is invalid", %{conn: conn, user: user} do
      conn = put(conn, user_path(conn, :update, user), user: invalid_user())
      assert json_response(conn, 422)["errors"] != %{}
    end

    @tag :authorize
    test "delete deletes chosen user", %{conn: conn, user: user} do
      conn = delete(conn, user_path(conn, :delete, user))
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, user_path(conn, :show, user))
      end)
    end
  end
end
