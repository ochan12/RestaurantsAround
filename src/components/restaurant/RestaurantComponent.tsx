import React from 'react'
import styles from './Restaurant.module.css'
import { Container, Card, Carousel } from 'react-bootstrap';
import { Rating } from '@material-ui/lab';
import { Box } from '@material-ui/core';
import { connect } from "react-redux";
import { getRestaurantDetail } from '../../actions/restaurantActions';
import apiClient from '../../apiClient';
import { AxiosResponse } from 'axios';
import { Phone, LocationCity, LocationOn } from '@material-ui/icons';

interface RestaurantProps {
  restaurant: any, 
  getDetail: any,

}

interface RestaurantState {
  restaurant: any, 
  address: string,
  phone: string, 
  url: string, 
  photos: any[], 
  photoUrl: string
}

class  RestaurantComponent extends React.Component<RestaurantProps, RestaurantState> {
  constructor(props: any){
    super(props);
    this.state = {
      address: '', 
      phone: '', 
      restaurant: {}, 
      url: '',
      photos: [], 
      photoUrl: ''
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
      <Card>
        <Card.Body>
            <Card.Title >{this.props.restaurant.name}</Card.Title>
            <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer >
          <Box>
            <Rating value={this.props.restaurant.rating} readOnly/>
          </Box>
          <Box display="flex"> 
            <Box><Phone/></Box> <Box></Box><Box>{this.state.phone || "No phone"}</Box>
          </Box>
          <Box display="flex">
            <Box><LocationCity/></Box><Box></Box> <Box>{this.state.address || "No address"}</Box>
          </Box>
          <Box display="flex">
          <Box><LocationOn/></Box><Box></Box><Box><Card.Link href={this.state.url || "No URL"}>Maps</Card.Link></Box>
          </Box>
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