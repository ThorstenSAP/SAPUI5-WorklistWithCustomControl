sap.ui.define([
	"./BaseController",
	"mycompany/myapp/MyWorklistApp/model/formatter"
], function (BaseController, formatter,) {
	"use strict";

	return BaseController.extend("mycompany.myapp.MyWorklistApp.controller.Worklist", {

		formatter: formatter,

		onInit : function () {
			this.getRouter().getRoute("worklist").attachPatternMatched(this._onMasterMatched, this);
			this.getRouter().attachBypassed(this.onBypassed, this);

		},


		_onMasterMatched :  function() {
			//Set the layout property of the FCL control to 'OneColumn'
			this.getModel("appView").setProperty("/layout/column", "OneColumn");
		},


		onListItemPress: function(oEvent) {
			//get the corresponding id of the object and navigate towards it
			var oSelectedTask = oEvent.getSource().getBindingContext("DataModel");
			this.getRouter().navTo("tasks", {TaskID: oSelectedTask.getProperty("id")});
			//change the column layout
			this.getModel("appView").setProperty("/layout/column", "TwoColumnsMidExpanded");
		}

	});

});