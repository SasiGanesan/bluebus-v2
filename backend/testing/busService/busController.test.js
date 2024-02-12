import { createBus } from '../../controllers/busController';
import { existsBus, BusCreation } from '../../service/busService';

jest.mock('../../middleware/authMiddleware'); // Mocking authMiddleware

jest.mock('../../service/busService', () => ({
  existsBus: jest.fn(),
  BusCreation: jest.fn(),
}));

describe('createBus', () => {
  const mockRequest = {
    body: {
      busNumber: '12345',
      busSeats: 50,
      isSleeper: true,
    },
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mocking userId to return a fixed value for testing
    jest.requireMock('../../middleware/authMiddleware').userId.mockReturnValue(1);
  });

  test('should return 400 if bus number already exists', async () => {
    existsBus.mockResolvedValue(true);

    await createBus(mockRequest, mockResponse, next);

    expect(existsBus).toHaveBeenCalledWith({ busNumber: '12345' });
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'This Bus number already exists',
    });
  });

  test('should return 201 if bus is created successfully', async () => {
    existsBus.mockResolvedValue(false);
    BusCreation.mockResolvedValue({
      user_id: 1,
      busNumber: '12345',
      busSeats: 50,
      isSleeper: true,
    });

    await createBus(mockRequest, mockResponse, next);

    expect(existsBus).toHaveBeenCalledWith({ busNumber: '12345' });
    expect(BusCreation).toHaveBeenCalledWith(1, '12345', 50, true);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      user_id: 1,
      busNumber: '12345',
      busSeats: 50,
      isSleeper: true,
    });
  });

  // test('should call next with an error if there is an error', async () => {
  //   const error = new Error('Something went wrong');

  //   existsBus.mockRejectedValue(error);

  //   await createBus(mockRequest, mockResponse, next);

  //   expect(existsBus).toHaveBeenCalledWith({ busNumber: '12345' });
    
  //   console.log(next.mock.calls);
  //   expect(next).toHaveBeenCalledWith(error);
  // });
});
