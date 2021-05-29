import {useEffect, useState} from 'react';
import {useAdminCheck} from './adminCheck';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function useTokenDecode(catchedToken) {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [isAdmin, setIsAdmin] = useState(null);
    const DBAdmin = useAdminCheck();

    useEffect(()=> {

        if(!catchedToken && isAuthenticated) {

            (async ()  => {
                const responseToken = await getAccessTokenSilently({
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                })
                localStorage.setItem('currentToken', responseToken);
                return;
            })();

            return;
        }
        if(isAuthenticated){
            const token = catchedToken.split('.');
            const parsedToken = JSON.parse(atob(token[1]));
            console.log(parsedToken, 'token concat');
            parsedToken.permissions[0] === 'admin:auth' || DBAdmin ? setIsAdmin(true) : setIsAdmin(false);}
        

    }, [isAuthenticated, DBAdmin])

    return !isAuthenticated? false : isAdmin;
}

export {useTokenDecode};