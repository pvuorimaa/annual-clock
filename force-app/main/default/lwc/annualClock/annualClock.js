import { LightningElement, track } from 'lwc';

export default class AnnualClock extends LightningElement {
    @track areFiltersVisible = false;
    @track selectedLevels = ['All', 'Bachelor', 'Master'];
    @track selectedCategories = ['All', 'Evaluation', 'Enrolment', 'Planning', 'Support', 'Impact'];
    @track selectedSchools = ['All','Joint','ARTS','BIZ','CHEM','ELEC','ENG','SCI'];
    @track selectedAcademicYears = ['All','2019-2020','2020-2021'];
    @track selectedPeriods = ['All','Period1','Period2','Period3','Period4','Period5'];
    @track selectedMonths = ['All','August','September','October','November','December','January','February','March','April','May','June','July'];

    handleFilterChange() {
        this.areFiltersVisible = !this.areFiltersVisible;
    }
    handleLevelsChange(event) {
        this.selectedLevels = event.detail;
    }
    handleCategoriesChange(event) {
        this.selectedCategories = event.detail;
    }
    handleSchoolsChange(event) {
        this.selectedSchools = event.detail;
    }
    handleAcademicYearsChange(event) {
        this.selectedAcademicYears = event.detail;
    }
    handlePeriodsChange(event) {
        this.selectedPeriods = event.detail;
    }
    handleMonthsChange(event) {
        this.selectedMonths = event.detail;
    }
}