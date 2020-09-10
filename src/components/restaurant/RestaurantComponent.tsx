import React from 'react'
import styles from './Restaurant.module.css'
import { Container, Card } from 'react-bootstrap';
import Rating from 'react-rating';
import { connect } from "react-redux";
import { getRestaurantDetail } from '../../actions/restaurantActions';
import apiClient from '../../apiClient';
import { AxiosResponse } from 'axios';


interface RestaurantProps {
  restaurant: any, 
  getDetail: any,

}

interface RestaurantState {
  restaurant: any, 
  address: string,
  phone: string, 
  url: string, 
  photos: []
}

class  RestaurantComponent extends React.Component<RestaurantProps, RestaurantState> {
  constructor(props: any){
    super(props);
    this.state = {
      address: '', 
      phone: '', 
      restaurant: {}, 
      url: '',
      photos: []
    }
  }


  componentDidMount = async () => {
    await apiClient.getRestaurantDetail(this.props.restaurant.place_id).then(
      (res: AxiosResponse ) => {
        console.log(res.data)
        this.setState({
          address: res.data.result.formatted_address, 
          phone: res.data.result.formatted_phone_number, 
          url: res.data.result.url, 
          photos: res.data.result.photos
        })
        
      })
  }

  render(){
  return(
    <Container>
      <Card >
        <Card.Img>

        </Card.Img>
        <Card.Body>
            <Card.Title>{this.props.restaurant.name}</Card.Title>
            <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer >
          <Rating readonly={true} initialRating={this.props.restaurant.rating}/>
          <span>{this.state.phone || "no phone"}</span>
          <span>{this.state.address || "No addres"}</span>
        </Card.Footer>
      </Card>
      
    </Container>
  )}
}

const mapStateToProps = (state: any) => (
{
    restaurantsArray: state.results.restaurantsArray
}
);

const mapDispatchProps = (dispatch: any) => (
  {
    getDetail(placeId: string){
      dispatch(getRestaurantDetail(placeId))
    }
  }
)

export default connect(mapStateToProps, mapDispatchProps)(RestaurantComponent)