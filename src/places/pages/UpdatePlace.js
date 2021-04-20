import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormsElements/Input';
import Button from '../../shared/components/FormsElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import { useForm } from '../../shared/hooks/form-hook';



const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const history = useHistory();
    const auth = useContext(AuthContext);

    const {isLoading, error, sendRequest, clearError } = useHttpClient();
    const[formState , inputHandler, setFormData] = useForm({
        title: { value: '', isValid: false },
        description: { value: '', isValid: false }
    }, true);
    const [loadedPlace, setLoadedPlace] = useState();

    useEffect(() => {
        const fetchPlace = async() => {
            
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setLoadedPlace(responseData.place);
                setFormData({
                    title: { value: responseData.place.title, isValid: true  },
                    description: { value: responseData.place.description, isValid: true  },
                },true);
            }
            catch (err) { }
        };
        fetchPlace();
    },[sendRequest, placeId, setFormData])

    const placeUpdateSubmitHandler = async (event) => {
        try {
            let payload = {
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            };
            const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`, 'PATCH',
            JSON.stringify(payload),{
                'Content-Type': 'application/json'
            });

            history.push(`/${auth.userId}/places`);
        }
        catch(err) {}
    }

    if (isLoading) {
        return (<div className="center">
                    <LoadingSpinner/>
                </div>);
    }

    if (!loadedPlace && !error) {
        return (<div className="center">
                    <Card>
                        <h2>Could not find place!</h2>
                    </Card>
                </div>);
    }

    if (isLoading) {
        return(<div className="center"><LoadingSpinner/></div>);
    } else {
        return(
            <React.Fragment>
                <ErrorModal error={error} onClear={clearError}>{error}</ErrorModal>
                {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                    <Input id="title" 
                        element="input" 
                        type="text"
                        label="Title" 
                        validators={[ VALIDATOR_REQUIRE() ]}
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}/>
                    <Input id="description" 
                        element="textarea" 
                        type="text"
                        label="Description" 
                        validators={[ VALIDATOR_REQUIRE() ]}
                        errorText="Please enter a valid desription."
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}/>
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE PLACE
                    </Button>
            </form> }
        </React.Fragment>);
    }
};

export default UpdatePlace;