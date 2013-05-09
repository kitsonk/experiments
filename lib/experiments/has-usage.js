require([
	"dojo/node!fs",
	"experiments/walk"
], function(fs, walk){
	var hasMatch = /has.add\(["']([^"']*)["'],/g,
		hasUsageMatch = /has\(["']([^"']*)["']\)/g,
		match,
		hasAdd = {},
		hasUsage = {};
	walk("/Users/kitsonk/Documents/dtk").then(function(results){
		results.forEach(function(file){
			if(file.match(/\.js$/i)){
				try{
					buf = fs.readFileSync(file, "utf8");
				}catch(e){
					console.error(e);
				}
				while(match = hasMatch.exec(buf)){
					if(!(match[1] in hasAdd)){
						hasAdd[match[1]] = [];
					}
					hasAdd[match[1]].push({
						file: file.replace("/Users/kitsonk/Documents/dtk/", ""),
						index: match.index
					});
				}
				while(match = hasUsageMatch.exec(buf)){
					if(!(match[1] in hasUsage)){
						hasUsage[match[1]] = [];
					}
					hasUsage[match[1]].push({
						file: file.replace("/Users/kitsonk/Documents/dtk/", ""),
						index: match.index
					});
				}
			}
		});
		for(var feature in hasUsage){
			if(!(feature in hasAdd)){
				console.log(feature, hasUsage[feature]);
			}
		}
	});
});