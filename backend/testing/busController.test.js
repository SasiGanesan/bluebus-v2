import { createBus } from '../controllers/busController';
import Bus from '../model/busModel';

jest.mock('../middleware/authMiddleware'); // Mocking authMiddleware userId function

describe('createBus', () => {
  it('should create a new bus successfully', async () => {
    const req = {
      body: {
        busNumber: 'ABC123',
        busSeats: 30,
        isSleeper: true,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Bus.findOne = jest.fn().mockResolvedValue(null); // Mocking an empty result for an existing bus
    Bus.create = jest.fn().mockResolvedValue({
      user_id: 'userId',
      busNumber: 'ABC123',
      busSeats: 30,
      isSleeper: true,
    });

    await createBus(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user_id: 'userId',
      busNumber: 'ABC123',
      busSeats: 30,
      isSleeper: true,
    });
  });

  it('should handle an existing busNumber', async () => {
    const req = {
      body: {
        busNumber: 'ABC123',
        busSeats: 30,
        isSleeper: true,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Bus.findOne = jest.fn().mockResolvedValue({
      busNumber: 'ABC123',
      busSeats: 30,
      isSleeper: true,
    });

    await createBus(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'This Bus number already exists' });
  });

  it('should handle internal server error', async () => {
    const req = {
      body: {
        busNumber: 'ABC123',
        busSeats: 30,
        isSleeper: true,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Bus.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

    await createBus(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
