import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const DateAcquiredControl = ({ formState, setFormState }) => {
  return (
    <FormControl>
      <FormLabel htmlFor="date-" fontSize='lg' fontWeight='bold' textColor='pink.700'>Date Acquired (This won't be visible to other users.)</FormLabel>
      <Input
        id="date-acquired"
        name="date-acquired"
        type="date"
        borderRadius={0}
        focusBorderColor='pink.400'
        borderColor='pink.700'
        value={formState.dateAcquired}
        onChange={(e) => setFormState({ ...formState, dateAcquired: e.target.value })}
        maxLength="50"
      />
    </FormControl>
  );
}

export default DateAcquiredControl;