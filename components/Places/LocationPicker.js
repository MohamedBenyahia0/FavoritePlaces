import OutlinedButton from "../UI/OutlinedButton";
import { View, StyleSheet, Alert, Text, Image } from "react-native";
import { Colors } from "../../constants/colors";
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location';
import {getAddress, getMapPreview} from '../../util/location';
import { useState, useEffect } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

function LocationPicker({onPickLocation}){
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const route = useRoute();
    const [pickedLocation , setPickedLocation] = useState();
    const [locationPermissionInformation , requestPermission] = useForegroundPermissions();
    
    useEffect(()=>{
        function handleMapPickedLocation(){
            if(isFocused && route.params){
                const mapPickedLocation = 
                {lat : route.params.pickedLat, lng : route.params.pickedLng};
                
                setPickedLocation(mapPickedLocation);
    
            }

        };
        handleMapPickedLocation();
        
        
       
    },[ route, isFocused]);
    async function verifyPermissions(){
       
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }
        if ( locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions',
            'You need to grant location permissions to use this app');
            return false;
        }
        return true;

    }

    async function LocateUserHandler(){
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return ;
        }
        const location = await getCurrentPositionAsync();

       
        setPickedLocation({
            lat:location.coords.latitude,
            lng : location.coords.longitude});
      
       
    }
    useEffect(()=>{
        function handleLocation(){
            if(pickedLocation){
                
                onPickLocation(pickedLocation);

            }
            
        };
        handleLocation();
    },[pickedLocation, onPickLocation])
    function OpenMapHandler(){
        navigation.navigate("Map");


    }

    let locationPreview = <Text>No location added yet</Text>;
    if(pickedLocation){
        locationPreview = <Image style={styles.mapPreviewImage} source={{uri: getMapPreview(pickedLocation.lat,pickedLocation.lng)}}/>;
    }
    return <View >
        <View style={styles.mapPreview}>
            {locationPreview}
        
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon="location" onPress={LocateUserHandler} >Locate User</OutlinedButton>
            <OutlinedButton icon="map" onPress={OpenMapHandler}  >Open Map</OutlinedButton>

        </View>
    </View>
};

export default LocationPicker;

const styles= StyleSheet.create({
    mapPreview:{
        marginVertical:8,
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius: 4,
    },
    
    actions:{
        
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginBottom: 4,

    },
    mapPreviewImage:{
        width:'100%',
        height:'100%'
    }

})