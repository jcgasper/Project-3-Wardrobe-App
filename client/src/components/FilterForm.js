import React from 'react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { CheckIcon } from '@chakra-ui/icons';



function FilterForm() {

    const countries = [
        { value: "ghana", label: "Ghana" },
        { value: "nigeria", label: "Nigeria" },
        { value: "kenya", label: "Kenya" },
        { value: "southAfrica", label: "South Africa" },
        { value: "unitedStates", label: "United States" },
        { value: "canada", label: "Canada" },
        { value: "germany", label: "Germany" }
      ];

    const [pickerItems, setPickerItems] = React.useState(countries);
    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleCreateItem = (item) => {
        setPickerItems((curr) => [...curr, item]);
        setSelectedItems((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (selectedItems) => {
        if (selectedItems) {
        setSelectedItems(selectedItems);
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
            />
        </>
        
    )
}

export default FilterForm;