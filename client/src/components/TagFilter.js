import React from 'react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { CheckIcon } from '@chakra-ui/icons';



function TagFilter({availableTags, setTags, tags}) {


    const [pickerItems, setPickerItems] = React.useState(availableTags);
    const [selectedItems, setSelectedItems] = React.useState([]);

    const changeAvailableTags = (itemsArray) => {
        
    }

    const handleCreateItem = (item) => {
        setPickerItems((curr) => [...curr, item]);
        setSelectedItems((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (selectedItems) => {
        if (selectedItems) {
        setSelectedItems(selectedItems);
        changeAvailableTags(selectedItems);
        setTags(selectedItems);
        }
    };

    return (
        <>
            <CUIAutoComplete
            label="Filter by Tags"
            placeholder="start typing a tag..."
            onCreateItem={handleCreateItem}
            items={pickerItems}
            tagStyleProps={{
                rounded: "none",
                pt: 1,
                pb: 2,
                px: 2,
                fontSize: "1rem",
                colorScheme: 'pink'
            }}
            icon={CheckIcon}
            selectedIconProps={{textColor: 'pink.500'}}
            selectedItems={selectedItems}
            onSelectedItemsChange={(changes) =>
                handleSelectedItemsChange(changes.selectedItems)
            }
            toggleButtonStyleProps={{colorScheme: 'pink'}}
            />
        </>
        
    )
}

export default TagFilter;