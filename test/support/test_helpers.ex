defmodule Locationiser.TestHelpers do
  alias Locationiser.Accounts

  @doc """
  Recycle a Plug.Conn and authorize the given user.
  """
  def recycle_and_authorize(%Plug.Conn{} = conn, %Accounts.User{} = user) do
    conn
    |> Phoenix.ConnTest.recycle()
    |> Accounts.Guardian.Plug.sign_in(user)
  end
end
