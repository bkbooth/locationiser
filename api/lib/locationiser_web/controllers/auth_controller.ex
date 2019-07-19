defmodule LocationiserWeb.AuthController do
  use LocationiserWeb, :controller

  alias Locationiser.Accounts

  action_fallback(LocationiserWeb.FallbackController)

  def login(conn, %{"email" => email, "password" => password}) do
    case Accounts.authenticate_by_email_and_password(email, password) do
      {:ok, token, _claims} ->
        render(conn, "login.json", token: token)

      _ ->
        {:error, :unprocessable_entity}
    end
  end
end
