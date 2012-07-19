define([
	"dojo/node!fs",
	"dojo/Deferred"
],function(fs, Deferred){
	var walk = function(dir){
		var results = [],
			d = new Deferred();
		fs.readdir(dir, function(err, list){
			if(err) return d.reject(err);
			var pending = list.length;
			if(!pending) return d.resolve(results);
			list.forEach(function(file){
				file = dir + "/" + file;
				fs.stat(file, function(err, stat){
					if(stat && stat.isDirectory()){
						walk(file).then(function(res){
							results = results.concat(res);
							if(!--pending) d.resolve(results);
						});
					}else{
						results.push(file);
						if(!--pending) d.resolve(results);
					}
				});
			});
		});

		return d.promise;
	};

	return walk;
});