import { Text, Pressable, StyleSheet} from 'react-native';

import {Ionicons} from '@expo/vector-icons'
import { Colors } from '../../constants/colors';



function OutlinedButton({onPress, icon, children}){
    return <Pressable style={(pressed) => [styles.button, pressed && styles.pressed]}onPress={onPress}>
        <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
        <Text style={styles.text}>{children}</Text>

    </Pressable>
};

export default OutlinedButton;

const styles = StyleSheet.create({
    button:{
        paddingHorizontal:12,
        paddingVertical:4,
        margin: 2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 4,
        borderColor: Colors.primary500,
    
    },
    pressed:{
        opacity: 0.75,
    },
    icon:{
        marginRight: 6,
    },
    text:{
        color:Colors.primary500,
    }
})

