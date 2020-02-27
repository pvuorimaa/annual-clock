import { LightningElement, api, track, wire } from 'lwc';
import getGroupProcesses from '@salesforce/apex/Test.getGroupProcesses';

export default class GroupProcesses extends LightningElement {
    @api groupName;
    @track processes;
    @api displayDate;
    @api selectedLevels;
    @api selectedCategories;

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
}