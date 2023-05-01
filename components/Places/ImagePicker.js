import { Button, View , Image, StyleSheet, Text} from "react-native";
import {launchCameraAsync } from 'expo-image-picker';
import { useCameraPermissions, PermissionStatus} from 'expo-image-picker';
import { Alert } from "react-native";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({onTakeImage}){
    const [pickedImage, setPickedImage] = useState();

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions(){
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }
        if ( cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions',
            'You need to grant camera permissions to use this app');
            return false;
        }
        return true;
    }

    async function takePhotoHandler(){
        const hasPermission = await verifyPermissions();
        if (!hasPermission){
            return ;
        };
        const image =await launchCameraAsync({
        allowsEditing: true,
        aspect:[16,9],
        quality: 0.5

        });
        setPickedImage(image.uri);
        onTakeImage(image.uri);
    }
    let ImagePreview = <Text>No Image taken yet</Text>;
    if(pickedImage){
        ImagePreview = <Image source={{uri :pickedImage}} style={styles.image} />
    }
    return <View>
        <View style={styles.imagePreview}>
            {ImagePreview}


        </View>
        <OutlinedButton icon="camera" onPress={takePhotoHandler}>Take a photo</OutlinedButton>

        </View>
};
export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius: 1,
    
    },
    image:{
        width: '100%',
        height: 200, 
    }
})