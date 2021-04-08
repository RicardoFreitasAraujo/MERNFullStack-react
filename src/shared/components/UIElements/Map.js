import React, { useRef, useEffect } from 'react';
import './Map.css';


const Map = (props) => {
    
    const mapRef = useRef();
    const { center, zoom } = props;

    useEffect(()=> {
    
        try
        {
            const map = new window.google.maps.Map(mapRef.current, {
                center: center,
                zoom: zoom
            });    
            
            new window.google.maps.Marker({position: center, map: map});
        }
        catch (ex)
        {
            console.log(ex);
            alert('Erro ao gerar mapa = ' + ex);
        }

    },[props.center, props.zoom]);

    return(<div ref={mapRef} className={`map ${props.className}`}  style={props.style}> 

    </div>)
};

export default Map;