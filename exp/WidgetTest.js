define([
	"require",
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./resources/WidgetTest.html",
	"./Button"
], function(require, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template){

	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: '<div><button type="button" data-dojo-type="./Button">Test</button></div>',
		contextRequire: require
	});

});