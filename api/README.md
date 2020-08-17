# Team Croissant: API

# Link to UI Readme for comprehensive notes and screenshots notes:
[Link to iteration 3 notes](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_Croissant_UI#iter-30-notes)

## Current version: 
Iter 3.0
- link to API deployment: https://croissant-api.herokuapp.com/graphql
- Link to UI Repo: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_Croissant_UI
- Please see https://github.ccs.neu.edu/trantbpham/CS5610-GroupProject for old commits

## Members:
- Alice Tilles
- Miranda Tran
- Tran Pham

## Iter 3.0 Notes:

## Member Contributions:
   - see UI for further details
   - overall the API saw some edits to account creation and implementation of a category filter for products as 
   well as a new order schema.
### Alice:
   - edit account creation
      - spent a long time attempting  to implement a login that persists, but kept  hitting roadblocks in trying to 'trickle up' the logged in  state to the top-level components, especially having difficulty with the react router Redirect  and LinkContainer
       - scrapped that work and ended up just  doing a  simple render() that returned a 'success!' message.
   - implemented category filters via URL query parameters - the listInventory API handles not only quantity *and*  category, but an array of categories
### Tran:
   - merge API branches while developing
   - clean up API branch 
### Miranda: 
   - implement basic read-only and delete order schema
      - it was actually quite difficult because the book didn't really go through
      nested schemas so I had to formulate the query to take a 'ProductList'.
      - I also made the choice to use the server generated _id (which was a mistake), so its query as well requires importing the ObjectID module from 
      mongodb so we can convert a String to an ObjectID object.

## Iter 2.0 Notes:

## Member Contributions:

- see UI for details; overall the API did not change too much other than the addition of a new initialization script for a users collection and additional supporting schema necessary for keeping track of users.

## Iter 1.0 Notes:

- See UI for more details.

### How to run in api directory: 
It is run at localhost:3000.

```
> npm run start
```
 Dependencies (please refer to package.json for the most up-to-date libraries and versions)
    <br> * `"apollo-server-express": "^2.3.1"`,
    <br> * `"dotenv": "^6.2.0"`,
    <br> * `"express": "^4.16.4"`,
    <br> * `"graphql": "^14.2.1"`,
    <br> * `"mongodb": "^3.5.9"`,
    <br> * `"nodemon": "^1.19.4"`,
    <br> * `"qs": "^6.9.4"`,
    <br> * `"query-string": "^6.13.1"`

 Boilerplate starter code: 
 * Pro MERN Stack book
 * https://medium.com/@Preda/getting-started-on-building-a-personal-website-with-react-b44ee93b1710

