import { getAddress } from "../util/location";

export class Place{
    constructor(title, imageUri,address,  location, id){
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = { lat :location.lat,lng:  location.lng}
        this.id =id;
    }
}