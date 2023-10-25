import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
}

const initialState = {
	isAuthenticated: false,
	isLoading: true,
} as AuthState;

const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuthenticated = true;
		},
		logout: state => {
			state.isAuthenticated = false;
		},
		finishInitialLoad: state => {
			state.isLoading = false;
		}, 
	},
});

export const { setAuth, logout, finishInitialLoad } = roomSlice.actions;
export default roomSlice.reducer;
