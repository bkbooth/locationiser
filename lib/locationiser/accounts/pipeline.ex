defmodule Locationiser.Accounts.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :locationiser,
    module: Locationiser.Accounts.Guardian,
    error_handler: Locationiser.Accounts.ErrorHandler

  alias Guardian.Plug

  plug Plug.VerifyHeader, realm: "Bearer"
  plug Plug.EnsureAuthenticated
  plug Plug.LoadResource
end
