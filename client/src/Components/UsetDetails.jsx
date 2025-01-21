import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserDetails = () => {
  const { userid } = useParams();
  const [userData, setUserData] = useState(null);
   
  useEffect(() => {
    if (userid) {
      fetch(`https://jsonplaceholder.typicode.com/users/${userid}`)
        .then((res) => res.json())
        .then((resp) => {
          setUserData(resp);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [userid]);
  

  return (
    <div className="container">
      <div className="card row" style={{ textAlign: "left" }}>
        <div className="card-title">
          <h2>User Details</h2>
        </div>
        <div className="card-body">
          {userData ? (
            <div>
              <h2>
                The User name is : <b>{userData.name}</b> 
              </h2>
              <h5>User Id :{userData.id}</h5>
              <h5>Email  : {userData.email}</h5>
              <h5>Company  : {userData.company?.name || "N/A"}</h5>
              <Link className="btn btn-danger" to="/">
                Back to Listing
              </Link>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
