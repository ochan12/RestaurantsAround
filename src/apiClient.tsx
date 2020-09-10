import axios from "axios";
const apiClient = {
    getAllRestaurants(location: {lat:number, long: number}, radius: number){
        return axios.get('https://restaurants-server.herokuapp.com//get-restaurants', { params: {latitude: location.lat, longitude: location.long, radius: radius}, data: {location: location, radius: radius}});
    },
    getRestaurantDetail(id: string){
        return axios.get('https://restaurants-server.herokuapp.com//get-restaurant-detail', {params:{ id }})
    }
}

export default apiClient