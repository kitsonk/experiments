require([
	"experiments/walk",
	"dojo/string"
], function(walk, string){
	var legacyMatch = /dojo\.require\(/im,
		match,
		u = {},
		packages = [],
		mids = [];

	walk("/Users/kitsonk/Documents/dtk/dojox").then(function(results){
		results.forEach(function(file){
			if(file.match(/\.js$/i) && !file.match(/\/nls\//) && !file.match(/\/tests\//)){
				mids.push(file.replace("/Users/kitsonk/Documents/dtk/", "").replace(/\.js$/i, ""));
				var pathmatch = file.replace("/Users/kitsonk/Documents/dtk/", "").match(/^(.*)\/([^\/]+)$/);
				if(!u[pathmatch[1]]){
					packages.push(pathmatch[1]);
					u[pathmatch[1]] = true;
				}
			}
		});
		packages = packages.sort(function(a, b){
			a = a.toLowerCase();
			b = b.toLowerCase();
			return a < b ? -1 : a > b ? 1 : 0;
		});
		var longest = packages.reduce(function(a, b){
			return a.length > b.length ? a : b;
		});
		longest = ":ref:`" + longest + " <" + longest + ">`";
		var header = string.pad("", longest.length, "=") + " ============ ============================================";
		var titles = string.pad("Package/Module", longest.length, " ", true) + " Status       Description";
		//console.log(header);
		//console.log(titles);
		//console.log(header);
		packages.forEach(function(pack){
			pack = ":ref:`" + pack + " <" + pack + ">`";
			pack = string.pad(pack, longest.length, " ", true) + " Maintained   [desc]";
			//console.log(pack);
		});
		//console.log(header);
		console.log(packages.length);
		console.log(mids.length);
	});
});