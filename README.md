# car-prototype
## To Get Started

1. clone https://github.com/karthikud/car-prototype.git
2. Run `npm install` for installing the dependencies
3. Create a local mysql instance and update the config in `knexfile.js` 
4. In terminal,Run `knex migrate:latest` to create database schemas
5. Run `npm start` for starting the API
6. Run `npm run test` for running the test suites

## Use the Swagger UI for testing the API
## local setup
Start the application using

npm start

Point your browser at `http://localhost:3000`, you should see the swagger documentation for the  API.

The base API is available at the route `/api` e.g. `http://localhost:3000/api/cars`.



## TO-DO

1.Add more tests.
