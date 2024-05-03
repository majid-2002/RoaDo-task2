var LocationType;
(function (LocationType) {
    LocationType["Pickup"] = "pickup";
    LocationType["Dropoff"] = "dropoff";
    LocationType["Warehouse"] = "warehouse";
})(LocationType || (LocationType = {}));
var shipment = {
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
var trips = [
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
var invalidTrips = [
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
function validateTripSet(shipment, trips) {
    var remainingPickups = new Set(shipment.pickups.map(function (p) { return p.id; }));
    var remainingDropoffs = new Set(shipment.dropoffs.map(function (d) { return d.id; }));
    var usedWarehouseId = null;
    for (var _i = 0, trips_1 = trips; _i < trips_1.length; _i++) {
        var trip = trips_1[_i];
        if (trip.pickups) {
            for (var _a = 0, _b = trip.pickups; _a < _b.length; _a++) {
                var pickup = _b[_a];
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
            }
            else if (trip.warehouse.id !== usedWarehouseId) {
                return false;
            }
        }
        if (trip.dropoffs) {
            for (var _c = 0, _d = trip.dropoffs; _c < _d.length; _c++) {
                var dropoff = _d[_c];
                if (!remainingDropoffs.has(dropoff.id)) {
                    return false;
                }
                remainingDropoffs.delete(dropoff.id);
            }
        }
    }
    return !remainingPickups.size && !remainingDropoffs.size;
}
console.log(validateTripSet(shipment, trips));
