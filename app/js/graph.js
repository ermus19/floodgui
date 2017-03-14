const Config = require('electron-config');
var config = new Config();

console.log(config.path);
console.log(config.get('firstInit'));
var nodes = new vis.DataSet([{
  id: 1,
  label: 'Node 1'
}, {
  id: 2,
  label: 'Node 2'
}]);

// create an array with edges
var edges = new vis.DataSet([{
  from: 1,
  to: 2
}]);

// create a network
var container = document.getElementById('mynetwork');
var data = {
  nodes: nodes,
  edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);
