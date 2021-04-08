import React from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom'; 

const UserPlaces = () => {

    const userId = useParams().userId;
    
    const DUMMY_PLACES = [
        {
            id: 'p1',
            title: 'Empire State Building',
            description: 'One of the most famous sky scrapers in the world!',
            imageUrl: 'https://dicasnovayork.com.br/wp-content/uploads/2016/02/empire_header1-1000x700.jpg',
            address: '20 W 34th St, New',
            location: {
                lat: 40.7484405,
                lng: -73.9878584
            },
            creator: 'u1'
        },
        {
            id: 'p2',
            title: 'Empire State Building - 2X',
            description: 'One of the most famous sky scrapers in the world!',
            imageUrl: 'https://dicasnovayork.com.br/wp-content/uploads/2016/02/empire_header1-1000x700.jpg',
            address: '20 W 34th St, New',
            location: {
                lat: 40.7484405,
                lng: -73.9878584
            },
            creator: 'u2'
        }
    ];
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    return(<PlaceList items={loadedPlaces}/>);
}

export default UserPlaces;