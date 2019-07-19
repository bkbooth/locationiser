# In this file, we load production configuration and
# secrets from environment variables. You can also
# hardcode secrets, although such is generally not
# recommended and you have to remember to add this
# file to your .gitignore.
use Mix.Config

database_url =
  System.get_env("DATABASE_URL") ||
    raise """
    environment variable DATABASE_URL is missing.
    For example: ecto://USER:PASS@HOST/DATABASE
    """

config :locationiser, Locationiser.Repo, url: database_url

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

config :locationiser, LocationiserWeb.Endpoint, secret_key_base: secret_key_base

guardian_secret_key =
  System.get_env("GUARDIAN_SECRET_KEY") ||
    raise """
    environment variable GUARDIAN_SECRET_KEY is missing.
    You can generate one by calling: mix phx.gen.secret
    """

config :locationiser, Locationiser.Accounts.Guardian, secret_key: guardian_secret_key

client_origin =
  System.get_env("CLIENT_ORIGIN") ||
    raise """
    environment variable CLIENT_ORIGIN is missing.
    For example: http://example.com
    """

config :cors_plug, origin: [client_origin]
