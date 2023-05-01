import { StatusBar } from 'expo-status-bar';
import { init } from './util/database';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import IconButton from './components/UI/IconButton';
import {Colors} from './constants/colors'
import { useEffect , useState} from 'react';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';
export default function App() {
  const Stack = createNativeStackNavigator();
  const [dbInitialized, setDbInitialized] = useState();

  useEffect(()=>{
    init().then (()=>{
      setDbInitialized(true);
    })
    .catch((err) =>{
      console.log(err);
    });
    },[]);
  if(!dbInitialized){
    return <AppLoading/>;
  }
  return (
    <>
    <StatusBar style='dark' />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {backgroundColor:Colors.primary500  },
        headerTintColor:Colors.gray700,
        contentStyle:{backgroundColor:Colors.gray700}
      }}>
        <Stack.Screen name = "AllPlaces" component={AllPlaces} 
        options={({navigation}) =>({title:'Your favorite places',
          headerRight: ({tintColor})=><IconButton icon="add" color={tintColor} size={24} onPress={()=> navigation.navigate('AddPlace')} />})} />
        <Stack.Screen name= "AddPlace" component={AddPlace} options={{title:'Add a new Place'}} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{title:'Loading Title ... '}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
    </>
 
  );
}

