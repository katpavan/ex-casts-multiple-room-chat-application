defmodule TestWeb.ChatController do
  use TestWeb, :controller

  def show(conn, %{"id" => room}) do
    render(conn, "show.html", room: room)
  end
end