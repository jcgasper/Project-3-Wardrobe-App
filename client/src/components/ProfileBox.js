import React from "react";
import { Box, Text, useMediaQuery } from '@chakra-ui/react';

function ProfileBox({image, desc}) {

    const [bigScreen] = useMediaQuery('(min-width:640px')

    return (
        <Box m={5}>
            <img src={image} />
            {bigScreen && <Text>{desc}</Text>}
        </Box>
    )
}

export default ProfileBox;