defmodule LocationiserWeb.AuthView do
  use LocationiserWeb, :view

  def render("login.json", %{token: token}) do
    %{data: %{token: token}}
  end
end
