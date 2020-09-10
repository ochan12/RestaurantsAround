import React from 'react'
import { connect, useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import ResultContainer from "../containers/resultContainer";
import { getRestaurants, getRestaurantSuccess, getRestaurantsFailure } from "../actions/resultsActions";
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';


interface Props {
    getAllRestaurants: any
}

interface State {
    location: {
        latitude: number, 
        longitude: number
    }, 
    radius: number
}

class App extends React.Component<Props, State> {

    constructor(props:any){
        super(props);
        this.state = {
            radius: 5000,
            location: {latitude:0, longitude:0}
        }
        this.changeRadius = this.changeRadius.bind(this)
        this.updateRestaurants = this.updateRestaurants.bind(this)
    }

    componentDidMount = () => {
        window.navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                location: {
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                }, 
                radius: 5000
            })
            this.props.getAllRestaurants(this.state.location, this.state.radius)
        });
        
        
    }


    changeRadius = (event: any) => {
        this.setState({
            radius: event.target.value
        })
    }

    updateRestaurants = () => {
        console.log(this.state)
        this.props.getAllRestaurants(this.state.location, this.state.radius)
    }

    render(){
        return (
        <Router>
            <div id='app'>
                <Route exact path='/' render={()=> (
                    <div>
                    <Navbar>
                        <Navbar.Brand>
                            Restaurants near you
                        </Navbar.Brand>
                        
                        <Form inline>
                        <FormControl onChange={(event) => this.changeRadius(event)} value={this.state.radius} type="number" placeholder="Distance (5000 m)" className="mr-sm-2" />
                            <Button variant="outline-info" onClick={() => this.updateRestaurants()}>Search within</Button>
                        </Form>
                    </Navbar>
                    <ResultContainer/>
                </div>
                )}>

                </Route>
            </div>

        </Router>)
    }
}

const mapStateToProps = (state: any) => ({

})


const mapDispatchProps = (dispatch: any) => (
    {
        getAllRestaurants(location: {latitude:any, longitude:any}, radius: number){
                dispatch(getRestaurants({lat: location.latitude, long:location.longitude},radius))
            }
            
        
    }
)

export default connect(mapStateToProps, mapDispatchProps)(App);