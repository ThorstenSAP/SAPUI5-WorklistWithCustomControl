sap.ui.define([
    'sap/ui/core/Control',
    "sap/m/Label",
    "sap/m/CheckBox",
    "sap/m/Input",
    "sap/m/DateTimePicker",
    "sap/m/Button"

    ],
    function(Control, Label, CheckBox, Input, DateTimePicker, Button) {
        "use strict"
        return Control.extend("mycompany.myapp.MyWorklistApp.containers.ShadowBox", {
            metadata:{
                properties: {
                    selected: {type: "Boolean"},
                    text: {type: "String"},
                    date: {type: "Date"}
                },
                aggregations: {
                    _checkbox: {type: "sap.m.CheckBox", multiple: false, visibility: "hidden"},
                    _input: {type: "sap.m.Input", multiple: false, visibility: "hidden"},
                    _dueDate: {type: "sap.m.DateTimePicker", multiple: false, visibility: "hidden"},
                    // _deleteTask: {type: "sap.m.Button", multiple: false, visibility: "hidden"}
                },
                events: {}
            },

            init: function() {
                //intantiate the controls and store them in an internal aggregation
                this.setAggregation("_checkbox", new CheckBox({select: function(oEvent){
                    this.setSelected(oEvent.getParameter("selected"));
                }.bind(this)}));
                
                this.setAggregation("_input", new Input({ enabled: true, change: function(oEvent) {
                    this.setText(oEvent.getParameter("value"));
                }.bind(this)
                }));
                
                this.setAggregation("_dueDate", new DateTimePicker({change: function(oEvent){
                    this.setDate(oEvent.getParameter("value")); //check the inspector to find the correct param
                }.bind(this)}));

                // this.setAggregation("_deleteTask" , new Button({enabled: true, press: this.}))
                // console.log(Detail.taskIndex);
            },

            /* =========================================================== */
            /* Getter / Setter methodes
            /* ->ensure that the values and the custom Control data are synced*/
            /* =========================================================== */

            setSelected: function(bSelected){
                this.getAggregation("_checkbox").setSelected(bSelected);
                
                //if checkbox is selected strike and disable the input field
                if (this.getAggregation("_checkbox").getProperty("selected")){
                    this.getAggregation("_input").addStyleClass("Strikethrough");
                } else {
                    this.getAggregation("_input").removeStyleClass("Strikethrough");
                }
                return this.setProperty("selected", bSelected, true);
            },
            setText: function(sText) {
                this.getAggregation("_input").setValue(sText);
                return this.setProperty("text", sText, true); //true that the view rerenders itself
            },
            setDate: function(dDate){
                this.getAggregation("_dueDate").setValue(dDate);
                //check if the Date is behind the current date and change the Style
                if (this._dueDateValidation(this.getAggregation("_dueDate").getDateValue())){
                    this.getAggregation("_dueDate").removeStyleClass("LateAssignment");
                } else {
                    this.getAggregation("_dueDate").addStyleClass("LateAssignment");
                }

                return this.setProperty("date", dDate, true);
            },

            /* =========================================================== */
            /* Custom Control specific methods                             */
            /* =========================================================== */

            renderer: function (oRM, oControl){
                //render the control
                oRM.write("<div");

                //add the tsyle to the box
                oRM.addClass("ShadowBox");
                oRM.writeClasses();

                //render the control information, this handles your sId (you must do this for your control to be properly tracked by ui5)
                oRM.writeControlData(oControl);
                oRM.write(">");

                //next, iterate over the content aggregation, and call the renderer for each control
                // debugger;
                // var aContent = oControl.getContent();
                // aContent.forEach(function(element) {
                //     oRM.renderControl(element);
                // });

                oRM.renderControl(oControl.getAggregation("_label"));
                oRM.renderControl(oControl.getAggregation("_checkbox"));
                oRM.renderControl(oControl.getAggregation("_input"));
                oRM.renderControl(oControl.getAggregation("_dueDate"));
                
                oRM.write("</div>");


            },
            onAfterRendering: function() {
                if (sap.ui.core.Control.prototype.onAfterRendering)
                    sap.ui.core.Control.prototype.onAfterRendering.apply(this,arguments);
            },

            /* =========================================================== */
            /* validate functions                                              */
            /* =========================================================== */            
            _dueDateValidation: function (dDueDate){
                //due Date will be in specific time zone
                var currentDate = new Date();
                var dueDate =  dDueDate
                if(dueDate != undefined){
                    if (dueDate.getUTCFullYear() == currentDate.getUTCFullYear()){
                        //month as a number from 0-11
                        if (dueDate.getUTCMonth() == currentDate.getUTCMonth()){
                            if (dueDate.getUTCDate() >= currentDate.getUTCDate()) {
                                return true;
                                // this.getAggregation("_dueDate").removeStyleClass("LateAssignment");
                            } else {
                                //task is late
                                return false;
                                // this.getAggregation("_dueDate").addStyleClass("LateAssignment");
                            }
                        //month as a number from 0-11
                        } else if (dueDate.getUTCMonth() >= currentDate.getUTCMonth()){
                            return true;
                        } else {
                            return false;
                        }
                    } else if (dueDate.getUTCFullYear() > currentDate.getUTCFullYear()){
                        return true;
                    } else {
                        return false;
                    }
                } else{
                    return true;
                }
            },
        });
    }

);