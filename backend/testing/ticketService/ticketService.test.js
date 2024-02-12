import {
  findTripById,
  bookTicket,
  checkSeatExist,
  UpdateTrip,
  findTicketById,
  cancelTicket,
  updatedTrip,
  getTickets,
} from '../../service/ticketService.js';
  import Ticket from '../../model/ticketModel.js';
  import Trip from '../../model/tripModel.js';
  
  jest.mock('../../model/ticketModel');
  jest.mock('../../model/tripModel');
  
  describe('findTripById', () => {
    it('should find a trip by ID successfully', async () => {
      const tripId = '12345';
  
      Trip.findById = jest.fn().mockResolvedValue({
        _id: tripId,
        busNumber: 'ABC123',
        origin: 'CityA',
        destination: 'CityB',
        date: '2023-12-31',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        fare: 50,
        availableSeats: 30,
        bookedSeats: ['1', '2'],
      });
  
      const result = await findTripById(tripId);
  
      expect(result).toEqual({
        _id: tripId,
        busNumber: 'ABC123',
        origin: 'CityA',
        destination: 'CityB',
        date: '2023-12-31',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        fare: 50,
        availableSeats: 30,
        bookedSeats: ['1', '2'],
      });
    });
  });
  
  describe('bookTicket', () => {
    it('should book a ticket successfully', async () => {
      const mockTicketData = {
        user_id: 'user123',
        trip_id: 'trip123',
        busNumber: 'ABC123',
        bookingDate: '2023-12-01',
        passengers: ['Passenger 1', 'Passenger 2'],
        numberOfSeats: 2,
        date: '2023-12-31',
        origin: 'CityA',
        destination: 'CityB',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        totalPrice: 100,
      };
  
      Ticket.create = jest.fn().mockResolvedValue(mockTicketData);
  
      const result = await bookTicket(...Object.values(mockTicketData));
  
      expect(result).toEqual(mockTicketData);
    });
  });
  
  describe('checkSeatExist', () => {
    it('Check the Seats are Booked or Not', async () => {
      const tripId = 'TripId';
      const seatNumbers = [1, 2, 3];

      Trip.findOne.mockResolvedValue(null);

      const result = await checkSeatExist(tripId, seatNumbers);

      expect(Trip.findOne).toHaveBeenCalledWith({
        _id: tripId,
        bookedSeats: { $in: seatNumbers },
      });
      expect(result).toBeNull();
    });
  });
  
  describe('UpdateTrip', () => {
    it('should update trip details successfully', async () => {
      const trip_id = 'trip123';
      const numberOfSeats = 2;
      const seatNumbers = ['4', '5'];
  
      Trip.findOneAndUpdate = jest.fn().mockResolvedValue({
        _id: trip_id,
        busNumber: 'ABC123',
        origin: 'CityA',
        destination: 'CityB',
        date: '2023-12-31',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        fare: 50,
        availableSeats: 28,
        bookedSeats: ['1', '2', '3'],
      });
  
      const result = await UpdateTrip(trip_id, numberOfSeats, seatNumbers);
  
      expect(result).toEqual({
        _id: trip_id,
        busNumber: 'ABC123',
        origin: 'CityA',
        destination: 'CityB',
        date: '2023-12-31',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        fare: 50,
        availableSeats: 28,
        bookedSeats: ['1', '2', '3'],
      });
    });
  });
  
  describe('findTicketById', () => {
    it('should find a ticket by ID successfully', async () => {
      const ticketId = 'ticket123';
  
      Ticket.findById = jest.fn().mockResolvedValue({
        _id: ticketId,
        user_id: 'user123',
        trip_id: 'trip123',
        busNumber: 'ABC123',
        bookingDate: '2023-12-01',
        passengers: ['Passenger 1', 'Passenger 2'],
        numberOfSeats: 2,
        date: '2023-12-31',
        origin: 'CityA',
        destination: 'CityB',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        totalPrice: 100,
      });
  
      const result = await findTicketById(ticketId);
  
      expect(result).toEqual({
        _id: ticketId,
        user_id: 'user123',
        trip_id: 'trip123',
        busNumber: 'ABC123',
        bookingDate: '2023-12-01',
        passengers: ['Passenger 1', 'Passenger 2'],
        numberOfSeats: 2,
        date: '2023-12-31',
        origin: 'CityA',
        destination: 'CityB',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        totalPrice: 100,
      });
    });
  });
  
  describe('cancelTicket', () => {
    it('should cancel a ticket successfully', async () => {
      const ticketId = 'ticket123';
  
      Ticket.findById = jest.fn().mockResolvedValue({
        _id: ticketId,
        user_id: 'user123',
        trip_id: 'trip123',
        busNumber: 'ABC123',
        bookingDate: '2023-12-01',
        passengers: ['Passenger 1', 'Passenger 2'],
        numberOfSeats: 2,
        date: '2023-12-31',
        origin: 'CityA',
        destination: 'CityB',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        totalPrice: 100,
      });
  
      const result = await cancelTicket(ticketId);
  
      expect(result).toEqual({
        _id: ticketId,
        user_id: 'user123',
        trip_id: 'trip123',
        busNumber: 'ABC123',
        bookingDate: '2023-12-01',
        passengers: ['Passenger 1', 'Passenger 2'],
        numberOfSeats: 2,
        date: '2023-12-31',
        origin: 'CityA',
        destination: 'CityB',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        totalPrice: 100,
      });
    });
  });
  
  describe('updatedTrip', () => {
    it('should update trip details successfully', async () => {
      const trip_id = 'trip123';
      const numberOfSeats = 2;
      const seatNumbers = ['4', '5'];
  
      Trip.findOneAndUpdate = jest.fn().mockResolvedValue({
        _id: trip_id,
        busNumber: 'ABC123',
        origin: 'CityA',
        destination: 'CityB',
        date: '2023-12-31',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        fare: 50,
        availableSeats: 30,
        bookedSeats: ['1', '2'],
      });
  
      const result = await updatedTrip(trip_id, numberOfSeats, seatNumbers);
  
      expect(result).toEqual({
        _id: trip_id,
        busNumber: 'ABC123',
        origin: 'CityA',
        destination: 'CityB',
        date: '2023-12-31',
        departureTime: '12:00 PM',
        arrivalTime: '3:00 PM',
        fare: 50,
        availableSeats: 30,
        bookedSeats: ['1', '2'],
      });
    });
  });
  
  describe('getTickets', () => {
    it('should get tickets for a user successfully', async () => {
      const userId = 'user123';
  
      Ticket.find = jest.fn().mockResolvedValue([
        {
          _id: 'ticket123',
          user_id: userId,
          trip_id: 'trip123',
          busNumber: 'ABC123',
          bookingDate: '2023-12-01',
          passengers: ['Passenger 1', 'Passenger 2'],
          numberOfSeats: 2,
          date: '2023-12-31',
          origin: 'CityA',
          destination: 'CityB',
          departureTime: '12:00 PM',
          arrivalTime: '3:00 PM',
          totalPrice: 100,
        },
        {
          _id: 'ticket456',
          user_id: userId,
          trip_id: 'trip456',
          busNumber: 'XYZ789',
          bookingDate: '2023-12-02',
          passengers: ['Passenger 3', 'Passenger 4'],
          numberOfSeats: 2,
          date: '2023-12-31',
          origin: 'CityC',
          destination: 'CityD',
          departureTime: '2:00 PM',
          arrivalTime: '5:00 PM',
          totalPrice: 120,
        },
      ]);
  
      const result = await getTickets(userId);
  
      expect(result).toEqual([
        {
          _id: 'ticket123',
          user_id: userId,
          trip_id: 'trip123',
          busNumber: 'ABC123',
          bookingDate: '2023-12-01',
          passengers: ['Passenger 1', 'Passenger 2'],
          numberOfSeats: 2,
          date: '2023-12-31',
          origin: 'CityA',
          destination: 'CityB',
          departureTime: '12:00 PM',
          arrivalTime: '3:00 PM',
          totalPrice: 100,
        },
        {
          _id: 'ticket456',
          user_id: userId,
          trip_id: 'trip456',
          busNumber: 'XYZ789',
          bookingDate: '2023-12-02',
          passengers: ['Passenger 3', 'Passenger 4'],
          numberOfSeats: 2,
          date: '2023-12-31',
          origin: 'CityC',
          destination: 'CityD',
          departureTime: '2:00 PM',
          arrivalTime: '5:00 PM',
          totalPrice: 120,
        },
      ]);
    });
  });
  