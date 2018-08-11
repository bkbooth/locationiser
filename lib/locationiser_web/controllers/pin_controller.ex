defmodule LocationiserWeb.PinController do
  use LocationiserWeb, :controller

  alias Locationiser.Locations
  alias Locationiser.Locations.Pin

  action_fallback(LocationiserWeb.FallbackController)

  def index(conn, _params) do
    pins = Locations.list_pins()
    render(conn, "index.json", pins: pins)
  end

  def create(conn, %{"pin" => pin_params}) do
    with {:ok, %Pin{} = pin} <- Locations.create_pin(pin_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", pin_path(conn, :show, pin))
      |> render("show.json", pin: pin)
    end
  end

  def show(conn, %{"id" => id}) do
    pin = Locations.get_pin!(id)
    render(conn, "show.json", pin: pin)
  end

  def update(conn, %{"id" => id, "pin" => pin_params}) do
    pin = Locations.get_pin!(id)

    with {:ok, %Pin{} = pin} <- Locations.update_pin(pin, pin_params) do
      render(conn, "show.json", pin: pin)
    end
  end

  def delete(conn, %{"id" => id}) do
    pin = Locations.get_pin!(id)

    with {:ok, %Pin{}} <- Locations.delete_pin(pin) do
      send_resp(conn, :no_content, "")
    end
  end
end
