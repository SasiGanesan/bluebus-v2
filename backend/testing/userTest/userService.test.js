import User from "../../model/userModel.js";
import { loginUser, findUserById, UserRegister } from "../../service/userService.js";

jest.mock("../../model/userModel.js");

describe("User Service Tests", () => {
  describe("loginUser", () => {
    it("should return user if login is successful", async () => {
      const mockedUser = {
        email: "test@example.com",
        matchPassword: jest.fn().mockResolvedValue(true),
      };

      User.findOne.mockResolvedValue(mockedUser);

      const result = await loginUser("test@example.com", "password");

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(mockedUser.matchPassword).toHaveBeenCalledWith("password");
      expect(result).toEqual(mockedUser);
    });

    it("should return null if user does not exist", async () => {
      User.findOne.mockResolvedValue(null);

      const result = await loginUser("nonexistent@example.com", "password");

      expect(User.findOne).toHaveBeenCalledWith({
        email: "nonexistent@example.com",
      });
      expect(result).toBeNull();
    });

    it("should return null if password does not match", async () => {
      const mockedUser = {
        email: "test@example.com",
        matchPassword: jest.fn().mockResolvedValue(false),
      };

      User.findOne.mockResolvedValue(mockedUser);

      const result = await loginUser("test@example.com", "wrongpassword");

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(mockedUser.matchPassword).toHaveBeenCalledWith("wrongpassword");
      expect(result).toBeNull();
    });
  });

  describe("findUserById", () => {
    it("should return user if found by ID", async () => {
      const mockedUser = { /* your mocked user object */ };

      User.findById.mockResolvedValue(mockedUser);

      const result = await findUserById("user123");

      expect(User.findById).toHaveBeenCalledWith("user123");
      expect(result).toEqual(mockedUser);
    });

    it("should return null if user is not found by ID", async () => {
      User.findById.mockResolvedValue(null);

      const result = await findUserById("nonexistentId");

      expect(User.findById).toHaveBeenCalledWith("nonexistentId");
      expect(result).toBeNull();
    });
  });

  describe("UserRegister", () => {
    it("should create a new user and return it", async () => {
      const newUser = { /* your new user object */ };

      User.create.mockResolvedValue(newUser);

      const result = await UserRegister(
        newUser.name,
        newUser.email,
        newUser.password,
        newUser.confirmPassword,
        newUser.isAdmin
      );

      expect(User.create).toHaveBeenCalledWith({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        confirmPassword: newUser.confirmPassword,
        isAdmin: newUser.isAdmin,
      });
      expect(result).toEqual(newUser);
    });
  });
});
