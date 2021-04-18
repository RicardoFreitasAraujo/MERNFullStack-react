import React, { useState, useContext } from 'react';
import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormsElements/Button';
import Input from '../../shared/components/FormsElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Auth = () => {

    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
        email: { value: '', isValid: false },
        password: {value:'', isValid: false}
    }, false);

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        if (isLoginMode) {
            try {
                
                let payload = {
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                };
                
                const responseData = await sendRequest('http://localhost:5000/api/users/login',
                                                   'POST', 
                                                   JSON.stringify(payload),
                                                   {
                                                       'Content-Type':'application/json'
                                                   });
                
                auth.login(); 
            } 
            catch(err)
            {
                
            }
        } else {

            try {
                
                let payload = {
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                };
                
                const response = await sendRequest('http://localhost:5000/api/users/signup',
                                                   'POST', 
                                                   JSON.stringify(payload),
                                                   { 'Content-Type' : 'application/json' });
                auth.login(); 
            } 
            catch(err)
            {
            }
        }        
    }

    const switchModeHandler = (event) => {
        if (!isLoginMode) {
            setFormData({ 
                ...formState.inputs,
                name: undefined
            },formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}>
            {error}
        </ErrorModal>
        <Card className="authentication">
        { isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <hr/>
        <form className="" onSubmit={authSubmitHandler}>
            {!isLoginMode && 
            <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
                />
            }
            <Input element="input" 
                   id="email" 
                   type="email" 
                   label="E-Mail" 
                   validators={[VALIDATOR_EMAIL()]}
                   errorText="Please enter a valid email address."
                   onChange={inputHandler}
                   onInput={inputHandler}/>
            <Input element="input" 
                   id="password" 
                   type="password" 
                   label="Password" 
                   validators={[VALIDATOR_MINLENGTH(5)]}
                   errorText="Please enter a valid password."
                   onChange={inputHandler}
                   onInput={inputHandler}/>
            <Button onClick={authSubmitHandler}>
                { isLoginMode ? 'LOGIN' : 'SIGNUP' }
            </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO { isLoginMode ? 'SIGNUP' : 'LOGIN' }</Button>
    </Card>
    </React.Fragment>);
};

export default Auth;
