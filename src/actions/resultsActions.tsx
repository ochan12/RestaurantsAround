import apiClient from "../apiClient";

export const getRestaurantSuccess = (restaurants: []) => ({
    type: 'GET_RESTAURANTS_SUCCESS', restaurants
  });
  
  export const getRestaurantsFailure = (error: any) => ({
    type: 'GET_RESTAURANTS_FAILURE', error
  });

export function getRestaurants(location: {lat: number, long: number}, radius:number) {
    return function (dispatch: any) {
      return apiClient.getAllRestaurants(location, radius)
        .then((res:any) => {
          dispatch(getRestaurantSuccess(res.data.results))
        })
        .catch((err: any) => {
          console.log(err)
          dispatch(getRestaurantsFailure(err.response))
        });
    }
    
  }
  