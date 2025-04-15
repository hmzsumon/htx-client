import { createSlice } from '@reduxjs/toolkit';

interface TradeState {
	symbol: string;
	isTradeDrawerOpen: boolean;
	currentRound: any | null;
	predict?: string;
	tradeDuration: string;
	tradeLoading?: boolean;
}

const initialState: TradeState = {
	symbol: 'BTCUSDT',
	isTradeDrawerOpen: false,
	currentRound: null,
	predict: undefined,
	tradeDuration: '3m',
	tradeLoading: true,
};

export const tradeSlice = createSlice({
	name: 'trade',
	initialState,
	reducers: {
		setSymbol: (state, action) => {
			state.symbol = action.payload;
		},
		setTradeDrawerOpen: (state, action) => {
			state.isTradeDrawerOpen = action.payload;
		},

		setCurrentRound: (state, action) => {
			state.currentRound = action.payload;
		},

		setPredict: (state, action) => {
			state.predict = action.payload;
		},
		setTradeDuration: (state, action) => {
			state.tradeDuration = action.payload;
		},

		setTradeLoading: (state, action) => {
			state.tradeLoading = action.payload;
		},
	},
});

export const {
	setSymbol,
	setTradeDrawerOpen,
	setCurrentRound,
	setPredict,
	setTradeDuration,
	setTradeLoading,
} = tradeSlice.actions;
export default tradeSlice.reducer;
