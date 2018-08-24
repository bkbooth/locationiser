defmodule Locationiser.AccountsTest do
  use Locationiser.DataCase

  alias Locationiser.Accounts
  alias Locationiser.Accounts.{Guardian, User}

  test "create_user/1 with valid data creates a user" do
    assert {:ok, %User{} = user} = Accounts.create_user(valid_user())
    assert user.email =~ ~r/^user\d+@example\.com$/
    assert user.name == "Test User"
    assert user.password_hash != "password123"
    refute user.password
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

    test "get_user_by_email/1 returns the user with a known email address", %{user: user} do
      assert Accounts.get_user_by_email(user.email) == user
    end

    test "get_user_by_email/1 returns nil with an unknown email address" do
      assert Accounts.get_user_by_email("unknown@example.com") == nil
    end

    test "update_user/2 with valid data updates the user", %{user: %User{id: id} = user} do
      attrs = %{name: "Updated Name"}
      assert {:ok, %User{} = user} = Accounts.update_user(user, attrs)
      assert user.id == id
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

    test "authenticate_by_email_and_password/2 returns a token with valid credentials", %{
      user: user
    } do
      assert {:ok, token, %{"sub" => sub} = auth_claims} =
               Accounts.authenticate_by_email_and_password(user.email, "password123")

      assert sub == user.id
      assert {:ok, verified_claims} = Guardian.decode_and_verify(token)
      assert verified_claims == auth_claims
    end

    test "authenticate_by_email_and_password/2 returns :unauthorized with invalid password", %{
      user: user
    } do
      assert {:error, :unauthorized} =
               Accounts.authenticate_by_email_and_password(user.email, "invalid123")
    end

    test "authenticate_by_email_and_password/2 returns :not_found with unknown email" do
      assert {:error, :not_found} =
               Accounts.authenticate_by_email_and_password("unknown@example.com", "password123")
    end
  end
end
