defmodule LocationiserWeb.Router do
  use LocationiserWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :authenticated do
    plug(Locationiser.Accounts.Pipeline)
  end

  scope "/api", LocationiserWeb do
    pipe_through(:api)

    scope "/v1" do
      post("/auth/login", AuthController, :login)
      resources("/users", UserController, only: [:index, :create, :show])
    end

    scope "/v1" do
      pipe_through(:authenticated)

      get("/user", UserController, :current)
      resources("/users", UserController, only: [:update, :delete])
      resources("/pins", PinController, except: [:new, :edit])
    end
  end
end
