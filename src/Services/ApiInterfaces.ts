export interface Reservation {
  id: number;
  customerId: number;
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    fullName: string;
  };
  sittingId: number;
  sitting: {
    id: number;
    capacity: number;
    type: string;
    startTime: string;
    endTime: string;
    venueId: number;
  };
  dateTime: string;
  duration: number;
  noGuests: number;
  source: number;
  venueId: number;
  tables: [];
  status: number;
  notes: string;
}

export interface Area {
  id: number;
  name: string;
  description: string;
  venueId: number;
  tables: [
    {
      id: number;
      type: string;
      capacity: number;
      areaId: number;
    }
  ];
  sittings: [
    {
      id: number;
      capacity: number;
      type: string;
      startTime: string;
      endTime: string;
      venueId: number;
      areas: [string];
      reservations: [
        {
          id: number;
          customerId: number;
          customer: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            reservations: [string];
            fullName: string;
          };
          sittingId: number;
          sitting: string;
          dateTime: string;
          duration: number;
          noGuests: number;
          source: number;
          status: number;
          notes: string;
        }
      ];
    }
  ];
}

export interface Sitting {
  id: number;
  capacity: number;
  type: string;
  startTime: string;
  endTime: string;
  venueId: number;
  areas: [
    {
      id: number;
      name: string;
      description: string;
      venueId: number;
      tables: [
        {
          id: number;
          type: string;
          capacity: number;
          areaId: number;
        }
      ];
      sittings: [string];
    }
  ];
  reservations: [
    {
      id: number;
      customerId: number;
      customer: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        reservations: [string];
        fullName: string;
      };
      sittingId: number;
      sitting: string;
      dateTime: string;
      duration: number;
      noGuests: number;
      source: number;
      status: number;
      notes: string;
    }
  ];
}
