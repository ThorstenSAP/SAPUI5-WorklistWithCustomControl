## Worklist with custom Control (under construction)
- A simple worklist sample based on the master-detail template.
    - The tasks will be stored in the local storage of the webbrowser (tested in Chrome and Firefox). By initial loading a          local JSONModel with sample data will be written to the local storage.
    - Every change will only be saved to the local storage if the save button on the ToDo-List (TwoColumnLayout) is clicked.
    - The custom control has the following functionalaties. 
        - It checks if the due date of a task is in the past or in the future and will mark the field if the due date is in the past.
        - Also it will check if a task is solved or not and add the corresponding styles. 
        
## Construction zone
- By refreshing the application it may happen that the app wants to use a deep linking (which is not yet implemented) -> in this case just delete the locale storage and restart the app

