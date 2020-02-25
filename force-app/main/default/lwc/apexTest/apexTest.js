import { LightningElement, wire } from 'lwc';
import getProcessList from '@salesforce/apex/AnnualClock.getProcessList';

export default class ApexTest extends LightningElement {
    @wire(getProcessList) processes;
}