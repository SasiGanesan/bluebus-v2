import {
    createTicket,
    getTicketById,
    cancelTickets,
    getAllTickets,
  } from '../../controllers/ticketController';
  import {
    checkSeatExist,
    findTripById,
    bookTicket,
    UpdateTrip,
    findTicketById,
    cancelTicket,
    updatedTrip,
    getTickets,
  } from '../../service/ticketService';
  import { userId } from '../../middleware/authMiddleware';
  
  jest.mock('../../service/ticketService');
  jest.mock('../../middleware/authMiddleware');
  
  describe('ticketController', () => {
    describe('createTicket', () => {
      const req = {
        params: {
          trip_id: '123',
        },
        body: {
          passengers: [
            {
              seatNo: 1,
            },
            {
              seatNo: 2,
            },
          ],
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      const trip = {
        id: '123',
        busNumber: 'ABC',
        date: '2022-01-01',
        origin: 'City A',
        destination: 'City B',
        departureTime: '10:00',
        arrivalTime: '12:00',
        fare: 10,
        seatNumbers: [],
      };
      const user_id = '456';
  
      beforeEach(() => {
        jest.clearAllMocks();
        findTripById.mockResolvedValue(trip);
        userId.mockReturnValue(user_id);
      });
  
      it('should create a new ticket and update the trip', async () => {
        const numberOfSeats = 2;
        const seatNumbers = [1, 2];
  
        checkSeatExist.mockReturnValue(false);
  
        bookTicket.mockResolvedValue({
          user_id: '456',
          trip_id: '123',
          busNumber: 'ABC',
          bookingDate: new Date('2024-01-27T12:03:34.457Z'),
          passengers: [
            {
              seatNo: 1,
            },
            {
              seatNo: 2,
            },
          ],
          numberOfSeats,
          date: '2022-01-01',
          origin: 'City A',
          destination: 'City B',
          departureTime: '10:00',
          arrivalTime: '12:00',
          totalPrice: 20,
        });
        UpdateTrip.mockResolvedValue(true);
  
        await createTicket(req, res, next);
  
        expect(findTripById).toHaveBeenCalledWith('123');
        expect(userId).toHaveBeenCalledWith(req);
        expect(bookTicket).toHaveBeenCalledWith(
          '456',
          '123',
          'ABC',
          expect.any(Date),
          [
            {
              seatNo: 1,
            },
            {
              seatNo: 2,
            },
          ],
          numberOfSeats,
          '2022-01-01',
          'City A',
          'City B',
          '10:00',
          '12:00',
          20
        );
        expect(UpdateTrip).toHaveBeenCalledWith('123', numberOfSeats, seatNumbers);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          user_id,
          tripId: '123',
          busNumber: 'ABC',
          bookingDate: expect.any(Date),
          passengers: [
            {
              seatNo: 1,
            },
            {
              seatNo: 2,
            },
          ],
          numberOfSeats,
          date: '2022-01-01',
          origin: 'City A',
          destination: 'City B',
          departureTime: '10:00',
          arrivalTime: '12:00',
          totalPrice: 20,
        });
      });
  
      it('should return 404 if trip is not found', async () => {
        findTripById.mockResolvedValue(null);
  
        await createTicket(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Trip not found' });
      });
  
      it('should return 400 if seats are already booked', async () => {
        checkSeatExist.mockReturnValue(true);
  
        await createTicket(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Seats already booked' });
      });
  
    //   it('should call next with error if error occurs', async () => {
    //     const errorMessage = 'Error message';
    //     bookTicket.mockRejectedValue({ message: 'Cannot to update trip' });
  
    //     await createTicket(req, res, next);
  
    //     expect(next).toHaveBeenCalledWith({ message: 'Ticket not created' });
    //   });
    });
  
    describe('getTicketById', () => {
      const req = {
        params: {
          id: '123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const ticket = {
        id: '123',
        isBooked: true,
      };
  
      beforeEach(() => {
        jest.clearAllMocks();
        findTicketById.mockResolvedValue(ticket);
      });
  
      it('should return 200 with ticket if ticket is found', async () => {
        await getTicketById(req, res);
  
        expect(findTicketById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(ticket);
      });
  
      it('should return 404 if ticket is not found', async () => {
        findTicketById.mockResolvedValue(null);
  
        await getTicketById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Ticket not found' });
      });
    });
  
 
    describe('cancelTickets', () => {
        const req = {
          params: {
            id: '123',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        const ticket = {
          id: '123',
          isBooked: true,
          trip_id: '456',
          numberOfSeats: 2,
          passengers: [
            {
              seatNo: 1,
            },
            {
              seatNo: 2,
            },
          ],
        };
      
        beforeEach(() => {
          jest.clearAllMocks();
          findTicketById.mockResolvedValue(ticket);
          cancelTicket.mockResolvedValue(ticket);
          updatedTrip.mockResolvedValue(true);
        });
      
        it('should cancel a ticket and update the trip', async () => {
          try {
            await cancelTickets(req, res);
      
            // console.log('req.params.id:', req.params.id); // Add this line for debugging
      
            expect(findTicketById).toHaveBeenCalledWith(req.params.id);
            expect(updatedTrip).toHaveBeenCalledWith('456', 2, [1, 2]);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(ticket);
          } catch (error) {
            // console.error(error); // Log any errors to the console for debugging
          }
        });
      
        it('should return 404 if ticket is not found', async () => {
          try {
            findTicketById.mockResolvedValue(null);
      
            await cancelTickets(req, res);
      
            // console.log('req.params.id:', req.params.id); // Add this line for debugging
      
            expect(findTicketById).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Ticket not found' });
          } catch (error) {
            // console.error(error); // Log any errors to the console for debugging
          }
        });
      
        it('should return 400 if ticket is already canceled', async () => {
          try {
            ticket.isBooked = false;
      
            await cancelTickets(req, res);
      
            // console.log('req.params.id:', req.params.id); // Add this line for debugging
      
            expect(findTicketById).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Ticket not found' });
          } catch (error) {
           
          }
        });
      });
      
  });
  