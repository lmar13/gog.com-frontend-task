# GOG.com Frontend Recruitment Task

## Description

Implement the design from provided PSD file accurately. Feel free to use any tools you like. Please send us a link to the repository of your solution after you're finished - we're as much interested in the source code as in the working application.

Don't worry about cross-browser compatibility, or mobile views support. Focus on code quality and maintainability.

## Requirements

1. Top bar with Cart icon:
    * Number reflects amount of Products in Cart
2. Cart dropdown
    * It should be closed by default
    * "CLEAR CART" button removes all Products from Cart
    * Hovering over Product reveals "Remove" option
3. Content with Products that you can add to Cart
    * Clicking on price button adds Product to Cart
    * Products in Cart should be marked as "IN CART"
    * You can’t add the same product to cart twice

If there is something missing or unclear in the description above, we ask you to be creative and implement your own solution to the problem.

## Realization

### Tools used

I decided that, the best approach to this task, is to create a web application that will imitate a fully functional solution. This project provides server that will allow communication between the site and the database. Server is created in Node.js, and the database is written in JSON, because it is probably the simplest and the best solution for this task. Rest tools are listed below:

Languages  | Styles Framework  | JavaScript Framework | Database
---------  | ----------------  | -------------------- | --------
HTML       | Bootstrap v4.0.0  | Node.js v8.10.0      | JSON
CSS        | Popper.js v1.12.9 | Npm v???             |
JavaScript |                   | jQuery v3.2.1        |
           |                   | Express.js v4.8.0    | 
           |                   | Body-parser v1.0.1   | 
           |                   | Nodemon v1.17.2      |


### Installation

To open my application in browser, please start server first. Elements such small cards and shopping cart are initialized with data from database.

To start server (main.js) please be sure you installed node.js. To start the server open Terminal (MacOS X, Linux) or cmd.exe (Windows). Go to loaction of project you downloaded. Then start server with this command

```
nodemon main.js
```

If this won't work please use this command

```
npx nodemon main.js
```

When you see message 

```
Server is running on http://...
```
it means that server started correctly. Please go to address that is shown in console for example http://localhost:3000. You should see the default view of application with all elements that i should implement.

### Instructuion / Additional information

1. Add element to cart.
    * Click **price button** of desired element
    * Data are send to database
    * Button become disabled and text is change to **'IN CART'**
    * Cart elements are created 
    * Parameters such price and how many elements are updated
2. Open cart
    * Click **cart icon**
    * Dropdown menu will show up with items inside cart
    * First element show how many items in cart and summary price, there is also **CLEAR CART** button
    * Next elements will be created when items will be added to cart
    * To close cart, click **cart icon** once again. Any clicks outside won't close cart dropdown
3. Clear all from cart
    * When cart is open click **CLEAR CART** button
    * Data will be send to database
    * Elements are cleared
    * Redraw all elements with games to buy
    * Parameters such price and how many elements are updated
4. Remove 1 element from cart
    * When cart is open hover on desired item
    * **Remove** button will show
    * Click **Remove** button to delete desired element from cart
    * Redraw selected item in main view
    * Parameters such price and how many elements are updated

### Secret place
When I was extracting PSD image provided for this task, I noticed that there is **SECRET** button. So off course I implemented it, but I thought, it would be nice, if this button has some function. So I added ability to add and delete sample elements but leave default untouched. To see this modal please use instruction below:

1. Click on logo of your company - **SECRET** button will show up
2. Click on button to open modal window
3. To add sample element click **ADD**
4. To remove sample element click **DELETE**
5. To see changes close modal with **X** button located top right corner. Any outside click won't close modal
6. Elements will redraw and show up
7. You can use them as normal elements so for example you can add them to cart

## Author information

- Name:   Lukasz Marciniak
- Email:  lukasz.marciniak@wp.eu
- Phone:  503909210
- City:   Gdansk
- Country: Poland
- LinkedIn: https://www.linkedin.com/in/marciniaklukasz



