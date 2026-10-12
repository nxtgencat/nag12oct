import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServiceRequest } from '../types/index.ts';

interface RequestsState {
  items: ServiceRequest[];
}

const stored: ServiceRequest[] = (() => {
  try {
    const raw = localStorage.getItem('stackly-requests');
    return raw ? (JSON.parse(raw) as ServiceRequest[]) : [];
  } catch {
    return [];
  }
})();

const requestsSlice = createSlice({
  name: 'requests',
  initialState: { items: stored } as RequestsState,
  reducers: {
    addRequest: (state, action: PayloadAction<ServiceRequest>) => {
      state.items.unshift(action.payload);
    },
    updateRequest: (state, action: PayloadAction<ServiceRequest>) => {
      const i = state.items.findIndex((r) => r.id === action.payload.id);
      if (i >= 0) state.items[i] = action.payload;
    },
    deleteRequest: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((r) => r.id !== action.payload);
    },
    setStatus: (
      state,
      action: PayloadAction<{ id: string; status: ServiceRequest['status'] }>,
    ) => {
      const found = state.items.find((r) => r.id === action.payload.id);
      if (found) found.status = action.payload.status;
    },
    seedRequests: (state, action: PayloadAction<ServiceRequest[]>) => {
      if (state.items.length === 0) state.items = action.payload;
    },
  },
});

interface SavedState {
  savedIds: number[];
}

const savedSlice = createSlice({
  name: 'saved',
  initialState: { savedIds: [] } as SavedState,
  reducers: {
    toggleSaved: (state, action: PayloadAction<number>) => {
      const i = state.savedIds.indexOf(action.payload);
      if (i >= 0) state.savedIds.splice(i, 1);
      else state.savedIds.push(action.payload);
    },
  },
});

export const { addRequest, updateRequest, deleteRequest, setStatus, seedRequests } =
  requestsSlice.actions;
export const { toggleSaved } = savedSlice.actions;

export const store = configureStore({
  reducer: {
    requests: requestsSlice.reducer,
    saved: savedSlice.reducer,
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem('stackly-requests', JSON.stringify(store.getState().requests.items));
    localStorage.setItem('stackly-saved', JSON.stringify(store.getState().saved.savedIds));
  } catch {
    // ignore
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
