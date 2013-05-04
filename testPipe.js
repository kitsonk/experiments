define([
	'intern!bench',
	'heya-pipe/Pipe',
	'heya-pipe/loopers/array'
], function (bench, Pipe, array) {
	var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	function manual(data){
		var accumulator = 0;
		for(var i = 0, n = data.length; i < n; ++i){
			var value = data[i];
			if(value % 2){
				accumulator += value * value;
			}
		}
		return accumulator;
	}

	var pipe = array(new Pipe().
		filter('value % 2').
		map('value *= value;').
		fold('accumulator += value;', 0)
	).compile();

	function filter(value) {
		return value %2;
	}

	function map(value) {
		return value * value;
	}

	function reduce(accumulator, value) {
		return accumulator + value;
	}

	bench.baseline('pipe with loopers baseline', function () {
		bench.test('filter/map/reduce', function () {
			pipe(data);
		});
	});

	bench.benchmark('filter/map/reduce performance', function () {
		bench.test('manual', function () {
			manual(data);
		});
		bench.test('pipe', function () {
			pipe(data);
		});
		bench.test('extra', function () {
			data.
				filter(function(value){ return value % 2; }).
				map(function(value){ return value * value; }).
				reduce(function(accumulator, value){ return accumulator + value; }, 0);
		});
		bench.test('non-function loops', function () {
			data.filter(filter).map(map).reduce(reduce, 0);
		});
	});
});