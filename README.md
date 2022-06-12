# CoastalBrief 🌊
CoastalBrief is your one-stop hub for **planning beach vacation**. CoastalBrief helps you find the best beaches near you and provides helpful informationon over 1000 beaches. Using the weather data it can also recommend which beach activities are a good choice depending on the current weather, humidity. We also have **easy to understand review system** for the users to rate their experience .The best part is that **all of these are available in one place** in a clean and intuitive interface.

# Technology Stack Used:
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jquery/jquery-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>

- EJS: For webpage templating
- Axios: For making requests to external APIs
- Mongoose: For querying MongoDB from Javascript
- Passport.js: Authentication middleware for Google OAuth

#### APIs used
- [California Coastal API](https://www.coastal.ca.gov/open-data/api-docs/)
- [OpenWeatherMap](https://openweathermap.org)

## What it does?
This hackathon project is my attempt to gather data about beaches from all around the internet and display it one place. CoastalBrief includes details, amenities, weather, maps/direction to the particular beach, images and reviews all in one place, making it easy to find all of the information for a perfect vacation.

CoastalBrief allows users to use their browser's geolocation to automatically find beaches near them from a database of 900+ California coastal locations. Once a beach is selected by the user, CoastalBrief provides numerous details:
- Name, location and description of the beach
- Details about the beach (fee, parking, campgrounds, picnic area, fishing, boating, etc.)
- Weather information as well as activity advice based on weather
- Precise Google Map on the location of the beach
- User submitted reviews and feedback about the beach

The background of each beach page is a picture taken from the beach itself!

## How we built it ⚙️
The real gem behind this project is the [California Coastal API](https://www.coastal.ca.gov/open-data/api-docs/). This API provides details on hundreds of beaches, making it possible for us to include custom details for so many beaches. Although this API only provides information about beaches in California, we hope to add beaches from around the world in the future.

The data from the coastal API is queried by our server hourly, and saved into our MongoDB database (to avoid overloading their API). This database can be queried by name and location (latitude, longitude).

Another big part of our project is weather. We use [OpenWeatherMap](https://openweathermap.org) to retrieve live weather data about a beach's geographical location. Weather data is retrieved on demand from the API and is cached into our MongoDB database (this is required as the API has tight rate limits). Our web application defines it's own API for retrieving weather location about a specific beach, and also provides advice on swimming/surfing based on temperature and wind speed.

The last major part of our project are user reviews. We have our own simple in-house implementation for reviews. Users are identified by Google OAuth, and reviews are saved in our MongoDB database. Reviews are displayed on each beach information page. Users can access our website without logging in, but in order to leave reviews they must sign into their Google account. Once signed in, users have the option to leave reviews on any beach information page.

## Challenges we ran into 💻
We overcame several challenges to bring this project to life. One of the main challenges that we have no control over is the pricing on the OpenWeatherMap API. In order to access historical and forecasted weather information, we were required to pay a fee to OpenWeatherMap, which we were unable to do. Therefore, we had to settle by only displaying current weather data on our website.

There was also the challenge of formatting data from the external APIs. The APIs returned data (temperature units, detail data, latitude/longitude, etc.) in a different format than we would like for it to be in, so we were required to convert all of this data before putting it in our database / serving it to the user. To solve this issue, we organized our backend to include numerous services for processing data from each API.

Organization on the frontend was a big concern, as with user submitted data our layout could quickly grow out of hand. Thankfully, EJS provides useful templating features that allowed the server to efficiently generate front-end code. We basically split up our HTML files into smaller files called "partials" in order to organize our code.

Finally, we encountered issues any developer encounters when working on a nontrivial project: incorrect dependencies, formatting issues, issues with querying MongoDB, spelling issues, the list goes on and on. But that's just part of coding :)

## Accomplishments that we're proud of 🏆

We were able to accomplish each goal we laid out at the beginning of the project in its entirety, which is an accomplishment we're really pround of. We are also very proud of how the frontend design turned out - in our opinion, we believe our UI looks fantastic! 

## What we learned 📚
We learned several things over this weekend, making every second we spent on this hackathon fully worthwhile. 
