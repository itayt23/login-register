# Lognet-Systems-OTP

This is a step-by-step guide on how to run the application.

## Installing the Dependencies

1. Clone the repository: `git clone <repository_url>`
2. Navigate into the project directory: `cd <project_directory>`
3. Install the dependencies in the client directory: `cd client && npm install`
4. Install the dependencies in the server directory: `cd ../server && npm install`

## Setting up the Environment Variables

The application requires certain environment variables to run properly. These are stored in a `.env` file.
Create a new file named `.env` in the **server directory** and add the following variables:

```properties
DB_URI=<your_database_uri> (Should be a MongoDB - I used Atlas)
WEATHER_API_KEY=<your_weather_api_key> (Should be OpenWeatherMap API)
SENDGRID_API_KEY=<your_sendgrid_api_key> (Should be SendGrid API)
EMAIL_USER=<your_email> (This email must be confirmed on SendGrid website)
```

## Running the Application

To run the application, follow these steps:
1. Navigate to the server directory: `cd server`
2. Run the server: `npm start`
3. Open a new terminal and navigate to the client directory: `cd client`
4. Run the client: `npm start`
5. Enjoy the application!

## Testing the Application
to run the tests, follow these steps:
1. Navigate to the server directory: `cd server`
2. Navigate to the test directory: `cd __tests__`
3. Run the tests: `npm test`

## Contact
if you have any questions, feel free to contact me