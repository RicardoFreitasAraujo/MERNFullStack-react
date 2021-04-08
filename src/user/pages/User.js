import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {

    const USERS = [
        { id: 'u1', 
          image: 'https://i.pinimg.com/originals/46/00/57/46005760e0544bcadaaee9b92387e8b8.png', 
          name: 'Batman', 
          places: 3 },
          { id: 'u2', 
          image: 'https://i.pinimg.com/originals/de/97/5d/de975d563dd3912f3b20a87e54119c36.jpg', 
          name: 'Spiderman', 
          places: 2 },
    ];


    return(<UsersList items={USERS}/>);
}

export default Users;
