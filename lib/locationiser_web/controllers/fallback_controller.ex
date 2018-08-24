defmodule LocationiserWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use LocationiserWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(LocationiserWeb.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(LocationiserWeb.ErrorView, :"404")
  end

  def call(conn, {:error, :unprocessable_entity}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(LocationiserWeb.ErrorView, :"422")
  end
end
