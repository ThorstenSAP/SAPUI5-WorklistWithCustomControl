sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"mycompany/myapp/MyWorklistApp/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
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
		},




		




		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Triggered by the table's 'updateFinished' event: after new table
		 * data is available, this handler method updates the table counter.
		 * This should only happen if the update was successful, which is
		 * why this handler is attached to 'updateFinished' and not to the
		 * table's list binding's 'dataReceived' method.
		 * @param {sap.ui.base.Event} oEvent the update finished event
		 * @public
		 */
		onUpdateFinished : function (oEvent) {
			// update the worklist's object counter after the table update
			var sTitle,
				oTable = oEvent.getSource(),
				iTotalItems = oEvent.getParameter("total");
			// only update the counter if the length is final and
			// the table is not empty
			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
			} else {
				sTitle = this.getResourceBundle().getText("worklistTableTitle");
			}
			this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
		},

		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh : function () {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
		},

		onPressButton: function(oEvent) {
			return oEvent;
		},

		onButtonPressed: function(oEvent) {
			this.getRouter().navTo("NotFound");
		}

	});

});