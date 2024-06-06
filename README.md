# Insurance Calculator

Objective of the app is to develop a basic full stack application in which users can enter customers data and calculate the insurance price. Additionally, users of the application must be able to
select additional options and discounts. The insurance price is calculated on the backend.

## Example use case

The sales agent is currently working in their office when a customer walks in, seeking information about insurance prices for their vehicle. The agent proceeds to input the necessary data into a
simple form. Once the data is submitted, the sidebar and header sections of the application needs to be updated.

-   in the sidebar section, the available coverages are displayed
-   in the header section, the available discounts are displayed
-   additionally, the header section also presents the total price
-   below the main form, the price details are displayed

## Implementation requirements

#### Frontend

In the given scenario, the form data will be applied upon clicking the "Save" button. However, any changes made to the checkboxes in the header and sidebar sections should be applied immediately upon
clicking them.

Moreover, it's important to ensure that any changes made in one section of the application are reflected in the other sections as well. This means that modifying a checkbox in the header or sidebar
should update the linked information in the other sections, ensuring consistency throughout the application.

1.1. Main form

The main form must contain a form with the following fields (all fields except “Voucher” and “Price match” are required):

-   Name
-   Birthdate
-   City
-   Vehicle power
-   Voucher

Price details are displayed below the form, and include the following:

-   Basic price (without all discounts and coverages)
-   List of discounts (if any are applied)
-   for every discount, amount in EUR must be displayed
-   List of coverages (if any are applied) Sidebar’s EUR must be displayed
-   List of coverages (if any are applied)
-   for every coverage, amount in EUR must be displayed
-   Total price

    1.2. Header

The header must contain a list of available discounts which can be selected, along with the display of the total price.

1.3. Sidebar The sidebar must contain a list of available coverages which can be selecte

#### Backend

To ensure the necessary functionality, implement the following for the back-end:

-   Store all configurations, including coverages, discounts, and additional options, in the database.
-   Create an endpoint that receives the necessary customer data and the selected coverages, discounts, and additional options. This endpoint will calculate the insurance price based on a combination
    of the base price, selected additional coverage prices and selected discounts/surcharges.
-   The base price is calculated based on the city and age of the customer.

The coverages and discounts are typically accessible to all customers, with a few exceptions, and they can impact the price in various ways. The specific rules regarding their availability and
application are outlined as follows:

Additional coverages:

-   Bonus Protection - 12% of the base price
-   AO+ - Fixed price:
    -   55 EUR for users younger than 30 years
    -   105 EUR for users that are 30 years old or older
-   Glass protection - 80% of the vehicle power

Discounts/surcharges:

-   Commercial discount - 10% on the base price
-   Adviser discount - 20% on all coverages - if at least 2 coverages are selected
-   VIP discount - 5% on the total price - show only if vehicle power over 80
-   Strong car surcharge - + 10% if vehicle power over 100 - applied automatically (can’t be turned off)
-   Voucher - a user entered price that discounts the total price

## Tech Stack

-   Typescript (strict type checking: no any and no ts-ignores)
-   React (hooks, function components, state management of choice)
-   Css framework of choice
-   NodeJs
-   MongoDB
-   REST api or Graphql

## Installation

### Database

Follow these steps to set up MongoDB Atlas and connect it to your project:

1. Create a MongoDB Atlas Account

-   Visit the [MongoDB Atlas website](https://www.mongodb.com/cloud/atlas).

-   Sign up for a free account or log in if you already have one.

2. Create a Cluster

-   In your MongoDB Atlas dashboard, click on "Build a Cluster".
-   Select the free tier and choose your preferred cloud provider and region.
-   Click "Create Cluster". The process may take a few minutes.

3. Whitelist IP Address

-   Go to "Network Access" under the "Security" section in your MongoDB Atlas dashboard.
-   Click on "Add IP Address".
-   To allow access from anywhere (not recommended for production), enter `0.0.0.0/0`. To allow access from your current IP address, click "Add Current IP Address".

4. Create a Database User

-   Navigate to "Database Access" under the "Security" section.
-   Click "Add New Database User".
-   Create a user by setting a username and password (note these credentials as you'll need them later).

5. Paste that username and password credentials in the backend `.env` file (`MONGO_USERNAME` and `MONGO_PASSWORD`), see below

### Backend

1. Clone the repository:

    ```bash
    git clone https://github.com/bbj26/insurance-company.git
    ```

2. Install dependencies:
    ```bash
    cd insurance-company
    cd backend
    npm install
    ```
3. Create a `.env` file in the root directory (`backend)` and add your environment variables:
    ```plaintext
    MONGO_USERNAME=user123
    MONGO_PASSWORD=password123
    SERVER_PORT=9090
    ```
4. Start the development server:
    ```bash
    npm start
    ```

### Frontend

1. Install dependencies:

    ```bash
    cd insurance-company
    cd frontend
    npm install
    ```

2. Create a `.env` file in the root directory (`frontend)` and add your environment variables:
    ```plaintext
    REACT_APP_SERVER_URL=http://localhost:9090/api
    ```
3. Start the development server:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.
