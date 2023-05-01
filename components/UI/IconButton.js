import { Pressable, StyleSheet } from "react-native";
import {Ionicons} from '@expo/vector-icons'
function IconButton({color, onPress, icon, size}){
    return <Pressable onPress={onPress} style={(presssed) => [styles.button, presssed && styles.pressed]}>
        <Ionicons name={icon} color={color} size={size} />
    </Pressable>
}
export default IconButton;

const styles = StyleSheet.create({
    button:{
        padding: 8,
        margin: 4,
        justifyContent:'center',
        alignItems:'center'
        
    },
    pressed:{
        opacity:0.7
    }


})