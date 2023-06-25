import React from 'react';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const UserProfileExtractor = function() {

    const { user, getAccessTokenSilently } = useAuth0();
    console.log("USER:", user);
    const { name, picture, email } = user;
    
    return { name, picture, email };
    
}
    
export default UserProfileExtractor;