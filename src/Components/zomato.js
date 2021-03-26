import React, {useState} from 'react';
import axios from 'axios';
import './zomato.css'
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Zomato() {

    // set the initial states to store the restaurent data
    const [state, setState] = useState({
        searchRest:"",
        restData: [],
        isSearch: false,
        responseStatus: 'Please enter your location to search the nearby Zomato Restaurants'
    })

    const handleChangeRest =(searchQuery)=>(e)=>{
        setState({
            ...state,
            searchRest: e.target.value,
            //[searchQuery]: query
        });
    }


    const clearSearch =() =>{
        setState({
            ...state,
            searchRest : "",
            searchCuisine:""
        })
    }


    // get the City ID/Name, Longitude, and Latitude from the URL to be used to search restaurent data
    const getLocationLatitude = (city) => {
        return axios({
            method: "GET",
            url: `https://developers.zomato.com/api/v2.1/locations?query=${city}`,
            headers: {
                "user-key": "ff4f897b8bc0d97ccd3ed25a6b951fd3",
                "content-type": "application/json"
            }
        })
            .then(response => {           
                //console.log(response)
                let long = response.data.location_suggestions[0].longitude;
                let lati = response.data.location_suggestions[0].latitude;
                let cityId = response.data.location_suggestions[0].city_id;
                // console.log(long,lati)
                return (
                    {
                        "long": long,
                        "lati": lati,
                        "cityId": cityId,
                    }
                );

            })
            .catch(error => {
                console.log(error);
            });
    }

    // search the nearby restaurents by using the city ID/Name, Longitude and Latitude retrieved from the function getLocationLatitude
    const searchRestaurant = async (event) => {
        const query = event.target.value;
        console.log(query); 
        if (event.key === 'Enter') {
            setState({
                ...state,
                searchRest : query,
                isSearch: true
            })

            
            await getLocationLatitude(query)
                .then(response => {
                     console.log(response)
                    axios({
                        method: "GET",
                        url: `https://developers.zomato.com/api/v2.1/search?entity_id=${response.cityId}&entity_type=city&start=1&count=20&lat=${response.lati}&lon=${response.long}`,
                        headers: {
                            "user-key": "ff4f897b8bc0d97ccd3ed25a6b951fd3",
                            "content-type": "application/json"
                        }
                    })
                        .then(response => {
                            //console.log(response);
                            let restaurantList = []
                            let restaurantData = {}
                            let nearbyRest = response.data.restaurants;
                            for (var i of nearbyRest) {
                                restaurantData.name = (i.restaurant.name)
                                restaurantData.url = (i.restaurant.url)
                                restaurantData.average_cost_for_two = (i.restaurant.average_cost_for_two)
                                restaurantData.has_online_delivery = (i.restaurant.has_online_delivery) ? "Available" : "Not Available"
                                restaurantData.rating = (i.restaurant.user_rating.aggregate_rating)
                                restaurantData.cuisines = (i.restaurant.cuisines).split(',')
                                restaurantData.rating_text = (i.restaurant.user_rating.rating_text)
                                restaurantData.featured_image = i.restaurant.featured_image
                                restaurantData.location = i.restaurant.location.address
                                restaurantData.timing = (i.restaurant.timings).split(',')
                                restaurantData.phone_numbers = (i.restaurant.phone_numbers).split(',')
                                restaurantList.push(restaurantData)
                                restaurantData = {}
                            }

                            for(var i of restaurantList){
                                if(i.cuisines.includes("Sandwich")){
                                    console.log("looo");
                                }
                            }

                            //console.log(restaurantList);

                            setState({
                                ...state,
                                restData: restaurantList,
                                responseStatus: `Here is the list of Zomato-Restaurants based on your location entered`
                            })
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(Err => setState({ ...state, responseStatus: "Please Enter the correct location and try again" }))
        }
    }


    //contains the JSX code to show the nearby restaurents onto the website 
    let RestaurantsJSX = state.restData.map((rest, ind) => {
        return (
            <div className="Card" key={ind}>
                <div className="content">
                    <div>
                        <article><a href={rest.url} key={ind} target="_blank"></a>
                            <div className="first-div">
                                <div className="img">
                                    <img src={rest.featured_image} alt="Low Internet Connectivity" />
                                </div>
                                <div className="img-details">
                                    <div className="details">
                                        <div className="restaurant-name">

                                            <h3><a href={rest.url} key={ind} target="_blank">{rest.name}</a></h3>
                                        </div>
                                        <div className="restaurnat-place">{rest.location}</div>
                                    </div>
                                    <div className="ratings">
                                        <span>Ratings</span>
                                        <div className="ratings">{rest.rating}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="divider div-transparent"></div>
                            <div className="text">
                                <div className="Row">
                                    <span><b>CUISINES:</b></span>
                                    <span>{rest.cuisines.slice(0, 4).join(',')}</span>
                                </div>
                                <div className="Row">
                                    <span><b>COST FOR TWO:</b></span>
                                    <span>{rest.average_cost_for_two}</span>
                                </div>
                                <div className="Row">
                                    <span><b>ONLINE_DELIVERY:</b></span>
                                    <span>{rest.has_online_delivery}</span>
                                </div>
                                <div className="Row">
                                    <span><b>TIMINGS:</b></span>
                                    <span>{rest.timing.slice(0, 2).join(',')}</span>
                                </div>
                                <div className="Row">
                                    <span><b>RATING TEXT:</b></span>
                                    <span>{rest.rating_text}</span>
                                </div>
                            </div>
                        </article><hr />
                        <div className="Row">
                            <span>Phone Numbers:</span>
                            <span>{rest.phone_numbers.slice(0, 2).join(',')}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    
    

    if (state.isSearch ) RestaurantsJSX = 
        <div className="progress-bar"><CircularProgress color="secondary" /></div>


    return (
        <div>
            <h1>Zomato Restaurants</h1>
            <div className="inputCard" >
               
                <input  className="searchbar"
                   type="text" 
                   value={state.searchCuisine}
                   onChange={handleChangeRest}
                   placeholder="Search Cuisines"
                   onKeyPress={searchRestaurant} 
                />

                <button className="btnSearch" onClick={clearSearch}>Reset</button>
            </div>
           
            <div className="inputCards">{state.responseStatus} </div>
                {RestaurantsJSX}
        </div>
    )

}
