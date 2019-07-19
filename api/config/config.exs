# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :locationiser,
  ecto_repos: [Locationiser.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :locationiser, LocationiserWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "rV06oieijb+MFrmWQOFTTzDdT4annrIyux0hS97H44EcLjHuLVudDZJGLrYgWT8q",
  render_errors: [view: LocationiserWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Locationiser.PubSub, adapter: Phoenix.PubSub.PG2]

# Configure Guardian
config :locationiser, Locationiser.Accounts.Guardian,
  issuer: "locationiser",
  secret_key: "ah8eC6QgyMOcrbVoa18XlegL2x2uuw2H/jMt+FxTBfnMQg2vr4nrGVLEyiABKBqS"

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
