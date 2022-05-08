import React, { useState } from 'react';

export const UserStateContext = React.createContext();

export const UserStateProvider = props => {

  const [user, setUser] = useState({
    phone: '',
    pseudo: '',
    pwd: '',
    img64: '' ,
    groups: []
  });

  return (
    <UserStateContext.Provider value={{user: user, setUser: setUser}}>
      {props.children}
    </UserStateContext.Provider>
  );
};