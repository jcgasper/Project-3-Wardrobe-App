import React, { useState } from 'react';
import { VStack, StackDivider, Heading, Progress } from '@chakra-ui/react';
import ProfileCategory from '../components/ProfileCategory';
import FullCategory from './FullCategory';
import AddButton from '../components/AddButton';
import { useQuery } from '@apollo/client';
import { GET_BY_CATEGORY } from '../utils/queries';
import Auth from '../utils/auth';

function Profile() {

    //make sure user is logged in first
    if(!Auth.loggedIn()) {
        window.location.assign('/');
    }

    const [currCategory, setCurrCategory] = useState();

    const {loading, data} = useQuery(GET_BY_CATEGORY, {
        fetchPolicy: 'cache-and-network'
    });

    if(loading) {
        return (
        <>
            <Heading mt={10}>Searching Narnia...</Heading>
            <Progress colorScheme='pink' size='sm' isIndeterminate />
        </>
        )
    }

    const clothes = data?.categories || [];

    return (
        <>
        <VStack spacing={5} p={4} divider={<StackDivider borderColor='gray.300' />}>
           {(!clothes.length) ? <Heading>You've got no clothes! Why don't you add some?</Heading> : (!currCategory) ? clothes.map((item, index) => {
               return (<ProfileCategory category={item.category} items={item.clothing} key={index} setCurrCategory={setCurrCategory} />)
           }) : clothes.map((item, index) => {
               if(item.category === currCategory) {
                   return (<FullCategory category={item.category} items={item.clothing} key={index} setCurrCategory={setCurrCategory} />)
               }
           } )}
        </VStack>
        <AddButton />
        </>
    );
};

export default Profile;