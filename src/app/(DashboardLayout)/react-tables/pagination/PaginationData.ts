export interface PaginationDataType {
  Date?: string;
  "Starting point": string;
  "Ending point": string;
  status?: string;
  "Ride cost": number;
  Rating?: number;
}

export const basicsTableData: PaginationDataType[] = [
  {
    Date: new Date().toJSON(),
    "Starting point": "Sanand",
    "Ending point": "Thaltej - Metro station",
    status: "complete",
    "Ride cost": 500,
    Rating: 2,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Thaltej - Metro station",
    "Ending point": "Vastral - Metro station",
    status: "pending",
    "Ride cost": 900,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Thaltej - Metro station",
    "Ending point": "Gota",
    status: "cancel",
    "Ride cost": 900,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Sanand",
    "Ending point": "Thaltej - Metro station",
    status: "complete",
    "Ride cost": 500,
    Rating: 2,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Thaltej - Metro station",
    "Ending point": "Vastral - Metro station",
    status: "pending",
    "Ride cost": 900,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Thaltej - Metro station",
    "Ending point": "Gota",
    status: "cancel",
    "Ride cost": 900,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Sanand",
    "Ending point": "Thaltej - Metro station",
    status: "complete",
    "Ride cost": 500,
    Rating: 2,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Thaltej - Metro station",
    "Ending point": "Vastral - Metro station",
    status: "pending",
    "Ride cost": 900,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Thaltej - Metro station",
    "Ending point": "Gota",
    status: "cancel",
    "Ride cost": 900,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Sanand",
    "Ending point": "Thaltej - Metro station",
    status: "complete",
    "Ride cost": 500,
    Rating: 2,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Thaltej - Metro station",
    "Ending point": "Vastral - Metro station",
    status: "pending",
    "Ride cost": 900,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Thaltej - Metro station",
    "Ending point": "Gota",
    status: "cancel",
    "Ride cost": 900,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Sanand",
    "Ending point": "Thaltej - Metro station",
    status: "complete",
    "Ride cost": 500,
    Rating: 2,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Thaltej - Metro station",
    "Ending point": "Vastral - Metro station",
    status: "pending",
    "Ride cost": 900,
  },
  {
    Date: new Date().toJSON(),
    "Starting point": "Thaltej - Metro station",
    "Ending point": "Gota",
    status: "cancel",
    "Ride cost": 900,
  },
];
