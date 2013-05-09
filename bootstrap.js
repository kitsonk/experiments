// Dojo Node.js Bootstrap

dojoConfig = {
	async: true,
	baseUrl: "../",
	packages: [{
		name: "dojo",
		location: "dojo"
	},{
		name: "dijit",
		location: "dijit"
	},{
		name: "dojox",
		location: "dojox"
	},{
		name: "hokan",
		location: "hokan"
	}, {
		name: 'd2-proto',
		location: 'd2-proto'
	},{
		name: "experiments",
		location: "./experiments/lib/experiments"
	}],
	deps: [process.argv[2]]
};

require("../dojo/dojo.js");
