sap.ui.define(
    [
      "./BaseController",
      "mycompany/myapp/MyWorklistApp/model/formatter"
    ],
    function(BaseController, formatter) {
      "use strict";
  
      return BaseController.extend(
        "mycompany.myapp.MyWorklistApp.controller.AddTask",
        {
          formatter: formatter,
  
          /* =========================================================== */
          /* lifecycle methods                                           */
          /* =========================================================== */
  
          /**
           * Called when the worklist controller is instantiated.
           * @public
           */
          onInit: function() {
        /*=================================
        wenn ich den aufruf vom BaseController.onInit (nächste Zeile) erlaube -> lädt er die View nicht mehr
        Warum, Wieso, Weshalb???
        =================================*/
            //BaseController.prototype.onInit.apply(this, arguments);
  
            this.getRouter().getRoute("addTask").attachPatternMatched(this._onRouteMatched, this);
  
          },
          _onRouteMatched : function (oEvent) {
            let oArgs = this._getIndex(oEvent.getParameter("arguments").TaskID);
			      this.getView().bindElement({
                path : "/tasks/" + oArgs + "/details",
                model: "DataModel"
			});
        },
        
        _getIndex: function(iID){
            //Get the the ID of the task and iterate over the array (JSON Model) to find the correct index of the task
            let tasks = this.getModel("DataModel").getProperty("/tasks");
            let result;
            for (let i = 0; i < tasks.length; i++) {
              if (iID == tasks[i].id) {
                result = i;
                break;
              }
            }
            return result;
          },

          _uuidv4: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          },


        saveAddTask: function(oEvent){
          //create new ID
            let newID = this._uuidv4();
            //create JSON object
            let task = {
                "id": newID,
                "Done": false,
                "Description": this.getView().byId("taskDescription").getValue(),
                "DueDate": this.getView().byId("taskDueDate").getValue()
            };
            //get the model as well as the specific array
            let oContext = oEvent.getSource().getBindingContext("DataModel");
            let oModel = oContext.getModel();
            let sPath = oContext.getPath();
            let aDetails = oModel.getProperty(sPath);
            
            //update the array set the model
            aDetails.push(task);
            oModel.setProperty(sPath, aDetails);

            //update the localStorage
            this.saveToLocalStorage(oModel);

            //change the columnLayout
            this.getModel("appView").setProperty("/layout/column", "TwoColumnsMidExpanded");

            //clear input fields
            this.getView().byId("taskDescription").setValue();
            this.getView().byId("taskDueDate").setValue()
          },

          cancelAddTask: function(oEvent){
              //close third column
            this.getModel("appView").setProperty("/layout/column", "TwoColumnsMidExpanded");
            //clear input fields
            this.getView().byId("taskDescription").setValue();
            this.getView().byId("taskDueDate").setValue()
          }
  
  
  
          
        }
      );
    }
  );
  