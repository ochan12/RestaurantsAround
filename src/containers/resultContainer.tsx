import React from 'react'
import { connect } from "react-redux";
import { CardColumns, Jumbotron } from 'react-bootstrap';
import RestaurantComponent from "../components/restaurant/RestaurantComponent";
import ReactLoading from 'react-loading';
import { Box } from '@material-ui/core';

interface ResultProps {
  restaurantsArray: [], 
  numberOfResults: number
}

interface ResultState {
  numberOfResults: number, 
  loaded: boolean
}

class ResultContainer extends React.Component<ResultProps, ResultState> {
  constructor(props: any){
    super(props)
    this.state = {
      numberOfResults: props.numberOfResults, 
      loaded: props.loaded || false
    }
  }

  componentDidMount = () => {
    if(this.props.restaurantsArray.length > 0) {
      this.setState({
        loaded: true
      })
    }
  }


  render(){
    let restaurants: any[] = []
    let columns;
      if(this.state.loaded || this.props.restaurantsArray.length > 0) {
        this.props.restaurantsArray.forEach(
          (element: {place_id: string}, index:number) => {
          if(index+1 <= this.props.numberOfResults){
            restaurants.push(<RestaurantComponent restaurant={element} key={element.place_id}/>)
          }
          })
          columns = (
            <CardColumns >
              {restaurants}
              </CardColumns>)
    } else {
      columns = (
        <div style={{ margin: 'auto', width:' 100%'}}>
          <ReactLoading type="spin" color="#255F63" key="loading"></ReactLoading>
        </div>
      )
    }

  return (
    <Jumbotron style={{backgroundColor: "blanchedalmond", margin: 'auto', height: '100%'}} className="container">
      {columns}
    </Jumbotron>
    )
    }}

const mapStateToProps = (state: any) => (
    {  
      restaurantsArray: state.results.restaurantsArray
    }
);

export default connect(mapStateToProps, {})(ResultContainer);