import React from 'react';

import Modal from './Modal';
import Button from '../FormsElements/Button';

const ErrorModal = (props) => {
    return(<Modal
        onCancel={props.onClear}
        header="An Error Occurred!"
        show={!!props.error}
        footer={<Button onClick={props.onClear}>Okay</Button>}
    >
        <p>{props.children}</p>
    </Modal>);
}

export default ErrorModal;