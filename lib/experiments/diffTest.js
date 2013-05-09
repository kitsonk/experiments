define([
	'hokan/util/diff',
	'hokan/util/patch'
], function (diff, patch) {

	console.log(diff([1, 2, 3], [4, 2, 1]));
	var d1 = diff([{ foo: 'bat' }, { bar: 9 }, { qat: 4 }], [{ foo: 'bar'}, { bar: 9 }]);
	console.log(d1);

	console.log(patch(undefined, d1));
});