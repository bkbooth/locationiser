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
      resources("/users", UserController, except: [:new, :edit])
    end

    scope "/v1" do
      pipe_through(:authenticated)

      resources("/pins", PinController, except: [:new, :edit])
    end
  end
end
