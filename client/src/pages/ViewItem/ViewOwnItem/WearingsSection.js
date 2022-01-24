import { useMutation } from '@apollo/client';
import { Text, Button, HStack, Input, Table, Td, Th, Thead, Tr, Center, Tbody } from '@chakra-ui/react';
import React, { useState } from 'react'
import { dateToDateString } from '../../../utils/dates';
import { ADD_WEARING } from '../../../utils/mutations';
import { GET_ARTICLE } from '../../../utils/queries';

const WearingsSection = ({ articleId, wearings }) => {
  const [addWearing, { loading }] = useMutation(ADD_WEARING, { refetchQueries: [GET_ARTICLE] });
  const [wearDate, setWearDate] = useState(dateToDateString(new Date(Date.now())));


  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !wearDate ||
      (wearings.length && wearings.includes(wearDate))
    ) {
      return;
    }

    addWearing({ variables: { articleId, wearDate } });
  }

  return (
    <>
      <Center>
        <HStack as="form" onSubmit={handleSubmit}>
          <Button
            type="submit"
            colorScheme='pink'
            borderRadius={0}
            flexGrow={0}
            flexShrink={0}
            isLoading={loading}
            isDisabled={(wearings?.length && wearings.includes(wearDate))}
          >Add Wearing</Button>
          <Text>on</Text>
          <Input
            id="wear-date"
            name="wear-date"
            type="date"
            borderRadius={0}
            focusBorderColor='pink.400'
            borderColor='pink.700'
            value={wearDate}
            flexGrow={0}
            flexShrink={0}
            maxWidth='11em'
            onChange={(e) => setWearDate(e.target.value)}
          />
        </HStack>
      </Center>
      {wearings?.length ?
        <Table variant='striped' colorScheme='pink'>
          <Thead><Tr>
            <Th>Past Wearings</Th>
            <Th>Total Wearings: {wearings.length}</Th>
          </Tr></Thead>
          <Tbody>
            {
              wearings.map(wearing => (
                <Tr key={wearing}><Td colSpan='2'>{new Date(wearing).toLocaleDateString('en-US', { timeZone: 'UTC' })}</Td></Tr>
              ))
            }
          </Tbody>
        </Table>
        : ''
      }
    </>
  )
}

export default WearingsSection;