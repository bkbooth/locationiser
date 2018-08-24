defmodule LocationiserWeb.UserControllerTest do
  use LocationiserWeb.ConnCase

  alias Locationiser.Accounts.{Guardian, User}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "create user renders auth token when data is valid", %{conn: conn} do
    conn = post(conn, user_path(conn, :create), user: valid_user())
    assert %{"token" => token} = json_response(conn, 201)["data"]
    assert token =~ ~r/^[\w-]+\.[\w-]+\.[\w-]+$/
    assert {:ok, %User{id: id}, _claims} = Guardian.resource_from_token(token)

    conn = get(conn, user_path(conn, :show, id))

    data = json_response(conn, 200)["data"]
    assert data["id"] == id
    assert data["email"] =~ ~r/^user\d+@example\.com$/
    assert data["name"] == "Test User"
    refute data["password"]
    refute data["password_hash"]
  end

  test "create user renders errors when data is invalid", %{conn: conn} do
    conn = post(conn, user_path(conn, :create), user: invalid_user())
    assert json_response(conn, 422)["errors"] != %{}
  end

  describe "with existing user" do
    setup _ do
      user = user_fixture()
      {:ok, user: user}
    end

    test "index lists all users", %{conn: conn, user: %User{id: id}} do
      conn = get(conn, user_path(conn, :index))
      data = json_response(conn, 200)["data"]
      assert length(data) == 1
      assert List.first(data)["id"] == id
    end

    test "update renders user when data is valid", %{conn: conn, user: %User{id: id} = user} do
      attrs = %{name: "Updated Name"}
      conn = put(conn, user_path(conn, :update, user), user: attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, user_path(conn, :show, id))

      data = json_response(conn, 200)["data"]
      assert data["id"] == id
      assert data["name"] == "Updated Name"
    end

    test "update renders errors when data is invalid", %{conn: conn, user: user} do
      conn = put(conn, user_path(conn, :update, user), user: invalid_user())
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "delete deletes chosen user", %{conn: conn, user: user} do
      conn = delete(conn, user_path(conn, :delete, user))
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, user_path(conn, :show, user))
      end)
    end
  end
end
