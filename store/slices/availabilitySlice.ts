import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AvailabilityState {
    startTime: string | null;
	endTime: string | null;
    days: string[] | null;
}

const initialState: AvailabilityState = {
    startTime: null,
    endTime: null,
    days: null
}

export const AvailabilitySlice = createSlice({
	name: 'availability',
	initialState,
	reducers: {
		setAvailability: (state, action: PayloadAction<AvailabilityState>) => {
            state.startTime = action.payload.startTime;
            state.endTime = action.payload.endTime;
            state.days = action.payload.days;
		},
        setCleanAvailability: (state) => {
            state.startTime = null
            state.endTime = null
            state.days = null
        }
	}
})

// Action creators are generated for each case reducer function
export const { setAvailability, setCleanAvailability } = AvailabilitySlice.actions

export default AvailabilitySlice.reducer