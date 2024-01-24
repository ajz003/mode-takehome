import { create } from "zustand";

interface TimeState {
    data: string;
    setData: (data: string) => void;
}

export const useTimeStore = create<TimeState>()((set) => ({
    data: "",
    setData: (data: string) => set(() => ({ data })),
}));
