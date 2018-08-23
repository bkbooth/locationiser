defmodule Locationiser.AccountsTest do
  use Locationiser.DataCase

  alias Locationiser.Accounts
  alias Locationiser.Accounts.User

  test "create_user/1 with valid data creates a user" do
    assert {:ok, %User{} = user} = Accounts.create_user(valid_user())
    assert user.email =~ ~r/^user\d+@example\.com$/
    assert user.name == "Test User"
    assert user.password_hash == "password123"
  end

  test "create_user/1 with invalid data returns error changeset" do
    assert {:error, %Ecto.Changeset{}} = Accounts.create_user(invalid_user())
  end

  describe "with existing user" do
    setup _ do
      user = user_fixture()
      {:ok, user: user}
    end

    test "list_users/0 returns all users", %{user: user} do
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id", %{user: user} do
      assert Accounts.get_user!(user.id) == user
    end

    test "update_user/2 with valid data updates the user", %{user: user} do
      attrs = %{name: "Updated Name"}
      assert {:ok, user} = Accounts.update_user(user, attrs)
      assert %User{} = user
      assert user.name == "Updated Name"
    end

    test "update_user/2 with invalid data returns error changeset", %{user: user} do
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, invalid_user())
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user", %{user: user} do
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset", %{user: user} do
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end
end
