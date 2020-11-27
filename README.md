# BTreeFrontend - Angular application

## Installation
To make this project work, you also need the b-tree-backend provided in this [link to the backend!](https://github.com/julian-stein/b-tree-backend)

## Function Description Frontend
This frontend provides a basic HTML/CSS UI for editing the B-Tree provided in the backend.
It works as an angular application communicating over http-RPCs with the backend.

### Description of the UI
The UI contains basic HTML-buttons and input-fields to add/delete elements from the tree.
This can be done either by providing a comma-seperated list in the input field,
by adding them randomly with providing min, max and number of values, or by reading a 
CSV-File, containing comma-seperated values.
These values all must be integers and larger than 0.

### Description of the tree visualisation.
The visualisation of the b-tree is a HTML-canvas, with size calculated on the trees metrics.
It contains rectangles and lines representing the nodes and edges of the tree.
It gets created, everytime a new tree is loaded as the current-tree and gets drawn
by iterating over the level-ordered node elements.


![Level-ordered tree](https://upload.wikimedia.org/wikipedia/commons/d/d1/Sorted_binary_tree_breadth-first_traversal.svg)

It has to be noticed that if the user adds/removes more than one element at once,
the endpoints will return a list of trees and the user has to manually iterate over them,
via clicking the 'Next step' button, which will cause the frontend-logic to use the next 
tree of the array as current tree and to draw it.

### Description of the RPCs
The RPC communication bases on plain http-calls. The backend endpoints consume and return specific data,
as defined in the API-definition below.

/api (POST)
consumes: [int] (the positive integers representing the new elements to be added)
returns: [JSON] (an array that represents of the steps of adding the new elements)

/api (DELETE)
consumes: [int] (the positive integers representing the  elements to be removed)
returns: [JSON] (an array that represents the steps of removing the elements)

/api/search (POST)
consumes: int (the element to search after)
returns: {"Highlighted": UUID, "Costs": int} (json-object representing the highlighted node (where the element is) and the costs of searching the element)

/api/random (POST)
consumes: [int] (min, number, max: integers representing the metrics for adding new random elements)
returns: [JSON] (an array that represents the steps of removing the elements)

/api/changeOrder (POST)
consumes: int
returns: [JSON] (an array that represents the steps of removing the elements)
