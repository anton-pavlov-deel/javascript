'use strict';
function Graph() {
	var it = this;	
	
	/// Graph nodes
	this.nodes = new Map();
	
	/// Graph edges
	this.edges = new Map();
	
	/// Add new node to graph with name 'name'
	this.addNode = function(name) {
		it.nodes[name] = [];
	}
	
	/// Add new edge to graph from node 'from' to node 'to' with weight equal 'weight'
	this.addEdge = function(from, to, weight) {
		it.edges[[from, to]] = weight;
		it.nodes[from].push(to);
		it.nodes[to].push(from);
	}

	/// Graph initialization. Input example: [[0, 3, 0], [1, 3, 0], [2, 3, 0], [4, 3, 0], [5, 4, 0]] - [( edge )[( node )from, ( node )to, ( weight )weight], ... ]
	this.init = function(edgeList) {
		// Nodes initialization
		for (var edge of edgeList) {
			it.addNode(edge[0]);
			it.addNode(edge[1]);
		}
		// Edges initialization
		for (var edge of edgeList) {
			it.addEdge(edge[0], edge[1], edge[2]);
		}
	}

	/// Depth first search. Starts from 'start' node and call 'cb' function for each node.
	this.DFS = function(start, cb, ignore) {
		if (ignore == undefined) ignore = [];
		ignore.push(start);
		cb(start);
		for (var node of it.nodes[start]) {
			if (ignore.indexOf(node) == -1) it.DFS(node, cb, ignore);
		}
	}

	/// Breadth first search.
	this.BFS = function(start, cb, ignore, plan) {
		if (ignore == undefined) ignore = [];
		if (plan == undefined) plan = [start];
		var current = [];

		for (var node of plan) {
			cb(node);
			ignore.push(node)
			for (var i of it.nodes[node]) if (ignore.indexOf(i) == -1) current.push(i);
		}
		if (plan.length) it.BFS(start, cb, ignore, current);
	}
}

var graph = new Graph();
graph.init([[0, 1, 0], [0, 2, 0], [1, 3, 0], [1, 4, 0], [2, 5, 0], [2, 6, 0]]);
console.log(graph);
console.log("<---BFS--->")
graph.BFS(0, console.log);
console.log("<---DFS--->")
graph.DFS(0, console.log);
