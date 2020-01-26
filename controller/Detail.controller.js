sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "mycompany/myapp/MyWorklistApp/model/formatter"
  ],
  function(BaseController, JSONModel, History, formatter) {
    "use strict";
    
    //=========Class Variables=======================
    let taskIndex;



    return BaseController.extend(
      "mycompany.myapp.MyWorklistApp.controller.Detail",
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

          this.getRouter()
            .getRoute("tasks")
            .attachPatternMatched(this._onObjectMatched, this);




        },
        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        onCloseDetailPress: function(oEvent) {
          this.getModel("appView").setProperty("/layout/column", "OneColumn");
          this.getRouter().navTo("worklist");
        },

        toggleDetailFullScreen: function(oEvent) {
          //get model entry an switch the value (boolean)
          let bColumnFullScreen = this.getModel("appView").getProperty(
            "/layout/actionButtonsInfo/midColumn/fullScreen"
          );
          this.getModel("appView").setProperty(
            "/layout/actionButtonsInfo/midColumn/fullScreen",
            !bColumnFullScreen
          );
          //set the mid column (detailview) to either fullscreen oder midColumn
          if (!bColumnFullScreen) {
            this.getModel("appView").setProperty(
              "/layout/column",
              "MidColumnFullScreen"
            );
          } else {
            this.getModel("appView").setProperty(
              "/layout/column",
              "TwoColumnsMidExpanded"
            );
          }
        },

        toggleEditMode: function(oEvent) {
          //switch between the readable and the editable form
          let bEditMode = this.getModel("appView").getProperty(
            "/layout/editForm/editable"
          );
          //Toggle edit mode
          this.getModel("appView").setProperty(
            "/layout/editForm/editable",
            !bEditMode
          );
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Binds the view to the object path.
         * @function
         * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
         * @private
         */
        _onObjectMatched: function(oEvent) {
          //get the TaskID out of the url and find the corresponding index towards it
          let index = this._getIndex(this.getModel("DataModel").getProperty("/tasks"), oEvent.getParameter("arguments").TaskID);
          
          this._bindView("/tasks/" + index);

          //let the class variable know the index of the main array
          taskIndex= index;   
          
          
        },
        /**
         * Binds the view to the object path.
         * @function
         * @param {string} sObjectPath path to the object to be bound
         * @private
         */
        _bindView: function(sObjectPath) {
          this.getView().bindElement({
            path: sObjectPath,
            model: "DataModel"
          });
        },

        _getIndex: function(aTasks, iID){
          //Get the the ID of the task and iterate over the array (JSON Model) to find the correct index of the task
          //aTasks = this.getModel("DataModel").getProperty("/tasks");
          let result;
          for (var i = 0; i < aTasks.length; i++) {
            if (iID == aTasks[i].id) {
              result = i;
              break;
            }
          }
          return result;
        },


        addTask: function(oEvent){
          //use the third column to navigate to the addTask screen
          let oSelectedTask = oEvent.getSource().getBindingContext("DataModel");
          this.getRouter().navTo("addTask", {TaskID: oSelectedTask.getProperty("id")});

          this.getModel("appView").setProperty("/layout/column", "ThreeColumnsEndExpanded");
        },



        /*=================================
          Manipulate Data
        =================================*/

        
        deleteTask: function(oEvent){
          let detailsArray, deleteIndex, detailsID;

          //use the class Variable taskIndex to get the corresponding array within the specific object
          detailsArray = this.getModel("DataModel").getProperty("/tasks/" + taskIndex + "/details");
          detailsID = oEvent.getSource().getBindingContext("DataModel").getObject().id;
          //detect the index, which will be deleted
          deleteIndex = this._getIndex(detailsArray, detailsID);
          
          var oContext = oEvent.getSource().getBindingContext("DataModel");
          var oModel = oContext.getModel("DataModel");
          var sPath = "/tasks/" + taskIndex + "/details";
          var aDetails = oModel.getProperty(sPath);



          //delete one entry at the index 'deleteIndex'
          aDetails.splice(deleteIndex,1);
          //update the model and then store the data in the localstorage
          oModel.setProperty(sPath, aDetails);
          this.saveToLocalStorage(oModel);        

        },

        saveEdit: function(oEvent){
          this.toggleEditMode();
          //get the worklist object
          let oContext = oEvent.getSource().getBindingContext("DataModel");
          let oModel = oContext.getModel("DataModel");
          let sPath = "/tasks/" + taskIndex + "/details";
          let aDetails = oModel.getProperty(sPath);

          //update the model and save it to the local storage
          oModel.setProperty(sPath, aDetails);
          this.saveToLocalStorage(oModel);

        },


        sortStatusDone: function (oEvent){

        }

      }
    );
  }
);
