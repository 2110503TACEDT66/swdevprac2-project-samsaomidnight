// export interface BookingItem {
//     bookDate: string
//     id: string
//     massage: string
// }

// export interface ReservationItem {
//     carId: string
//     carModel: string
//     numOfDays: number
//     pickupDate: string
//     pickupLocation: string
//     returnDate: string
//     returnLocation: string
// }

export interface OpenCloseTime {
    day: string;
    open: string;
    close: string;
  }
  
  export interface MassageItem {
    _id: string;
    name: string;
    picture : string
    address: string;
    tel?: string; // Optional since it's not marked as required
    open_close_times: OpenCloseTime[];
  }
  
  
  export interface BookingItem {
    userName: string;
    massage: string;
    reserveDate: string; // reserve date
  }
  
  export interface BookState {
    bookItems: BookingItem[];
    massageShops: MassageItem[];
    maxReservationsPerUser: number;
  }
  
  export interface MassageJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: MassageItem[]
  }