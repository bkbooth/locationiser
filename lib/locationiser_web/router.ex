defmodule LocationiserWeb.Router do
  use LocationiserWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", LocationiserWeb do
    pipe_through :api
  end
end
