require([
	"dojo/node!util",
	"dojo/node!fs",
	"experiments/walk"
], function(util, fs, walk){
	var refMatch = /:ref:`([^`<]*)<([^#>`]*)#([^#>`]*)>`/ig,
		match,
		links = [],
		obj = {},
		writeFlag = false;
	walk("/Users/kitsonk/github/dojo-docs").then(function(results){
		results.forEach(function(file){
			if(file.match(/\.rst$/i)){
				try{
					buf = fs.readFileSync(file, "utf8");
					while(match = refMatch.exec(buf)){
						var link = "`" + match[1] + "<" + match[2] + ">`_";
						buf = buf.replace(match[0], link);
						links.push(file);
						writeFlag = true;
						if(!(match[2] in obj)){
							obj[match[2]] = [];
						}
						if(obj[match[2]].indexOf(match[3]) < 0){
							obj[match[2]].push(match[3]);
						}
					}
					/*
					if(writeFlag){
						console.log("Writing:", file.replace("/Users/kitsonk/github/dojo-docs/", ""));
						fs.writeFileSync(file, buf, "utf8");
						writeFlag = false;
					}
					*/
				}catch(e){
					console.log(e);
				}
			}
		});
		console.log(obj);
	}, function(err){
		throw err;
	});
});