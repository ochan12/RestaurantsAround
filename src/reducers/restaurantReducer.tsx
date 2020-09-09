
export default (state: any, action:{restaurantDetail: any, type:string}) => {
  console.log(action)
    switch (action.type) {
      case 'GET_DETAIL_SUCCESS':
        state.restaurantsArray.forEach((element:any, index:number) => {
          if(element.place_id == action.restaurantDetail.place_id){
            Object.assign(state.restaurantsArray[index], action.restaurantDetail);
            return state;
          }
        })
      break;
    case 'GET_DETAIL_FAILURE':
      console.log(action)
      break;
    default: 
      return {restaurantsArray: []};
  }
  return state;
}