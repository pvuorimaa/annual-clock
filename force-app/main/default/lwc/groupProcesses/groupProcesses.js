import { LightningElement, api, track, wire } from 'lwc';
import getGroupProcesses from '@salesforce/apex/Test.getGroupProcesses';

export default class GroupProcesses extends LightningElement {
    @api groupName;
    @track processes;
    @api displayDate;
    @api selectedLevels;
    @api selectedCategories;
    // Dummy has to be tracked, otherwise visibility cannot be controlled
    @track dummy = '';
    // Internal variable, which defines whether the process is visible or not
    _isGroupVisible = true;
    _visibleProcesses = [];

    @wire(getGroupProcesses, {GroupName: '$groupName'})
    wiredGroupProcesses({ error, data }) {
        if (data) {
            this.processes = data;
            console.log('data:' + JSON.stringify(data));
            this.error = undefined;
        // other treatment here ...        
        } else if (error) {
            this.processes = undefined;
            this.error = error;
        }
    }
    /*
    Hook, which checks whether the group should be visible
    */
    renderedCallback() {
        // Find the element
        const groupElement = this.template.querySelector(".groupElement")
        /*
        Is the group visible?
        */
        if (this._isGroupVisible) {
            groupElement.style.display = "block";
        } else {
            groupElement.style.display = "none";
        }
    }
    /*
    Event handlers for child visibilty events
    */
    visibleHandler(event) {
        console.log('Visible event received: '+event.detail);
        this._visibleProcesses.push(event.detail);
        // Is group visible?
        console.log(JSON.stringify(this._visibleProcesses));
        if (this._visibleProcesses.length > 0) {
            this._isGroupVisible = true;
            this.dummy = "";
        }
    }
    hiddenHandler(event) {
        console.log('Hidden event received: '+event.detail);
        this._visibleProcesses.Id = false;
        // remove Id from array
        const index = this._visibleProcesses.indexOf(event.detail);
        if (index > -1) {
            this._visibleProcesses.splice(index, 1);
        } 
        console.log(JSON.stringify(this._visibleProcesses));
        // Is group visible?
        if (this._visibleProcesses.length < 1) {
            this._isGroupVisible = false;
        }
    }
}