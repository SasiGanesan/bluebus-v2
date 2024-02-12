// busService.test.js

import Bus from '../../model/busModel.js';
import busService from '../../service/busService.js'; 

jest.mock('../../model/busModel.js');

describe('Bus Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('BusCreation', () => {
    it('should create a new bus', async () => {
      const mockBus = { user_id: 'user123', busNumber: 'BUS001', busSeats: 50, isSleeper: true };
      Bus.create.mockResolvedValue(mockBus);

      const result = await busService.BusCreation('user123', 'BUS001', 50, true);

      expect(Bus.create).toHaveBeenCalledWith({
        user_id: 'user123',
        busNumber: 'BUS001',
        busSeats: 50,
        isSleeper: true,
      });

      expect(result).toEqual(mockBus);
    });
  });

  describe('existsBus', () => {
    it('should return an existing bus', async () => {
      const mockExistingBus = { user_id: 'user123', busNumber: 'BUS001', busSeats: 50, isSleeper: true };
      Bus.findOne.mockResolvedValue(mockExistingBus);

      const result = await busService.existsBus('BUS001');

      expect(Bus.findOne).toHaveBeenCalledWith('BUS001');
      expect(result).toEqual(mockExistingBus);
    });

    // it('should return null if bus does not exist', async () => {
    //   Bus.findOne.mockResolvedValue(null);

    //   const result = await busService.existsBus('NON_EXISTING_BUS');

    //   expect(Bus.findOne).toHaveBeenCalledWith('NON_EXISTING_BUS');
    //   expect(result).toBeNull();
    // });
  });
});
