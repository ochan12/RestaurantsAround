import React from 'react'
import { connect } from "react-redux";
import { CardColumns, Jumbotron } from 'react-bootstrap';
import RestaurantComponent from "../components/restaurant/RestaurantComponent";


const ResultContainer = (props: any) => (
    <Jumbotron>
      <CardColumns>
      {props.restaurantsArray.length > 0 && props.restaurantsArray.map(
        (element: {place_id: string}) => {
          console.log(element)
        return (<RestaurantComponent restaurant={element} key={element.place_id}/>)
      }
        
      )}
      </CardColumns>
    </Jumbotron>
)

const mapStateToProps = (state: any) => (
    {  
      restaurantsArray: state.results.restaurantsArray
    }
);

export default connect(mapStateToProps, {})(ResultContainer);