import React from 'react'
import styles from './Restaurant.module.css'
import { Container, Card } from 'react-bootstrap';
import Rating from 'react-rating';
import { connect } from "react-redux";
import { getRestaurantDetail } from '../../actions/restaurantActions';

interface RestaurantProps {
  restaurant: any, 
  getDetail: any, 
}

interface RestaurantState {
  restaurant: any
}

const  RestaurantComponent =  (props:any) => (
    <Container>
      <Card >
        <Card.Img>

        </Card.Img>
        <Card.Body>
            <Card.Title>{props.restaurant.name}</Card.Title>
            <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer >
          <Rating readonly={true} initialRating={props.restaurant.rating}/>
        </Card.Footer>
        <div >
        <div className="telephone">
            <span>{props.restaurant.formatted_phone || "No phone"}</span>
        </div>
      </div>
      <div >
        <div className="address">
            <span>{props.restaurant.formatted_addres || "No address"}</span>
        </div>
      </div>
      </Card>
      
    </Container>
    )

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