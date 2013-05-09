define([
	'd2-proto/dom',
	'd2-proto/has'
], function (dom, has) {
	// var node = dom.put('div');
	// console.log(dom.put('div[data-dojo-type=test/mid]', {
	// 	innerHTML: 'test'
	// }).toString());
	// function domElementMatches() {
	// 	var matchesFunctionName = 'matches' in Element || false;
	// 	['moz', 'webkit', 'ms', 'o'].some(function (vendorPrefix) {
	// 		return vendorPrefix + 'MatchesSelector' in Element ? matchesFunctionName = vendorPrefix + 'MatchesSelector'
	// 			: false;
	// 	});
	// 	return matchesFunctionName;
	// }

	// console.log(domElementMatches());
	console.log(has('dom-element-matches'));
});