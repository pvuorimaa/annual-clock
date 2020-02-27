import { LightningElement, track, api, wire } from 'lwc';
import getProcessList from '@salesforce/apex/AnnualClock.getProcessList';
import getGroups from '@salesforce/apex/Test.getGroups';

export default class BarDisplay extends LightningElement {
    /*
    Filters' values
    */
    @api selectedLevels;
    @api selectedCategories;
    @api selectedSchools;
    @api selectedAcademicYears;
    @api selectedPeriods;
    @api selectedMonths;
    /*
    Status helper function
    */
    statusHelper(selection, category) {
        if (selection.includes('All')) {
            return category;
        } else {
            return selection.join(', ');
        }        
    }
    /*
    Status descriptions
    */
    get statusLevels() {
        return this.statusHelper(this.selectedLevels,'All levels');
    }
    get statusCategories() {
        return this.statusHelper(this.selectedCategories,'All Categories');
    }
    get statusSchools() {
        return this.statusHelper(this.selectedSchools,'All Schools');
    }
    get statusAcademicYears() {
        return this.statusHelper(this.selectedAcademicYears,'Both Academic Years');
    }
    get statusPeriods() {
        return this.statusHelper(this.selectedPeriods,'All Periods');
    }
    get statusMonths() {
        return this.statusHelper(this.selectedMonths,'All Months');
    }
    /*
    NEW: Process Group apex method function
    */
    @track error;
    @track groups;

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

    @track displayDate = '2019-10-24';
}