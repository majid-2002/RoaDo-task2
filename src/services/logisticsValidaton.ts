enum LocationType {
  Pickup = "pickup",
  Dropoff = "dropoff",
  Warehouse = "warehouse",
}

interface LocationDetails {
  id: string;
  name?: string;
  address?: string;
  type: LocationType;
}

interface Trip {
  id: string;
  pickups?: LocationDetails[];
  dropoffs?: LocationDetails[];
  warehouse?: LocationDetails;
}

interface Shipment {
  id: string;
  pickups: LocationDetails[];
  dropoffs: LocationDetails[];
}

/**
 * Validates if a given set of trips fulfills the requirements of a shipment.
 * @param shipment The shipment to be validated.
 * @param trips The list of trips to be validated.
 * @returns A boolean indicating if the set of trips is valid for the shipment.
 */

function validateTripSet(shipment: Shipment, trips: Trip[]): boolean {
  const remainingPickups = new Set(shipment.pickups.map((p) => p.id));
  const remainingDropoffs = new Set(shipment.dropoffs.map((d) => d.id));

  let usedWarehouseId: string | null = null;

  for (const trip of trips) {
    if (trip.pickups) {
      for (const pickup of trip.pickups) {
        // If the pickup is not in the remaining pickups, return false
        if (!remainingPickups.has(pickup.id)) {
          return false;
        }
        remainingPickups.delete(pickup.id);
      }
    }

    if (trip.warehouse) {
      if (!remainingPickups.size && !remainingDropoffs.size) {
        return false;
      }
      if (usedWarehouseId === null) {
        usedWarehouseId = trip.warehouse.id;
      } else if (trip.warehouse.id !== usedWarehouseId) {
        return false;
      }
    }

    if (trip.dropoffs) {
      for (const dropoff of trip.dropoffs) {
        if (!remainingDropoffs.has(dropoff.id)) {
          return false;
        }
        remainingDropoffs.delete(dropoff.id);
      }
    }
  }

  return !remainingPickups.size && !remainingDropoffs.size;
}

export { validateTripSet, Shipment, Trip, LocationType };
