import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Order {
  id: string;
  items: any[];
  totalAmount: number;
  date: string;
  status: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;

