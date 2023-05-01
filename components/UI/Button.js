import { Pressable,Text , StyleSheet} from "react-native";
import { Colors } from "../../constants/colors";

function Button({onPress, children}) {
    return <Pressable onPress={onPress} style={(pressed)=>[styles.button , pressed && styles.pressed]}>
        <Text style={styles.text}>{children}</Text>
    </Pressable>

};
export default Button;

const styles = StyleSheet.create({
    button:{
        paddingHorizontal:12,
        paddingVertical:20,
        margin:4,
        backgroundColor:Colors.primary800,
        elevation:2,
        borderRadius:4,
        

    },
    pressed:{
        opacity : 0.75,

    },
    text:{
        textAlign: 'center',
        fontSize:16,
        color:Colors.primary50,

    }
})
