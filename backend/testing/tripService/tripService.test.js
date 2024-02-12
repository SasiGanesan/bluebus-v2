import Trip from "../../model/tripModel.js";
import { tripCreation, existsTrip, findTripById, tripSearching } from "../../service/tripService.js";

// Define mockedTrip and other necessary variables
const mockedTrip = {
  // Replace with the actual properties of your trip
  busNumber: "testBus",
  origin: "testOrigin",
  destination: "testDestination",
  date: "2022-02-15",
  departureTime: "10:00",
  arrivalTime: "12:00",
  fare: 100,
  availableSeats: 50,
};
// Mock the Trip model
jest.mock("../../model/tripModel");

describe("Trip Service Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("existsTrip", () => {
    test("should return trip if found", async () => {
      // Mock the findOne method of Trip
      Trip.findOne.mockResolvedValue(mockedTrip);

      const result = await existsTrip("testBus", "2022-02-15");

      expect(Trip.findOne).toHaveBeenCalledWith("testBus", "2022-02-15");
      expect(result).toEqual(mockedTrip);
    });

    test("should return null if trip does not exist", async () => {
      // Mock the findOne method of Trip to return null
      Trip.findOne.mockResolvedValue(null);

      const result = await existsTrip("nonexistentBus", "2022-02-15");

      expect(Trip.findOne).toHaveBeenCalledWith("nonexistentBus", "2022-02-15");
      expect(result).toBeNull();
    });
  });

  describe("tripCreation", () => {
    test("should create a new trip and return it", async () => {
      // Mock the create method of Trip
      Trip.create.mockResolvedValue({ /* mock created trip data */ });

      const result = await tripCreation("testBus", "testOrigin", "testDestination", "2022-02-15", "10:00", "12:00", 100, 50);

      expect(Trip.create).toHaveBeenCalledWith({
        busNumber: "testBus",
        origin: "testOrigin",
        destination: "testDestination",
        date: "2022-02-15",
        departureTime: "10:00",
        arrivalTime: "12:00",
        fare: 100,
        availableSeats: 50,
      });
      expect(result).toEqual({ /* mock created trip data */ });
    });
  });

  describe("findTripById", () => {
    test("should return trip if found by ID", async () => {
      // Mock the findById method of Trip
      Trip.findById.mockResolvedValue({ /* mock trip data by ID */ });

      const result = await findTripById("testTripId");

      expect(Trip.findById).toHaveBeenCalledWith("testTripId");
      expect(result).toEqual({ /* mock trip data by ID */ });
    });

    test("should return null if trip is not found by ID", async () => {
      // Mock the findById method of Trip to return null
      Trip.findById.mockResolvedValue(null);

      const result = await findTripById("nonexistentTripId");

      expect(Trip.findById).toHaveBeenCalledWith("nonexistentTripId");
      expect(result).toBeNull();
    });
  });

  describe("tripSearching", () => {
    test("should return trips matching search terms", async () => {
      // Mock the find method of Trip
      Trip.find.mockResolvedValue([{ /* mock trip data */ }]);

      const result = await tripSearching("mockedOrigin", "mockedDestination", "2022-02-15");

      expect(Trip.find).toHaveBeenCalledWith({
        origin: { $regex: "mockedOrigin", $options: "i" },
        destination: { $regex: "mockedDestination", $options: "i" },
        date: "2022-02-15",
      });
      expect(result).toEqual([{ /* mock trip data */ }]);
    });
  });
});
