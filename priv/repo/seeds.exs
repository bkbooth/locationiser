# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Locationiser.Repo.insert!(%Locationiser.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Locationiser.{Accounts, Locations}

{:ok, mario} =
  Accounts.create_user(%{
    name: "Mario",
    email: "mario@example.com",
    password: "mario123"
  })

{:ok, _} =
  Locations.create_pin(mario, %{
    lat: "-37.8253632",
    lng: "144.9503893",
    title: "Southbank, Melbourne",
    description:
      "Southbank draws a sophisticated crowd to its cultural venues, which include the Malthouse theater, based in a restored brewery, and the state-of-the-art Melbourne Recital Centre which hosts classical concerts."
  })

{:ok, _} =
  Locations.create_pin(mario, %{
    lat: "-37.8309747",
    lng: "144.9610451",
    title: "Melbourne Zoo",
    description:
      "Modelled on London Zoo, this family-friendly establishment has animals from all around the world."
  })

{:ok, _} =
  Locations.create_pin(mario, %{
    lat: "-37.8179694",
    lng: "144.9178756",
    title: "Royal Botanic Gardens Melbourne",
    description:
      "36-hectare botanic garden founded in 1846, planted with Australian species and non-native gardens."
  })

{:ok, luigi} =
  Accounts.create_user(%{
    name: "Luigi",
    email: "luigi@example.com",
    password: "luigi123"
  })

{:ok, _} =
  Locations.create_pin(luigi, %{
    lat: "-27.4467653",
    lng: "153.0090062",
    title: "Suncorp Stadium",
    description:
      "52,500-capacity stadium hosting rugby and soccer home games for Brisbane teams, plus major concerts."
  })

{:ok, _} =
  Locations.create_pin(luigi, %{
    lat: "-27.4692931",
    lng: "153.0564987",
    title: "Eat Street Northshore",
    description:
      "Lively venue at a former container wharf featuring stalls with international street eats & beer."
  })

{:ok, _} =
  Locations.create_pin(luigi, %{
    lat: "-27.4592813",
    lng: "153.0304701",
    title: "Fortitude Valley, Brisbane",
    description:
      "Fortitude Valley is packed with nightlife, offering everything from dive bars and mellow live music venues to rooftop cocktail lounges and pumping dance clubs."
  })
