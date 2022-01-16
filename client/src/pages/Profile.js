import React, { useEffect, useState } from 'react';
import { VStack, StackDivider, Text, Heading } from '@chakra-ui/react';
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

    const [currCategory, setCurrCategory] = useState('Bottom');

    const {loading, error, data} = useQuery(GET_BY_CATEGORY);

    if(loading) {
        return <Heading mt={10}>Searching Narnia...</Heading>
    }

    const clothes = data?.categories || [];

    const categories = [['Top','Tops'],['Bottom','Bottoms'],['Outerwear','Outerwear'],['Footwear','Footwear'],['Accessory','Accessories']];

    return (
        <>
        <VStack spacing={5} p={4} divider={<StackDivider borderColor='gray.300' />}>
           {(!currCategory) ? (<Heading>Loading</Heading>) : clothes.map((item, index) => {
               if(item.category === currCategory) {
                   return (<FullCategory category={item.category} items={item.clothing} key={index} />)
               }
           } )}
        </VStack>
        <AddButton />
        </>
    );
};

export default Profile;