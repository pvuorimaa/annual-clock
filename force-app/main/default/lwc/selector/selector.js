import { LightningElement, track } from 'lwc';

export default class Selector extends LightningElement {
    @track calenderValue = 'month';

    get calenderOptions() {
        return [
            { label: 'Month', value: 'month'},
            { label: 'Week', value: 'week'},
            { label: 'Day', value: 'day'},
        ];
    }

    handleFilterChange() {
        const event = new CustomEvent('filterchange');
        this.dispatchEvent(event);
        // eslint-disable-next-line no-console
        console.log('notify filter change');
    }
}