// Dojo Node.js Bootstrap

dojoConfig = {
	async: true,
	baseUrl: "../../Documents/dtk/",
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
		name: "experiments",
		location: "../../github/experiments/lib/experiments"
	}],
	deps: [process.argv[2]]
};

require("../../Documents/dtk/dojo/dojo.js");
