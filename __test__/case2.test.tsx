import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import bookSlice, { addBooking, removeBooking } from '@/redux/features/bookSlice'

const initialState = { bookItems: [] }
const testBookingData1 = {
  id: "2661876316064",
  userId: "65e1ad6d5e4e7cc6a532d53e",
  userName: "prim",
  massage: "Maurice Beatty",
  reserveDate: "2024/05/21"
};

const testBookingData2 = {
  id: "1528420999915",
  userId: "65e1b3d25e4e7cc6a532d544",
  userName: "esther",
  massage: "Lydia Gulgowski",
  reserveDate: "2024/06/18"
};

const testBookingData3 = {
  id: "2661876316064",
  userId: "65e1ad6d5e4e7cc6a532d53e",
  userName: "prim",
  massage: "Carl Altenwerth",
  reserveDate: "2024/08/30"
};

describe('bookSlice', () => {
  
  it('bookSlice reducer works correctly', () => {
    const afterAddReducer1 = bookSlice(initialState, addBooking(testBookingData1))
    expect(afterAddReducer1.bookItems.length).toBe(1)
    const afterAddReducer2 = bookSlice(afterAddReducer1, addBooking(testBookingData2))
    expect(afterAddReducer2.bookItems.length).toBe(2)
    const afterAddReducer3 = bookSlice(afterAddReducer2, addBooking(testBookingData3))
    expect(afterAddReducer3.bookItems.length).toBe(2)

    const afterRemoveReducer = bookSlice(afterAddReducer3, removeBooking("2661876316064"))
    expect(afterRemoveReducer.bookItems.length).toBe(1)
    expect(afterRemoveReducer.bookItems[0].id).toBe("1528420999915")
    expect(afterRemoveReducer.bookItems[0].userName).toBe("prim")
  })

})
