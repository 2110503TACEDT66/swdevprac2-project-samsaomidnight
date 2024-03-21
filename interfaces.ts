export interface BookingItem {
    bookDate: string
    id: string
    massage: string
}

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
  
  export interface MassageShop {
    name: string;
    address: string;
    tel?: string; // Optional since it's not marked as required
    open_close_times: OpenCloseTime[];
  }
  
  
  export interface BookingItem {
    id: string;
    userId: string;
    shopId: string;
    date: string;
  }
  
  export interface BookState {
    bookItems: BookingItem[];
    massageShops: MassageShop[];
    maxReservationsPerUser: number;
  }
  