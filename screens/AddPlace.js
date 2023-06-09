import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({navigation}) {
    async function createPlaceHandler(placeData){
        await insertPlace(placeData);
        navigation.navigate('AllPlaces');
    }
    return <PlaceForm onCreatePlace={createPlaceHandler}/>

};

export default AddPlace;