import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserDetails = () => {
  const { userid } = useParams();
  const [userData, setUserData] = useState({});
   
  useEffect(() => {
    if (userid) {
      fetch(`http://localhost:5000/users/${userid}`)
        .then((res) => res.json())
        .then((resp) => {
          setUserData(resp);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [userid]);
  

  
  const fullName = userData.firstname && userData.lastname ? `${userData.firstname} ${userData.lastname}` : '';

  return (
    <div className="container">
      <div className="card row" style={{ textAlign: "left" }}>
        <div className="card-title">
          <h2>User Details</h2>
        </div>
        <div className="card-body">
          {userData && (
            <div>
              <h2>
                The User name is : <b>{fullName}</b> ({userData.id})
              </h2>
              <h5>Email is : {userData.email}</h5>
              <h5>Company is : {userData.company}</h5>
              <Link className="btn btn-danger" to="/">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
