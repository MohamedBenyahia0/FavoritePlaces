import {View, ScrollView, TextInput, Text, StyleSheet} from 'react-native';
import { useCallback, useState } from 'react';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import {Place} from '../../models/Place'
import { getAddress } from '../../util/location';

function PlaceForm({onCreatePlace}){
    const [enteredTitle, setEnteredTitle] =useState('');
    const [pickedLocation , setPickedLocation] = useState();
    const [selectedImage, setSelectedImage] = useState();
    function takeImageHandler(imageUri){
        setSelectedImage(imageUri);
    }
    const pickLocationHandler = useCallback((location)=>{
        setPickedLocation(location);
    });

    function changeTitleHandler(enteredTitle){
        setEnteredTitle(enteredTitle);
    }
    async function savePlaceHandler(){
        if(pickedLocation && selectedImage && enteredTitle){
            const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
            const placeData = 
            new Place(enteredTitle,selectedImage,address,pickedLocation);
            onCreatePlace(placeData);

        }
       
     

    }
    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>

        </View>
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler}/>
        <Button onPress={savePlaceHandler}>Add a place</Button>
    </ScrollView>
}

export default PlaceForm;

const styles = StyleSheet.create({
    form:{
        flex:1,
        paddingBottom: 6,
        padding: 16,

    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color:Colors.primary500,
    },
    input :{
        marginVertical:12,
        paddingHorizontal:6,
        paddingVertical:8,
        fontSize:16,
        borderBottomColor:Colors.primary700,
        backgroundColor:Colors.primary100,
        borderBottomWidth:4,
    }

})