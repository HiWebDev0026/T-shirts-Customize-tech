import {useEffect, useState} from 'react';

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function useTokenDecode(catchedToken) {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(()=> {

        if(!catchedToken) {

            (async ()  => {
                const responseToken = await getAccessTokenSilently({
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                })
                localStorage.setItem('currentToken', responseToken);
                return;
            })();

            return;
        }
        
            const token = catchedToken.split('.');
            const parsedToken = JSON.parse(atob(token[1]));
            console.log(parsedToken, 'token concat');
            parsedToken.permissions[0] === 'admin:auth' ? setIsAdmin(true) : setIsAdmin(false);
        

    }, [])

    return isAdmin;
}

export {useTokenDecode};