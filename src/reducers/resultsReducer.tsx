
export default (state:any, action: {restaurants: any, type: string}) => {
  console.log(action)
  switch (action.type) {
    case 'GET_RESTAURANTS_SUCCESS':
      state.restaurantsArray = action.restaurants
      break;
    case 'GET_RESTAURANTS_FAILURE':
      console.log(action);
      break;
    default: 
      return { restaurantsArray: []};
  }
  return state;
}