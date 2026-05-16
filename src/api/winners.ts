import type { Order, SortBy, Winner } from "../types/winners";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createWinnerApi = async (winner: Winner): Promise<Winner> => {
  const res = await fetch(`${BASE_URL}/winners`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(winner),
  });

  if (res.status !== 201) {
    throw new Error("Unable to create new winner");
  }

  return res.json() as Promise<Winner>;
};

export const getWinnersApi = async (
  page: number,
  sortBy: SortBy,
  order: Order,
): Promise<{ items: Winner[]; totalCount: number }> => {
  const query = `_page=${page}&_limit=10&_sort=${sortBy}&_order=${order}`;
  const res = await fetch(`${BASE_URL}/winners?${query}`);

  if (res.status !== 200) {
    throw new Error("Unable to get winners");
  }

  const items = (await res.json()) as Winner[];
  const totalCount = Number(res.headers.get("X-Total-Count")) || 0;

  return { items, totalCount };
};

export const getWinnerByIdApi = async (id: number): Promise<Winner> => {
  const res = await fetch(`${BASE_URL}/winners/${id}`);

  if (res.status !== 200) {
    throw new Error("Unable to get winner");
  }

  return res.json() as Promise<Winner>;
};

export const updateWinnerApi = async (winner: Winner): Promise<Winner> => {
  const res = await fetch(`${BASE_URL}/winners/${winner.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(winner),
  });

  if (res.status !== 200) {
    throw new Error("Unable to update winner");
  }

  return res.json() as Promise<Winner>;
};

export const deleteWinnerApi = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/winners/${id}`, {
    method: "DELETE",
  });

  if (res.status !== 200) {
    throw new Error("Unable to delete winner");
  }
};
