require([
	"dojo/node!util",
	"dojo/node!fs",
	"experiments/walk"
], function(util, fs, walk){
	walk("/Users/kitsonk/github/dojo-docs").then(function(results){
		results.forEach(function(file){
			if(file.match(/\.rst$/i)){
				try{
					buf = fs.readFileSync(file, "utf8");
					var apiDirective = buf.match(/\.\.\s+api-(inline|link)\s+::((?!(\n){2})[\s\S])*/i);
					if(apiDirective){
						console.log(file);
					}
				}catch(e){
					console.log(e);
				}
			}
		});
	}, function(err){
		throw err;
	});
});