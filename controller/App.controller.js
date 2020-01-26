sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("mycompany.myapp.MyWorklistApp.controller.App", {

		onInit : function () {
			var Data, tasks, oLocalStorage;
			//instantiate the JSON model
			var appView = new JSONModel({
				"layout":{
					"column" :"OneColumn",
					"actionButtonsInfo" : {
						"midColumn" :{
							"fullScreen" : false
						}
					},
					"editForm": {
						"editable" : false
					}
				}
			});
			//make appView available in the app
			this.getView().setModel(appView, "appView");			



			
			//create an empty JSON model and the object for the data storage (tasks)
			Data = new JSONModel();
			tasks = {
				"tasks": [
					{
						"id" : "a1ebd01a-0ecf-4a06-8d11-f791142d6000",
						"name": "work",
						"details": [{
							"id" : "a1ebd01a-0ecf-4a06-8d11-f791142d6100",
							"Done": false,
							"Description": "Get to know UI5",
							"DueDate": "2019-12-31, 00:00"
						},
						{
							"id": "a1ebd01a-0ecf-4a06-8d11-f791142d6101",
							"Done": true,
							"Description": "meet colleagues",
							"DueDate": "2019-11-30, 00:00"
						},
						{
							"id": "a1ebd01a-0ecf-4a06-8d11-f791142d6102",
							"Done": true,
							"Description": "Learn mac",
							"DueDate": "2019-11-22, 00:00"
						}]
					},
					{
						"id": "a1ebd01a-0ecf-4a06-8d11-f791142d6001",
						"name": "living",
						"details": [{
							"id" : "a1ebd01a-0ecf-4a06-8d11-f791142d6200",
							"Done": false,
							"Description": "Find a shared flat",
							"DueDate": "2019-11-30, 00:00"
						}]
					},
					{
						"id": "a1ebd01a-0ecf-4a06-8d11-f791142d6002",
						"name": "style",
						"details": [{
							"id": "a1ebd01a-0ecf-4a06-8d11-f791142d6300",
							"Done": true,
							"Description": "Style up",
							"DueDate": "2019-11-30, 00:00"
						}]
					}
				]
			};
			//set model
			this.getView().setModel(Data, "DataModel");


			//Get local storage object
			oLocalStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

			//check if the app is tested in chrome or firefox and set the stored data in regards to the browser
			if(!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)){
				//Get data from Storage if available
				if(oLocalStorage.get("tasks")) {
					//get and parse the data of the local storage and set it into the model
					Data.setProperty("/tasks", JSON.parse(oLocalStorage.get("tasks")));
				} else {
					//otherwise set the initial data into the local storage and then load the data into the model Data
					oLocalStorage.put("tasks", JSON.stringify(tasks));
					Data.setProperty("/tasks", tasks);

				}
			} else if (typeof InstallTrigger !== 'undefined') {
				//Get data from Storage if available
				if(oLocalStorage.get("tasks")) {
					//get and parse the data of the local storage and set it into the model
					Data.setProperty("/", JSON.parse(oLocalStorage.get("tasks")));
				} else {
					//otherwise set the initial data into the local storage and then load the data into the model Data
					oLocalStorage.put("tasks", JSON.stringify(tasks));
					Data.setProperty("/", tasks);

				}
			}
			
			
		}

	});

});