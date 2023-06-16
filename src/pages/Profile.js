import React from 'react';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/loading';

const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { name, picture, email } = user;

  const createCustomer = () => {
    getAccessTokenSilently().then(token => {
      console.log(token)
      fetch(process.env.SCSC_API + "/user/manifestStripeCustomer", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => console.log(res.json()))
      // .then(res => res.json())
      // .then(json => {console.log(json);});
    })
  }

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
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <button onClick={createCustomer}>Create Customer</button>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});