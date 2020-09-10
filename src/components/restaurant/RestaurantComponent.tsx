import React from 'react'
import styles from './Restaurant.module.css'
import { Container, Card, Carousel } from 'react-bootstrap';
import { Rating } from '@material-ui/lab';
import { Box } from '@material-ui/core';
import { connect } from "react-redux";
import { getRestaurantDetail } from '../../actions/restaurantActions';
import apiClient from '../../apiClient';
import { AxiosResponse } from 'axios';
import { Phone, Language, LocationOn } from '@material-ui/icons';
import ReactLoading from 'react-loading';

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
  photoUrl: string, 
  website: string, 
  reviews: []
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
      photoUrl: '',
      website: '', 
      reviews: []
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
          photos: res.data.result.photos, 
          website: res.data.result.website || '', 
          reviews: res.data.result.reviews || []
        })
        
      })
  }

  getRootURL = (url:string ) => {
    let splittedUrl = url.split("/")
    return splittedUrl[2]
  }

  render(){
    let phoneComponent = this.state.phone ? (<Box>{this.state.phone}</Box>) : (<ReactLoading color="#255F63"  type="bubbles"/>)
    let addressComponent = this.state.url && this.state.address ? (<Box><Card.Link href={this.state.url}>{this.state.address}</Card.Link></Box>):(<ReactLoading color="#255F63" type="bubbles"/>)
    let urlComponent = this.state.website ? (<Box><Card.Link href={this.state.website}>{this.getRootURL(this.state.website)}</Card.Link></Box>):(<ReactLoading color="#255F63" type="bubbles"/>)


  return(
    <Container>
      <Card>
        <Card.Body>
            <Card.Title >{this.props.restaurant.name}</Card.Title>
            <Card.Text>
            <Box>
              <Rating value={this.props.restaurant.rating} readOnly/>
            </Box>
            </Card.Text>
        </Card.Body>
        <Card.Footer >     
          <Box display="flex"> 
            <Box><Phone/></Box> <Box></Box> <Box marginLeft={"4px"}>{phoneComponent}</Box>
          </Box>
          <Box display="flex">
            <Box><LocationOn/></Box><Box ></Box> <Box marginLeft={"4px"}>{addressComponent}</Box>
          </Box>
          <Box display="flex">
          <Box><Language/></Box><Box></Box><Box marginLeft={"4px"}>{urlComponent}</Box>
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