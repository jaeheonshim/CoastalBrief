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
- Mongoose: For querying MongoDB fromJavascript
- Passport.js: Authentication middleware for Google OAuth

#### APIs used
- [California Coastal API](https://www.coastal.ca.gov/open-data/api-docs/)
- [OpenWeatherMap](https://openweathermap.org)

## Challenges we ran into 💻
We overcame several challenges to bring this project to life. One of the main challenges that we have no control over is the pricing on the OpenWeatherMap API. In order to access historical and forecasted weather information, we were required to pay a fee to OpenWeatherMap, which we were unable to do. Therefore, we had to settle by only displaying current weather data on our website.

There was also the challenge of formatting data from the external APIs. The APIs returned data (temperature units, detail data, latitude/longitude, etc.) in a different format than we would like for it to be in, so we were required to convert all of this data before putting it in our database / serving it to the user. To solve this issue, we organized our backend to include numerous services for processing data from each API.

Organization on the frontend was a big concern, as with user submitted data our layout could quickly grow out of hand. Thankfully, EJS provides useful templating features that allowed the server to efficiently generate front-end code. We basically split up our HTML files into smaller files called "partials" in order to organize our code.

Finally, we encountered issues any developer encounters when working on a nontrivial project: incorrect dependencies, formatting issues, issues with querying MongoDB, spelling issues, the list goes on and on. But that's just part of coding :)

## Accomplishments that we're proud of 🏆

We were able to accomplish each goal we laid out at the beginning of the project in its entirety, which is an accomplishment we're really pround of. We are also very proud of how the frontend design turned out - in our opinion, we believe our UI looks fantastic! 

## What we learned 📚
We learned several things over this weekend, making every second we spent on this hackathon fully worthwhile. 
