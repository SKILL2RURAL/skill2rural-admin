import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface adminState {
  value: number
}

const initialState: adminState = {
  value: 0,
}



const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = adminSlice.actions
export default adminSlice.reducer