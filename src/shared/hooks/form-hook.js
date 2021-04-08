import { useCallback, useReducer } from 'react';

const formReducer = (state, action)  => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;
                }
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid  = formIsValid && state.inputs[inputId].isValid;
                }
            }
            let newState =  {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId] : {value: action.value, isValid: action.isValid } 
                },
                isValid: formIsValid
            };
            return newState;
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            };
        default: 
            return state;
    }
};


export const useForm =  (initialInputs, initialFormValidity) => {

    const [formState, dispatch] = useReducer(formReducer, { 
        inputs: initialInputs, 
        isValid: initialFormValidity
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE',inputId: id, value: value, isValid: isValid})
    },[]);

    const setFormData = useCallback((inputsData, formValidity) => {
        dispatch({type:'SET_DATA', 
                  inputs: inputsData, 
                  formIsValid: formValidity
                });
    },[]);

    return [ formState , inputHandler, setFormData];

} 