import apiClient from "../apiClient";

export const getDetailSuccess = (restaurant: any) => ({
    type: 'GET_DETAIL_SUCCESS', restaurant
  });
  
  export const getDetailFailure = (error: any) => ({
    type: 'GET_DETAIL_FAILURE', error
  });

export function getRestaurantDetail(placeId:string) {
    return function (dispatch: any) {
      return apiClient.getRestaurantDetail(placeId)
        .then((res:any) => {
          dispatch(getDetailSuccess(res.data.result))
        })
        .catch((err: any) => {
          dispatch(getDetailFailure(err.response))
        });
    }
    
  }