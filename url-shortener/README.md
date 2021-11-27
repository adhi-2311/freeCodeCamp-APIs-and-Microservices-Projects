### Project-3 of freeCodeCamp APIs and Microservices Course
- Project Starters : [url-shortener](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)

#### Functionalities
POST a URL to `/api/shorturl` and get a JSON response 
`{
"original_url": "https://freecodecamp.org",
"short_url": "1HQRPQy0G"
}`

Visiting /api/shorturl/<short_url>, will redirect to the original URL.

If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain
`{ error: 'invalid url' }`



[Solution Link](https://adhi-url-shortener.glitch.me/)
