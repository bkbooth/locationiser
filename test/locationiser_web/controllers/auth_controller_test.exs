defmodule LocationiserWeb.AuthControllerTest do
  use LocationiserWeb.ConnCase

  alias Locationiser.Accounts.{Guardian, User}

  setup %{conn: conn} do
    user = user_fixture()
    {:ok, conn: put_req_header(conn, "accept", "application/json"), user: user}
  end

  test "login renders auth token with valid credentials", %{conn: conn, user: user} do
    credentials = %{email: user.email, password: "password123"}
    conn = post(conn, auth_path(conn, :login), credentials)
    assert %{"token" => token} = json_response(conn, 200)["data"]
    assert token =~ ~r/^[\w-]+\.[\w-]+\.[\w-]+$/

    assert {:ok, %User{id: id}, _claims} = Guardian.resource_from_token(token)
    assert id == user.id
  end

  test "login renders errors with invalid password", %{conn: conn, user: user} do
    credentials = %{email: user.email, password: "invalid123"}
    conn = post(conn, auth_path(conn, :login), credentials)
    errors = json_response(conn, 422)["errors"]
    assert errors["detail"] == Plug.Conn.Status.reason_phrase(422)
  end

  test "login renders errors with unkown email", %{conn: conn} do
    credentials = %{email: "unknown@example.com", password: "password123"}
    conn = post(conn, auth_path(conn, :login), credentials)
    errors = json_response(conn, 422)["errors"]
    assert errors["detail"] == Plug.Conn.Status.reason_phrase(422)
  end
end
