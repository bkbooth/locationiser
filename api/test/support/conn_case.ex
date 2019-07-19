defmodule LocationiserWeb.ConnCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require setting up a connection.

  Such tests rely on `Phoenix.ConnTest` and also
  import other functionality to make it easier
  to build common datastructures and query the data layer.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      # Import conveniences for testing with connections
      use Phoenix.ConnTest

      import Locationiser.TestFixtures
      import Locationiser.TestHelpers
      import LocationiserWeb.Router.Helpers

      # The default endpoint for testing
      @endpoint LocationiserWeb.Endpoint
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Locationiser.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Locationiser.Repo, {:shared, self()})
    end

    conn =
      Phoenix.ConnTest.build_conn()
      |> Plug.Conn.put_req_header("accept", "application/json")

    if tags[:authorize] do
      user = Locationiser.TestFixtures.user_fixture()
      conn = Locationiser.Accounts.Guardian.Plug.sign_in(conn, user)
      {:ok, conn: conn, user: user}
    else
      {:ok, conn: conn}
    end
  end
end
