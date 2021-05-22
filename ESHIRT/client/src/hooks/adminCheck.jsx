import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from 'axios';

function useAdminCheck() {

    const {user, isAuthenticated} = useAuth0();
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(()=> {


        if(isAuthenticated) {
            (async ()=> {

                try {
                        const userCheck = await axios({

                            method: 'GET',
                            url: `/user/${user.sub.split('|')[1]}`,
                            headers: {
                                Authorization: `Bearer ${localStorage.currentToken}`
                            }
                        })

                        setIsAdmin(userCheck.data.isAdmin);

                }catch(err) {

                    setIsAdmin(false);
                    console.log(err);

                }
            })();
        }

    }, [isAuthenticated])
    
    
    
    return isAdmin;
}

export {useAdminCheck}
