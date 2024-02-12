import mongoose from 'mongoose';
import { authUser, registerUser, getUserById } from '../../controllers/userControllers.js';
import User from '../../model/userModel.js';
import generateToken from '../../utils/generateToken.js';

jest.mock('../../utils/generateToken.js');
jest.mock('../../model/userModel');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('authUser', () => {
  it('should authenticate user and return a token', async () => {
    // Mock user data for testing
    const mockUser = {
      _id: 'mockUserId',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isAdmin: false,
      matchPassword: jest.fn().mockResolvedValue(true),
    };

    User.findOne = jest.fn().mockResolvedValue(mockUser);

    const req = {
      body: {
        email: 'john@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      _id: 'mockUserId',
      name: 'John Doe',
      email: 'john@example.com',
      isAdmin: false,
    });
  });

  it('should return 401 for invalid credentials', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);

    const req = {
      body: {
        email: 'john@example.com',
        password: 'invalidPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });
});



//registerUser testing
describe('registerUser', () => {
  it('should register a new user and return a token', async () => {
    const req = {
      body: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        isAdmin: false,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: 'newUserId',
      name: 'Jane Doe',
      email: 'jane@example.com',
      isAdmin: false,
    });

    await registerUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'jane@example.com' });
    expect(User.create).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      isAdmin: false,
    });
    expect(generateToken).toHaveBeenCalledWith(res, 'newUserId');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: 'newUserId',
      name: 'Jane Doe',
      email: 'jane@example.com',
      isAdmin: false,
    });
  });

  it('should return 400 for existing user', async () => {
    const req = {
      body: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        isAdmin: false,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne.mockResolvedValue({
      _id: 'existingUserId',
      name: 'Existing User',
      email: 'existing@example.com',
      isAdmin: false,
    });

    await registerUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'jane@example.com' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  it('should return 400 for password mismatch', async () => {
    const req = {
      body: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        confirmPassword: 'differentPassword',
        isAdmin: false,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await registerUser(req, res);

    expect(User.findOne).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Password do not match' });
  });

  it('should return 500 for invalid user data', async () => {
    const req = {
      body: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        isAdmin: false,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne.mockResolvedValue(null);
    User.create.mockRejectedValue(new Error('Invalid user data'));

    await registerUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'jane@example.com' });
    expect(User.create).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      isAdmin: false,
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Enter valid details' });
  });
});

//getUserById
describe('getUserById', () => {
  it('should get user by ID', async () => {
    User.findById = jest.fn().mockResolvedValue({
      _id: 'userId',
      name: 'Test User',
      email: 'test@example.com',
      isAdmin: false,
    });

    const req = {
      params: {
        id: 'userId',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getUserById(req, res);

    expect(User.findById).toHaveBeenCalledWith('userId');
    expect(res.json).toHaveBeenCalledWith({
      _id: 'userId',
      name: 'Test User',
      email: 'test@example.com',
      isAdmin: false,
    });
  });

  it('should return 400 for invalid user ID', async () => {
    User.findById = jest.fn().mockResolvedValue(null);

    const req = {
      params: {
        id: 'invalidId',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUserById(req, res);

    expect(User.findById).toHaveBeenCalledWith('invalidId');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user Id' });
  });
});
