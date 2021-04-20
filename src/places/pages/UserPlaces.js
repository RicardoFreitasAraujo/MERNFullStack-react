import React, { useEffect, useState } from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom'; 
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {

    const {isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    
    const userId = useParams().userId;

    const loadPlaces = async () => {
        
        try {
            console.log('Vai carregar');
            const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
            setLoadedPlaces(responseData.places);
        }
        catch (err) { }
    }

    useEffect(() => {
        loadPlaces();
    },[sendRequest, userId])
    
    const placeDeletedHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces =>  prevPlaces.filter(places => places.id !== deletedPlaceId) );
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <div className="center"><LoadingSpinner/></div>}
            {!isLoading && loadedPlaces && 
                <PlaceList items={loadedPlaces} 
                           onDeletePlace={placeDeletedHandler}/>
            } 
            
        </React.Fragment>
        );
}

export default UserPlaces;