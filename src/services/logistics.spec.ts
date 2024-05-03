import {
  validateTripSet,
  Shipment,
  Trip,
  LocationType,
} from "../services/logisticsValidaton";

describe("validateTripSet function", () => {
  const shipment: Shipment = {
    id: "shipment1",
    pickups: [
      { id: "A", type: LocationType.Pickup },
      { id: "B", type: LocationType.Pickup },
    ],
    dropoffs: [
      { id: "C", type: LocationType.Dropoff },
      { id: "D", type: LocationType.Dropoff },
    ],
  };

  const validTrips: Trip[] = [
    {
      id: "trip1",
      pickups: [{ id: "A", type: LocationType.Pickup }],
      warehouse: { id: "W", type: LocationType.Warehouse },
    },
    {
      id: "trip2",
      pickups: [{ id: "B", type: LocationType.Pickup }],
      warehouse: { id: "W", type: LocationType.Warehouse },
    },
    {
      id: "trip3",
      dropoffs: [{ id: "C", type: LocationType.Dropoff }],
      warehouse: { id: "W", type: LocationType.Warehouse },
    },
    {
      id: "trip4",
      dropoffs: [{ id: "D", type: LocationType.Dropoff }],
      warehouse: { id: "W", type: LocationType.Warehouse },
    },
  ];

  const invalidTrips: Trip[] = [
    {
      id: "trip1",
      pickups: [{ id: "A", type: LocationType.Pickup }],
      warehouse: { id: "W1", type: LocationType.Warehouse },
    },
    {
      id: "trip2",
      pickups: [{ id: "B", type: LocationType.Pickup }],
      warehouse: { id: "W2", type: LocationType.Warehouse },
    },
    {
      id: "trip3",
      dropoffs: [{ id: "C", type: LocationType.Dropoff }],
      warehouse: { id: "W3", type: LocationType.Warehouse },
    },
    {
      id: "trip4",
      dropoffs: [{ id: "D", type: LocationType.Dropoff }],
      warehouse: { id: "W4", type: LocationType.Warehouse },
    },
  ];

  test("valid trips should return true", () => {
    expect(validateTripSet(shipment, validTrips)).toBe(true);
  });

  test("invalid trips should return false", () => {
    expect(validateTripSet(shipment, invalidTrips)).toBe(false);
  });
});
