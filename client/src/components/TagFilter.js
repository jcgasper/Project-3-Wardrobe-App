import React from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';


function TagFilter({availableTags, setAvailableTags, setTags, tags}) {

    const updateTags = (val) => {
        setTags(val.map(tag => tag.value));
    }

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