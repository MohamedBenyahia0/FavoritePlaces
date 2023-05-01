import MapView, {Marker} from 'react-native-maps';
import { Alert, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

import IconButton from '../components/UI/IconButton';
function Map({navigation, route}){
    const initialLocation = route.params && {lat : route.params.initialLat, lng : route.params.initialLng};
    const [ selectedLocation, setSelectedLocation] = useState(initialLocation);
    

    const region = {
        latitude: initialLocation? initialLocation.lat: 48.866667,
        longitude : initialLocation? initialLocation.lng : 2.333333,
        latitudeDelta : 0.1,
        longitudeDelta : 0.1,
    };
    function setLocationHandler(event){
        if (initialLocation){
            return ;
        }
        
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({lat:lat,lng:lng});

    }
    const savePickedLocationHandler = useCallback(()=>{
        if(!selectedLocation){
            Alert.alert('No location selected!',
            'You have to select a location first by tapping on the map ');
            return;
        }
        navigation.navigate('AddPlace', {pickedLat: selectedLocation.lat, pickedLng : selectedLocation.lng})

    },[navigation , selectedLocation])


    
    useEffect(() => {
        if(initialLocation){
            return ;
        }
        navigation.setOptions({
            headerRight : ({tintColor}) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler}/>
        })
    },[navigation, savePickedLocationHandler])
    return <MapView style={styles.map} initialRegion={region} onPress={setLocationHandler}>
        {selectedLocation && (<Marker title='Selected Location'
         coordinate={{latitude:selectedLocation.lat, longitude:selectedLocation.lng}}/>)  }
    </MapView>
};

export default Map;
const styles = StyleSheet.create({
    map:{
        flex:1,
    }
})



