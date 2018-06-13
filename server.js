// this is a NodeJS web application

// load the "express" server framework
const express = require('express');

// define "app" as the name of our express server
const app = express();

// import stanley cup data,
// converted to JSON format,
// from a table I found here:
// https://www.hockey-reference.com/awards/stanley.html,
// calling it "data"
const data = require('./data.json');

// this will look through each season and determine if the provided team won,
// then it will add that season to a list called "cups"
const getAllCupWinsForTeam = (team) => {
  // define and empty array (list) called "cups"
  let cups = [];
  // go through each cup in our data,
  // and for each of them...
  for(let cup of data){
    // see if our team matches the team that won that year,
    // if so...
    if(cup.Team === team){
      // add that year to the list
      cups.push(cup.Season);
    }
  }
  // this is the full list provided to the "seasons" variable below
  return cups;
}

// for requests to http://localhost:3000/[no path],
// serve static html from the "static" folder
app.use('/', express.static('static'));

// for all requests (links) to http://localhost:3000/team/[your team here],
// return all seasons that the requested team has won the cup
app.get('/teams/:team', (req, res) => {
  // set the value of the team requested
  const requestedTeam = req.params.team;
  // log it to the server console so we can see it there for debugging purposes
  console.log(requestedTeam);
  // set the value of "seasons" to the result of the function getAllCupWinsForTeam, defined above^^
  const seasons = getAllCupWinsForTeam(requestedTeam);
  // create a dynamic html template to visualize the results.
  // ${} is a reference to a variable above
  const html = `<h1>The ${requestedTeam} won the Stanley Cup the following seasons:</h1>
                    <p>${seasons}</p>`
  // send the template, with data inserted, back to the user
  res.send(html);
});

// start the server, and say so in the server console
app.listen(3000, () => console.log('Listening for requests on port 3000'))
