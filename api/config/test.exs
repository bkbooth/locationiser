use Mix.Config

# Configure your database
config :locationiser, Locationiser.Repo,
  username: "postgres",
  password: "postgres",
  database: "locationiser_test",
  hostname: System.get_env("DATABASE_HOST") || "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :locationiser, LocationiserWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Reduce bcrypt work to speed up tests
config :bcrypt_elixir,
  log_rounds: 4
