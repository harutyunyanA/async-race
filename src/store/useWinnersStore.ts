import { create } from "zustand";
import type { Winner, WinnersState } from "../types/winners";
import { createWinnerApi, deleteWinnerApi, getWinnersApi } from "../api/winners.ts";

export const useWinnerStore = create<WinnersState>((set, get) => ({
  winners: [],
  totalCount: 0,
  page: 1,
  sortBy: "time",
  order: "DESC",

  setWinners: (winners) => set({ winners }),
  setTotalCount: (count) => set({ totalCount: count }),
  setPage: (page) => {
    set({ page });
    get().getWinners();
  },
  setSortBy: (sortBy) => {
    set({ sortBy });
    get().getWinners();
  },
  setOrder: (order) => {
    set({ order });
    get().getWinners();
  },
  setSorting: (sortBy, order) => {
    set({ sortBy, order });
    get().getWinners();
  },

  createWinner: async (winner: Winner) => {
    const data = await createWinnerApi(winner);
    set((s) => ({ winners: [...s.winners, data] }));
    return data;
  },

  getWinners: async () => {
    const { page, sortBy, order } = get();
    const { items, totalCount } = await getWinnersApi(page, sortBy, order);
    set({ winners: items, totalCount });
  },

  deleteWinner: async (id: number) => {
    await deleteWinnerApi(id);
    set((s) => ({ winners: s.winners.filter((w) => w.id !== id) }));
  },
}));
