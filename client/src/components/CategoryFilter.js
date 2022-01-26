import React, { useEffect, useState } from 'react';
import { filter, FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

function CategoryFilter({clothes, setCategories}) {

    const cats = clothes.map(article => article.category);
    const catOptions = ['All', ...new Set(cats)].map(cat => ({value: cat, label: cat}))

    const updateCats = (val) => {
        if(val.value === 'All') {
            setCategories(null);
        } else {
            setCategories(val.value);
        }
    }

    return (
        <>
        <FormControl mt={4} mb={6}>
                <FormLabel>Select a Category to Filter</FormLabel>
                <Select 
                    defaultValue={catOptions[0]}
                    colorScheme='pink'
                    focusBorderColor='pink.500'
                    options={catOptions}
                    onChange={updateCats}
                    chakraStyles={{
                        control: (provided) => ({
                            ...provided,
                            borderRadius: 'none'
                        }),
                        multiValue: (provided) => ({
                            ...provided,
                            borderRadius: 'none',
                        }),
                        option: (provided) => ({
                            ...provided,
                            _hover: {
                                bg: 'pink.100'
                            }
                        })
                    }}
                     />
            </FormControl>
        </>
    )
}

export default CategoryFilter;