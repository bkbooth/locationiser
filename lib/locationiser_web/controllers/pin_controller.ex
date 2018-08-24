defmodule LocationiserWeb.PinController do
  use LocationiserWeb, :controller

  alias Locationiser.Accounts.Guardian
  alias Locationiser.Locations
  alias Locationiser.Locations.Pin

  action_fallback(LocationiserWeb.FallbackController)

  def action(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)
    apply(__MODULE__, action_name(conn), [conn, conn.params, current_user])
  end

  def index(conn, _params, current_user) do
    pins = Locations.list_user_pins(current_user)
    render(conn, "index.json", pins: pins)
  end

  def create(conn, %{"pin" => pin_params}, current_user) do
    with {:ok, %Pin{} = pin} <- Locations.create_pin(current_user, pin_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", pin_path(conn, :show, pin))
      |> render("show.json", pin: pin)
    end
  end

  def show(conn, %{"id" => id}, current_user) do
    pin = Locations.get_user_pin!(current_user, id)
    render(conn, "show.json", pin: pin)
  end

  def update(conn, %{"id" => id, "pin" => pin_params}, current_user) do
    pin = Locations.get_user_pin!(current_user, id)

    with {:ok, %Pin{} = pin} <- Locations.update_pin(pin, pin_params) do
      render(conn, "show.json", pin: pin)
    end
  end

  def delete(conn, %{"id" => id}, current_user) do
    pin = Locations.get_user_pin!(current_user, id)

    with {:ok, %Pin{}} <- Locations.delete_pin(pin) do
      send_resp(conn, :no_content, "")
    end
  end
end
