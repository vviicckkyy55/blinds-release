import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router';

export default function MasterRoute({component: Component, ...rest}) {
  
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  
  return (
    <Route 
      {...rest} 
      render={(props) => 
        userInfo && userInfo.isMaster ? ( 
          <Component {...props}></Component>
        ):(
          <Redirect to="/signin" />
        )}
    ></ Route>
  );
}
