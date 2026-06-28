import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoriteState {
  stallIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      stallIds: [],
      isFavorite: (id: string) => get().stallIds.includes(id),
      toggleFavorite: (id: string) =>
        set((state) => ({
          stallIds: state.stallIds.includes(id)
            ? state.stallIds.filter((sid) => sid !== id)
            : [...state.stallIds, id],
        })),
      addFavorite: (id: string) =>
        set((state) => ({
          stallIds: state.stallIds.includes(id)
            ? state.stallIds
            : [...state.stallIds, id],
        })),
      removeFavorite: (id: string) =>
        set((state) => ({
          stallIds: state.stallIds.filter((sid) => sid !== id),
        })),
    }),
    {
      name: "market-favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
