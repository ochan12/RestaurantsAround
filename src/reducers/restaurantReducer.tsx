
export default (state: any, action:{restaurant: any, type:string}) => {
    switch (action.type) {
      case 'GET_DETAIL_SUCCESS':
        console.log("Get detail success")
        console.log(state)
        state.restaurantsArray.map((element:any, index:number) => {
          console.log(element.place_id+" - "+action.restaurant.place_id)
          if(element.place_id == action.restaurant.place_id){
            console.log("Is the same!")
            Object.assign(state.restaurantsArray[index], action.restaurant);
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