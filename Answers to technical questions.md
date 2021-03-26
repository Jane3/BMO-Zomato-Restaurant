## 1. How long did you spend on the coding assignment? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

I have spent more than 12 hours on completing this assignment. While I was coding through, I had trouble implementing multiple search fields to search through the restaurant and using Redux to store the information of each restaurant. 

If I were given more time, I would add more features as listed below: 

1.	Implement multiple search fields to search through the restaurant
2.	Implement Redux to store the restaurant information
3.	Implement login/register form to allow users to bookmark their favorite restaurants
4.	Implement a feature to automatically show the closest restaurants based on the IP address geolocation data 
5.	Implement a feature to allow users flipping through the pages showing nearby restaurants


## 2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

The most useful feature I used was to find the longitude and latitude of the city in order to better search the nearby restaurants based on the city user has entered. I then included the longitude and latitude values into the API to search for restaurants in the city user has chosen. 

*****************
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

****************

axios({
                        method: "GET",
                        url: `https://developers.zomato.com/api/v2.1/search?entity_id=${response.cityId}&entity_type=city&start=1&count=20&lat=${response.lati}&lon=${response.long}`,
                        headers: {
                            "user-key": "ff4f897b8bc0d97ccd3ed25a6b951fd3",
                            "content-type": "application/json"
                        }
                    })

## 3. How would you track down a performance issue in production? Have you ever had to do this?

I never had the opportunity to track down a performance issue in production. If I were to track down the issues, I would detect the performance issues in production with continuous delivery by ensuring every change to the system is releasable. 

## 4. How would you improve the API that you just used?

I would use the following approaches to improve the API being used: 

1.	Using the fastest JSON serializer available
2.	Using faster data access strategies
3.	Using cache to cache web API methods that are relatively stale
4.	Using asynchronous methods to maximize the number of concurrent requests

## 5. Please describe yourself using JSON

I used axios to get the response from the web API and used the for loop to loop through the given response in order to store and organize the necessary information into an array.