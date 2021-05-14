import React, {useEffect} from "react";
import Style from './Profile.module.css';

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading  from './Loading';

export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { name, picture, email } = user;


  useEffect(() => {

    
          (async () => {
            try {
              const token = await getAccessTokenSilently({
                audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
                
              });
              /* const response = await fetch('https://api.example.com/posts', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }); */
              localStorage.setItem('currentToken', token)
              return console.log(localStorage);
            } catch (e) {
              console.error(e);
            }
          })();


  }, [isAuthenticated]);

  return (
    <div>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{name}</h2>
          <p className="lead text-muted">{email}</p>
        </div>
      </div>
      <div className="row">
        <pre className={Style.fuckYou}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
