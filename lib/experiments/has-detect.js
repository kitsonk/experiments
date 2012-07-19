require([
	"dojo/node!fs",
	"experiments/walk"
], function(fs, walk){
	var hasMatch = /has.add\(["']([^"']*)["']/g,
		match;
	walk("/Users/kitsonk/Documents/dtk").then(function(results){
		results.forEach(function(file){
			if(file.match(/\.js$/i)){
				try{
					buf = fs.readFileSync(file, "utf8");
				}catch(e){
					console.error(e);
				}
				while(match = hasMatch.exec(buf)){
					console.log(file.replace("/Users/kitsonk/Documents/dtk/", ""), match[1]);
				}
			}
		});
	});
});