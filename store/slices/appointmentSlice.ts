import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Key } from 'react';

interface AppointmentState {
	email: string;
	previsionId: number;
	specialty: Key;
	specialtyId: number;
	center: Key; 
	centerId: number;
	date: string;
	day: string;
	time: string;
	profesional: string;
	profesionalId: number;
	daysRemaining: number;
	numberAppointment: number;
	[key: string]: string | number | Key;
  }
  
  const initialState: AppointmentState = {
	email: '',
	previsionId: 0,
	specialty: '',
	specialtyId: 0,
	center: '',
	centerId: 0,
	date: '',
	day: '',
	time: '',
	profesional: '',
	profesionalId: 0,
	daysRemaining: 0,
	numberAppointment: 0,
  };

interface LocationAndSpecialtyPayload {
	specialty: Key;
	specialtyId: number;
	center: Key;
	centerId: number;
}

export const AppointmentSlice = createSlice({
	name: 'appointment',
	initialState,
	reducers: {
		setPrevisionAndEmail: (state, action: PayloadAction<{previsionId: number, email: string}>) => {
			state.previsionId = action.payload.previsionId;
			state.email = action.payload.email;
		},
		setLocationAndSpecialty: (state, action:PayloadAction<LocationAndSpecialtyPayload>) => {
			state.specialty = action.payload.specialty
			state.specialtyId = action.payload.specialtyId
			state.center = action.payload.center;
			state.centerId = action.payload.centerId;
		},
		setDate: (state, action:PayloadAction<{ date: string }>) => {
			state.date = action.payload.date;
		},
		setCalendarDay: ( state, action:PayloadAction<{day: string }>) => {
			state.day = action.payload.day;
		},
		setTimeAndProfesional: (state, action:PayloadAction<{nameId: number, time: string, profesional: string}>) => {
			state.time = action.payload.time;
			state.profesionalId = action.payload.nameId;
			state.profesional = action.payload.profesional;
		},
		setCleanData: (state) => {
			Object.keys(state).forEach((key) => {
				if (typeof state[key] === 'string') {
					state[key] = '';
				} else if (typeof state[key] === 'number') {
					state[key] = 0;
				} 
			})
		},
		setNumberAppointmnent: (state, action: PayloadAction<{ numberAppointment: number }>) => {
			state.numberAppointment = action.payload.numberAppointment;
		}
	}
})

// Action creators are generated for each case reducer function
export const { 
	setLocationAndSpecialty, 
	setPrevisionAndEmail,
	setDate, 
	setCalendarDay,
	setCleanData,
	setTimeAndProfesional,
	setNumberAppointmnent
} = AppointmentSlice.actions

export default AppointmentSlice.reducer