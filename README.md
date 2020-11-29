# BTreeFrontend - Angular application

## Installation
To make this project work, you also need the b-tree-backend provided in this [link to the backend!](https://github.com/julian-stein/b-tree-backend)
The application is meant to be used locally, which is why the connection only works via localhost and if the to containers are running on the same machine.

First of all, you have to install a local [Docker environment](https://www.docker.com/get-started) to your machine, if you have none installed already.

Next, there are two ways to install the Docker containers.

1. You can create a directory on your machine called 'b-tree', and create a file called 'docker-compose.yml'. 
Into this docker compose file you have to paste the script below and save it.
```
version: '3.8'
 
services:
  b-tree-backend:
    image: steinju/b-tree-backend:latest
    container_name: b-tree-backend-container
    ports:
      - 8080:8080

  b-tree-frontend:
    image: eliasmueller/b-tree-frontend:latest
    container_name: b-tree-frontend-container
    ports: 
      - 4200:80
    depends_on:
      - b-tree-backend
      
```
Out of the newly created dir 'b-tree' run the following docker command:
```
docker-compose up
```

2. You can also run the two commands and fetch and run the Docker repositories yourself:
```
docker run -d -p 4200:80 --name b-tree-frontend-app-container eliasmueller/b-tree-frontend:latest
docker run -d -p 8080:8080 --name b-tree-backend-app-container steinju/b-tree-backend:latest

```
After running them, open a browser page at **localhost:4200** to open the 

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
The visualisation of the b-tree is a HTML-canvas, with size calculated on the tree's metrics.
It contains rectangles and lines representing the nodes and edges of the tree.
It gets created everytime a new tree is loaded as the current-tree and gets drawn
by iterating over the level-ordered node elements.


![Level-ordered tree](https://upload.wikimedia.org/wikipedia/commons/d/d1/Sorted_binary_tree_breadth-first_traversal.svg)

It has to be noticed that if the user adds/removes more than one element at once,
the endpoints will return a list of trees and the user has to manually iterate over them,
via clicking the 'Next step' button, which will cause the frontend-logic to use the next 
tree of the array as current tree and to draw it.

### Description of the RPCs
The RPC communication bases on plain http-calls. The backend endpoints consume and return specific data,
as defined in the API-definition below.

Insert new elements.
/api (POST)
consumes: [int] (the positive integers representing the new elements to be added)
returns: [JSON] (an array that represents of the steps of adding the new elements)

Remove elements.
/api (DELETE)
consumes: [int] (the positive integers representing the  elements to be removed)
returns: [JSON] (an array that represents the steps of removing the elements)

Search for element.
/api/search (POST)
consumes: int (the element to search after)
returns: {"Highlighted": UUID, "Costs": int} (json-object representing the highlighted node (where the element is) and the costs of searching the element)

Add random elements.
/api/random (POST)
consumes: [int] (min, number, max: integers representing the metrics for adding new random elements)
returns: [JSON] (an array that represents the steps of removing the elements)

Change order of the tree.
/api/changeOrder (POST)
consumes: int
returns: [JSON] (an array that represents the new tree with changed order)

Reset the tree in the backend.
/api/reset (POST)
consumes: void
returns: void
