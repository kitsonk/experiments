var profile = (function(){
	return {
		releaseDir: "../dojo-release",
		releaseName: "build",
		basePath: "../../Documents/dtk",
		action: "release",
		mini: true,
		selectorEngine: "acme",

		aliases: [
			["i18n", "dojo/i18n"]
		],

		packages:[{
			name: "dojo",
			location: "dojo"
		},{
			name: "dijit",
			location: "dijit"
		},{
			name: "dojox",
			location: "dojox"
		}],
		
		layers: {
			"dojo/dojo": {
				include: [ "dojo/dojo", "i18n" ],
				customBase: true,
				boot: true
			}
		},
		
		resourceTags: {
			amd: function(filename, mid){
				return /\.js$/.test(filename);
			}
		}
	};
})();
