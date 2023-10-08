# SoftUni-Cubicle-2023
SoftUni Workshop Project

Create src folder and create index.js file; adjust package json to read from there
Create views folder within src and copy all view resources
Initialize configuration for express and handlebars in index.js
Create layouts folder within views folder and create main.hbs, write {{{body}}} which will render the current view from the index.hbs
Cut common code from all views and paste within main.hbs above and below {{{body}}} - views should remain with 'main' section only
Create folder public within src and move the css + images folder from the resources; make configuration in index.js for such static data; 
Option:Check the hrefs from main.hbs if routes to css+images is correct
Option:Require path library and fix the route to css+images
Application should have its initial configuration
----------
Create config folder and move relevant code from index.js
-----
Create controllers folder - modular routing is preferred
---
Go to create.hbs and adjust the html to have: method = POST; action = '/cubes/create' in order to redirect to relevant  page after form is completed; if action is empty it will have default behaviour - it will return the form to where it was generated. req.body will contain the form data which must be preserved - temporary (in array or object) or db. This should be decided by service/manager functionality who will manage the data upon arrival.
Create folder managers and relevant cubeManager file - it should have method to preserve cubes and method to get cubes
----
Render dynamically created cubes: open index.hbs and delete all default cubes, but one. It will be a template which will show every cube generated mannually through the form  {{#each cubes}}
    some html code with dynamic data
  {{else}}
  <p>There are no cubes yet!</p>
  {{/each}}
----
partials (view folder) is created in case the view is going to be reused, for example cube.hbs or a card of something. We get the html code from index.hbs and put in the cube.hbs. Replace the cut zone with {{>cube}}. In partials/cube.hbs change the href to dynamic content using cube id
Go to details.hbs and make dynamic changes
2:47:47 - describe the details logic
----
req.params - parameters
req.body - post data from the form sent and parsed
req.query - query string in the browser
----
DB session
npm i mongoose




