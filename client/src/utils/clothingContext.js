import React, { useContext, createContext } from 'react';

const ClothingContext = createContext();

export const useClothingContext = useContext(ClothingContext);

export function ClothingProvider({children}) {
    
}