import { LightningElement, track, wire } from 'lwc';
import getGroups from '@salesforce/apex/Test.getGroups';
import getGroupProcesses from '@salesforce/apex/Test.getGroupProcesses';

export default class CategoryGroup extends LightningElement {
    @track groups;
    @track error;

    @wire(getGroups)
    wiredGroups({ error, data }) {
        if (data) {
            this.groups = data;
            console.log('data:' + JSON.stringify(data));
            this.error = undefined;
        // other treatment here ...        
        } else if (error) {
            this.groups = undefined;
            this.error = error;
        }
    }
}