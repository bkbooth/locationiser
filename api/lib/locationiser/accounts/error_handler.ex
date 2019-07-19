defmodule Locationiser.Accounts.ErrorHandler do
  import Plug.Conn

  alias Plug.Conn.Status

  def auth_error(conn, {_type, _reason}, _opts) do
    reason_code = Status.code(:unauthorized)
    body = Jason.encode!(%{errors: %{detail: Status.reason_phrase(reason_code)}})

    conn
    |> put_resp_header("content-type", "application/json")
    |> send_resp(reason_code, body)
  end
end
