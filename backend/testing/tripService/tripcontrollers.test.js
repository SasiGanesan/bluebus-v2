import { createTrip, searchBus, getTripById } from '../../controllers/tripcontrollers.js';
import Trip from '../../model/tripModel.js';

jest.mock('../../model/tripModel'); // Mocking the Trip model

describe('createTrip', () => {
  it('should create a new trip successfully', async () => {
    const req = {
      body: {
        busNumber: 'ABC123',
        origin: 'CityA',
        destination: 'CityB',
        date: '2023-12-31',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        fare: 50,
        availableSeats: 30,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Trip.findOne = jest.fn().mockResolvedValue(null); // Mocking an empty result for an existing trip
    Trip.create = jest.fn().mockResolvedValue({
      busNumber: 'ABC123',
      origin: 'CityA',
      destination: 'CityB',
      date: '2023-12-31',
      departureTime: '12:00 PM',
      arrivalTime: '3:00 PM',
      fare: 50,
      availableSeats: 30,
    });

    await createTrip(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      busNumber: 'ABC123',
      origin: 'CityA',
      destination: 'CityB',
      date: '2023-12-31',
      departureTime: '12:00 PM',
      arrivalTime: '3:00 PM',
      fare: 50,
      availableSeats: 30,
    });
  });

  it('should handle error while creating a trip', async () => {
    const req = {
      body: {
        busNumber: 'ABC123',
        origin: 'CityA',
        destination: 'CityB',
        date: '2023-12-31',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        fare: 50,
        availableSeats: 30,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Trip.findOne = jest.fn().mockResolvedValue(null);
    Trip.create = jest.fn().mockRejectedValue({ message: 'Internal Server Error' });

    await createTrip(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});

describe('searchBus', () => {
  it('should search for available buses successfully', async () => {
    const req = {
      query: {
        from: 'CityA',
        to: 'CityB',
        date: '2023-12-31',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Trip.find = jest.fn().mockResolvedValue([
      {
        busNumber: 'ABC123',
        origin: 'CityA',
        destination: 'CityB',
        date: '2023-12-31',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        fare: 50,
        availableSeats: 30,
      },
    ]);

    await searchBus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        busNumber: 'ABC123',
        origin: 'CityA',
        destination: 'CityB',
        date: '2023-12-31',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        fare: 50,
        availableSeats: 30,
      },
    ]);
  });

  it('should handle no available buses', async () => {
    const req = {
      query: {
        from: 'CityA',
        to: 'CityB',
        date: '2023-12-31',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Trip.find = jest.fn().mockResolvedValue([]);

    await searchBus(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No available bus' });
  });

  it('should handle error while searching for buses', async () => {
    const req = {
      query: {
        from: 'CityA',
        to: 'CityB',
        date: '2023-12-31',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Trip.find = jest.fn().mockRejectedValue({ message: 'Internal Server Error' });

    await searchBus(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});

describe('getTripById', () => {
  it('should get trip by ID successfully', async () => {
    const req = {
      params: {
        id: '12345',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Trip.findById = jest.fn().mockResolvedValue({
      busNumber: 'ABC123',
      origin: 'CityA',
      destination: 'CityB',
      date: '2023-12-31',
      departureTime: '12:00 PM',
      arrivalTime: '3:00 PM',
      fare: 50,
      availableSeats: 30,
    });

    await getTripById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      busNumber: 'ABC123',
      origin: 'CityA',
      destination: 'CityB',
      date: '2023-12-31',
      departureTime: '12:00 PM',
      arrivalTime: '3:00 PM',
      fare: 50,
      availableSeats: 30,
    });
  });

  it('should handle trip not found', async () => {
    const req = {
      params: {
        id: '12345',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Trip.findById = jest.fn().mockResolvedValue(null);

    await getTripById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Trip not found' });
  });

  it('should handle invalid trip ID', async () => {
    const req = {
      params: {
        id: 'invalidId',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Trip.findById = jest.fn().mockRejectedValue({ message: 'Invalid Trip Id' });

    await getTripById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Trip Id' });
  });
});
