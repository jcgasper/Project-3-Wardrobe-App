import React, { useContext, createContext, useState } from 'react';

const ClothingContext = createContext();

export const useClothingContext = () => useContext(ClothingContext);

export const ClothingProvider = ({children}) => {

    const [userClothing, setUserClothing] = useState([]);

    const addClothing = (clothing) => {

        setUserClothing(clothing);
        //set up array of each category
        const categories = [
            {
                type: 'tops',
                items: []
            },
            {
                type: 'bottoms',
                items: []
            },
            {
                type: 'outerwear',
                items: []
            },
            {
                type: 'accessories',
                items: []
            },
            {
                type: 'footwear',
                items: []
            },
        ]

        //iterate through and assign each article to a category
        clothing.forEach(item => {
            switch(item.category.toLowerCase()) {
                case 'top':
                    categories[0].items.push(item);
                    break;
                case 'bottom':
                    categories[1].items.push(item);
                    break;
                case 'outerwear':
                    categories[2].items.push(item);
                    break;
                case 'accessory':
                    categories[3].items.push(item);
                    break;
                case 'footwear':
                    categories[4].items.push(item);
                    break;
                default:
                    return;
            }
        });
        //set state of all clothes broken down by category
        setUserClothing(categories);
    }

    return (
        <ClothingContext.Provider value={{userClothing, addClothing}}>
            {children}
        </ClothingContext.Provider>
    );
};