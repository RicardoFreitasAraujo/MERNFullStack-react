import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormsElements/Input';
import Button from '../../shared/components/FormsElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';

import { useForm } from '../../shared/hooks/form-hook';

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

const UpdatePlace = () => {
    const placeId = useParams().placeId;
   
    const [isLoading, setIsLoading] = useState(true);
    
    const[formState , inputHandler, setFormData] = useForm({
        title: { value: '', isValid: false },
        description: { value: '', isValid: false }
    }, true);

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
    
    useEffect(() => {
        if (identifiedPlace)
        {
            setFormData({
                title: { value: identifiedPlace.title, isValid: true  },
                description: { value: identifiedPlace.description, isValid: true  },
            },true);
        }
        
        setIsLoading(false);
    },[setFormData, identifiedPlace])
    

    const placeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if (!identifiedPlace) {
        return (<div className="center">
                    <Card>
                        <h2>Could not find place!</h2>
                    </Card>
                </div>);
    }

    if (isLoading) {
        return(<div className="center"><h2>Loading!</h2></div>);
    } else {
        return(
            <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input id="title" 
                   element="input" 
                   type="text"
                   label="Title" 
                   validators={[ VALIDATOR_REQUIRE() ]}
                   errorText="Please enter a valid title."
                   onInput={inputHandler}
                   initialValue={formState.inputs.title.value}
                   initialValid={formState.inputs.title.isValid}/>
            <Input id="description" 
                   element="textarea" 
                   type="text"
                   label="Description" 
                   validators={[ VALIDATOR_REQUIRE() ]}
                   errorText="Please enter a valid desription."
                   onInput={inputHandler}
                   initialValue={formState.inputs.description.value}
                   initialValid={formState.inputs.description.isValid}/>
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>);
    }
};

export default UpdatePlace;