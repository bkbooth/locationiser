defmodule Locationiser.Repo do
  use Ecto.Repo,
    otp_app: :locationiser,
    adapter: Ecto.Adapters.Postgres
end
