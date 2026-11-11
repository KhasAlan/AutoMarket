
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { cars } from '@/data/mock/cars';

type Car = (typeof cars)[number];

type CompareResult = 'added' | 'removed' | 'limit';

type FavoritesContextType = {
  favoriteCars: Car[];
  selectedCars: Car[];
  isFavorite: (id: string) => boolean;
  isSelectedForCompare: (id: string) => boolean;
  toggleFavorite: (car: Car) => boolean;
  toggleCompare: (car: Car) => CompareResult;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
 const [favoriteIds, setFavoriteIds] = useState<string[]>([
  '51',
  '52',
  '53',
  '54',
]);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const isSelectedForCompare = (id: string) =>
    compareIds.includes(id);

  const toggleFavorite = (car: Car) => {
    const alreadyFavorite = favoriteIds.includes(car.id);

    setFavoriteIds((current) =>
      alreadyFavorite
        ? current.filter((id) => id !== car.id)
        : [...current, car.id]
    );

    if (alreadyFavorite) {
      setCompareIds((current) =>
        current.filter((id) => id !== car.id)
      );
    }

    return !alreadyFavorite;
  };

  const toggleCompare = (car: Car): CompareResult => {
    const alreadySelected = compareIds.includes(car.id);

    if (alreadySelected) {
      setCompareIds((current) =>
        current.filter((id) => id !== car.id)
      );
      return 'removed';
    }

    if (compareIds.length >= 3) {
      return 'limit';
    }

    setCompareIds((current) => [...current, car.id]);
    return 'added';
  };

  const clearFavorites = () => {
    setFavoriteIds([]);
    setCompareIds([]);
  };

  const favoriteCars = cars.filter((car) =>
    favoriteIds.includes(car.id)
  );

  const selectedCars = cars.filter((car) =>
    compareIds.includes(car.id)
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoriteCars,
        selectedCars,
        isFavorite,
        isSelectedForCompare,
        toggleFavorite,
        toggleCompare,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites must be used inside FavoritesProvider'
    );
  }

  return context;
}
