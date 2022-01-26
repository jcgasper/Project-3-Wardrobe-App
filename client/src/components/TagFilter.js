import React, { useEffect, useState } from 'react';
import { filter, FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';


function TagFilter({clothes, availableTags, setAvailableTags, setTags, tags}) {

    const [tagList, setTagList] = useState(availableTags);

    const updateTags = (val) => {
        setTags(val.map(tag => tag.value));
        setTagList(val.map(tag => tag.value));
    }

    //determine what options should be present in dropdown based on what tags have already been selected
    const getNewTags = (list) => {

        let newTags = [];

        if(list.length > 0) {
            let availableClothes = clothes.filter(article => tags.every(tag => article.tags.includes(tag)));
            
            availableClothes.forEach(article => {
                newTags = [...newTags, ...article.tags];
            });
            newTags = [...new Set(newTags)].sort().map(tag => ({value: tag, label: tag}));
        } else {
            clothes.forEach(article =>  {
                newTags = [...newTags, ...article.tags];
            });
            newTags = [...new Set(newTags)].sort().map(tag => ({value: tag, label: tag}));
        }

        return newTags;
    }

    useEffect(() => {
        setAvailableTags(getNewTags(tagList));
    }, [tagList])

    

    return (
        <>
            <FormControl>
                <FormLabel>Select Tags to Filter</FormLabel>
                <Select 
                    colorScheme='pink'
                    focusBorderColor='pink.500'
                    isMulti
                    options={availableTags}
                    onChange={updateTags} />
            </FormControl>
            
        </>
        
    )
}

export default TagFilter;