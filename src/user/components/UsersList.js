import React from 'react';

import './UserList.css';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';


const UsersList = (props) => {
    if (props.items.length === 0) {
        return(<Card className="center">
            <h2>No users found.</h2>
        </Card>);
    }

    return (<div>
        <ul className="users-list">
            { props.items.map(item => {
                return(<UserItem 
                        key={item.id} 
                        id={item.id} 
                        image={item.image}
                         name={item.name} 
                         placeCount={item.places}/>)
            })  }
        </ul>
    </div>);
}

export default UsersList;