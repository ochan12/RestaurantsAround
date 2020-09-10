import React from 'react'
import { connect, useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import ResultContainer from "../containers/resultContainer";
import { getRestaurants, getRestaurantSuccess, getRestaurantsFailure } from "../actions/resultsActions";
import { Navbar, Form, FormControl, Button, Image } from 'react-bootstrap';
import { Box } from '@material-ui/core';


interface Props {
    getAllRestaurants: any
}

interface State {
    location: {
        latitude: number, 
        longitude: number
    }, 
    radius: number, 
    numberOfResults: number
}

class App extends React.Component<Props, State> {

    constructor(props:any){
        super(props);
        this.state = {
            radius: 5,
            location: {latitude:0, longitude:0}, 
            numberOfResults: 10
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
                radius: 5
            })
            
            this.props.getAllRestaurants(this.state.location, this.state.radius*1000)
        });
        
        
    }


    changeRadius = (event: any) => {
        this.setState({
            radius: event.target.value
        })
    }

    changeNumberOfResults = (results: number) => {
        this.setState({
            numberOfResults: results
        })
    }

    updateRestaurants = () => {
        this.props.getAllRestaurants(this.state.location, this.state.radius*1000)
    }

    render(){
        return (
        <Router>
            <div id='app' >
                <div style={{backgroundColor: "blanchedalmond", height: '100%'}}>
                <Route exact path='/' render={()=> (
                    <div style={{backgroundColor: "blanchedalmond", height: '100%'}} >
                    <Navbar >
                            <Image src='/logo128.png' height={"40px"} />
                            <Navbar.Brand>
                                Restaurants near you
                            </Navbar.Brand>

                            <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Form inline>
                            <FormControl onChange={(event) => this.changeRadius(event)} value={this.state.radius} type="number" placeholder="Distance (5 km)" className="mr-sm-2" />
                            <Navbar.Text>km</Navbar.Text>
                            <Navbar.Toggle/>
                            <Button variant="outline-info" onClick={() => this.updateRestaurants()}>Search within</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                    <ResultContainer numberOfResults={this.state.numberOfResults} />

                <div>
                <footer>
                    <span>Results</span>
                    <br/>
                    <Box>
                        <Button variant="light" onClick={() => this.changeNumberOfResults(10)}>10</Button>
                        <Button variant="light" onClick={() => this.changeNumberOfResults(15)}>15</Button>
                        <Button variant="light" onClick={() => this.changeNumberOfResults(20)}>20</Button>
                    </Box>
                    
                </footer>
                </div>
                </div>
                )}>

                </Route>
                    </div>
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