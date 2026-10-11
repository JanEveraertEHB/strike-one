# Strike one!

## Description
A platform to pool and distribute footage and images during manifestations and strikes

## Development
run the development server by running `npm run dev`.


## Todo:
* Add express CORS
* Allow the user to enter a URL (to the post/youtube video/gdrive item), and to select a name and date of the manifestation. 
  * Add the html elements (2 textinputs and a date input).
  * Add the POST endpoint.
  * Currently, store the items in an array (items).
  * Make a class for the item (called "footage")
* Display the array of items, sorted by the date
  * add a get endpoint
  * handle the endpoint in the frontend
  * implement a class to store the items in a structured way
* group the items by name of the manifestation
* Display the actual item
  * use subclasses to display different types
  * Use class functions to return html based on the type of item
 
Extra:
* Allow visitors to up- or downvote a picture, like on reddit.
  

## License
MIT
