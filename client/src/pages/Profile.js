import React, { useState } from 'react';
import { VStack, StackDivider, Heading, Progress, Grid, GridItem, Box } from '@chakra-ui/react';
import ProfileCategory from '../components/ProfileCategory';
import FullCategory from './FullCategory';
import AddButton from '../components/AddButton';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import ProfileFilter from '../components/ProfileFilter';
import ProfileBox from '../components/ProfileBox';

function Profile() {

    //make sure user is logged in first
    if(!Auth.loggedIn()) {
        window.location.assign('/');
    }

    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState();

    const {loading, data} = useQuery(GET_ME);

    if(loading) {
        return (
        <>
            <Heading mt={10}>Searching Narnia...</Heading>
            <Progress colorScheme='pink' size='sm' isIndeterminate />
        </>
        )
    }

    const clothes = data?.me.clothing || [];

    return (
        <>
        <Box mb={10} mt={14} w='full'>
            <ProfileFilter clothes={clothes} setCategories={setCategories} setTags={setTags} tags={tags} />
        </Box>
        
        <Grid templateColumns='repeat(auto-fill, minmax(210px, 1fr))' gap={10} mb={20}>
            {(!clothes.length) ? <GridItem colSpan='4'><Heading>You've got no clothes! Why don't you add some?</Heading></GridItem> : 
            (tags.length === 0) ? clothes.map(article => {return (<GridItem><ProfileBox image={article.imageFile} desc={article.description} id={article._id} key={article._id} /></GridItem>)}) :
            clothes.filter(article => tags.every(tag => article.tags.includes(tag))).map(article => {return (<GridItem><ProfileBox image={article.imageFile} desc={article.description} id={article._id} key={article._id} /></GridItem>)})}
        </Grid>
           
        <AddButton />
        </>
    );
};

export default Profile;