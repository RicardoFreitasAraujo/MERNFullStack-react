import React, { useState, useContext } from 'react';
import './PlaceItem.css';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormsElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const PlaceItem = (props) => {

    const {isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openShowMapHandler = () => setShowMap(true);

    const closeShowMapHandler = () => setShowMap(false);
    
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }

    const cancelDeleteWarningHandler = () => {
        setShowConfirmModal(false);
    }

    const confirmDeleteHandler = async () => {
        try {
            setShowConfirmModal(false);
            await sendRequest(
                `http://localhost:5000/api/places/${props.id}`,
                'DELETE',
                null,
                { Authorization: 'Bearer ' + auth.token});
            props.onDelete(props.id);
        } 
        catch (err) {}
    }

    return(<React.Fragment>
               <ErrorModal error={error} onClear={clearError}>{error}</ErrorModal>
               {isLoading && <LoadingSpinner asOverlay /> }
               <Modal show={showMap} 
                       onCancel={closeShowMapHandler} 
                       header={props.address} 
                       contentClass="place-item__modal-content"
                       footerClass="place-item__modal-actions"
                       footer={
                           <Button onClick={closeShowMapHandler}>CLOSE</Button>
                       }
                       >
                       <div className="map-container">
                            <Map center={props.coordinates} zoom={16}/>
                       </div>
                </Modal>
                <Modal 
                    show={showConfirmModal}
                    onCancel={cancelDeleteWarningHandler}
                    header="Are you sure?" 
                    footerClass="place-item__modal-actions" 
                    footer={
                        <React.Fragment>
                            <Button inverse onClick={cancelDeleteWarningHandler}>CANCEL</Button>
                            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                        </React.Fragment>
                }>
                    <p>Do you want delete this place?</p>
                </Modal>
                <li className="place-item">
                    <Card className="place-item__content">
                        <div className="place-item__image">
                            <img src={`http://localhost:5000/${props.image}`} alt={props.title}/>
                        </div>
                        <div className="place-item__info">
                            <h2>{props.title}</h2>
                            <h3>{props.address}</h3>
                            <p>{props.description}</p>
                        </div>
                        <div className="place-item__actions">
                            <Button inverse onClick={openShowMapHandler}>VIEW ON MAP</Button>
                            {auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button> }
                            {auth.userId === props.creatorId && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
                        </div>
                    </Card>
                </li>
            </React.Fragment>);
};

export default PlaceItem;