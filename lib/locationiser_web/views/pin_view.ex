defmodule LocationiserWeb.PinView do
  use LocationiserWeb, :view
  alias LocationiserWeb.PinView

  def render("index.json", %{pins: pins}) do
    %{data: render_many(pins, PinView, "pin.json")}
  end

  def render("show.json", %{pin: pin}) do
    %{data: render_one(pin, PinView, "pin.json")}
  end

  def render("pin.json", %{pin: pin}) do
    %{id: pin.id, lat: pin.lat, lng: pin.lng, title: pin.title, description: pin.description}
  end
end
