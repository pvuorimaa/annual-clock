import { LightningElement, track, api } from 'lwc';

export default class Bar extends LightningElement {
    @api process;
    @api displayDate;
    // Internal variable, which defines whether the process is visible or not
    _isProcessVisible = true;
    // Dummy has to be tracked, otherwise renderedCallback is not called
    @track dummy = '';
    @track style;
    /*
    Hook, which calculates process margin and width
    Also, checks whether the process should be visible
    */
    renderedCallback() {
        // Helper variables for calculating years, months and days
        var years, months, days; 
        // Variables for storing styling information
        var marginLeft, titleWidth, barWidth;

        // Find the element
        const processElement = this.template.querySelector(".processElement")
        const barElement = this.template.querySelector("li")
        // Read first the dates from the parent class
        const startDate = new Date(this.process.StartDate__c); 
        const endDate = new Date(this.process.EndDate__c);
        const displayDate = new Date(this.displayDate);
        // In one month, there are 365/12 days
        const monthLength = 365/12;

        // Let's first calculate the offset of the bar
        // Years as months (i.e., one year is 12 months)
        years = 12*(startDate.getFullYear()-displayDate.getFullYear());
        // Months (+ offset of 2 months)
        months = startDate.getMonth()-displayDate.getMonth()+2;
        // Days as months
        days = startDate.getDate()/monthLength;
        marginLeft = 100*(years+months+days)/12;

        // Let's now count the width of the bar
        // Years as months (i.e., one year is 12 months)
        years = 12*(endDate.getFullYear()-startDate.getFullYear());
        // Months
        months = endDate.getMonth()-startDate.getMonth();
        // Days as months
        days = (endDate.getDate()-startDate.getDate())/monthLength;
        titleWidth = 100*(years+months+days)/12;
        // Minimum width 2 months (i.e., 16.7%)
        // If less, expand text and expand bar relative width
        const minLength = 16.7;
        if (titleWidth < minLength) {
            barWidth = titleWidth;
            titleWidth = minLength;
            barWidth = 100*barWidth/titleWidth
        } else {
            barWidth = 100;
        }

        // Finally, set the element styling 
        processElement.style.width = titleWidth+"%";
        processElement.style.marginLeft = marginLeft+"%";
        barElement.style.width = barWidth+"%";
        // Is the process visible?
        if (this._isProcessVisible) {
            processElement.style.display = "block";
        } else {
            processElement.style.display = "none";
        }
    }

    // Check visibility based on filters
    checkVisibility() {
        // Let's assume that the process is  visible
        this._isProcessVisible = true;
        // Fire @track and create renderedCallback by changing value of dummy
        this.dummy='';
        // Check levels
        if (!this._selectedLevel.includes('All') && 
            !this._selectedLevel.includes(this.process.Level__c)) {
                this._isProcessVisible = false;
                // Fire @track and create renderedCallback by changing value of dummy
                this.dummy=' ';
        }
        // Check categories
        if (!this._selectedCategories.includes('All') && 
            !this._selectedCategories.includes(this.process.Category__c)) {
                this._isProcessVisible = false;
                // Fire @track and create renderedCallback by changing value of dummy
                this.dummy=' ';
        }
        this.style = this.process.Level__c + " " + this.process.Category__c;
    }

    // SelectedLevels defined using setter and getter, because it defines also element visibiity
    _selectedLevel = 'All';

    set selectedLevels(value) {
        this._selectedLevel = value;
        this.checkVisibility();
    }

    @api get selectedLevels() {
        return this._selectedLevel;
    }

    // SelectedCategories defined using setter and getter, because it defines also element visibiity
    _selectedCategories = 'All';

    set selectedCategories(value) {
        this._selectedCategories = value;
        this.checkVisibility();
    }
    
    @api get selectedCategories() {
        return this._selectedCategories;
    }
    // ModalBox 
    @track openmodel = false;
    openmodal() {
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    } 
    linkMethod() {
        alert('link clicked');
        this.closeModal();
    }
    /*
    Create level description for ModalBox
    bachelor's, master's or both
    */
    get levelDescription(){
        if (this.process.Level__c.includes('Both')) {
            return "Both master's and bachelor's programmes";
        } else {
            return this.process.Level__c+"'s programmes";
        }
    }   
}