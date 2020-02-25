import { LightningElement, api } from 'lwc';

export default class Filters extends LightningElement {
    /*
    Filters' values
    */
    @api selectedLevels;
    @api selectedProcesses
    @api selectedSchools;
    @api selectedAcademicYears;
    @api selectedPeriods;
    @api selectedMonths;
    /*
    ChechBoxGroup Options
    */
    get levelsOptions() {
        return [
            { label: 'All', value: 'All'},
            { label: 'Bachelor\'s Programmes', value: 'Bachelor'},
            { label: 'Master\'s Programmes', value: 'Master'},
        ];
    }
    levelsAll = ['All', 'Bachelor', 'Master'];
    get processesOptions() {
        return [
            { label: 'All', value: 'All'},
            { label: 'Admissions', value: 'Admissions'},
            { label: 'Curriculum Design', value: 'Curriculum'},
            { label: 'Evaluation and Development', value: 'Evaluation'},
            { label: 'Graduation', value: 'Graduation'},
            { label: 'Marketing and Recruitment', value: 'Marketing'},
            { label: 'Orientation', value: 'Orientation'},
            { label: 'Student Mobility', value: 'Mobility'},
        ];
    }
    processesAll = ['All', 'Admissions', 'Curriculum', 'Evaluation', 'Graduation', 'Marketing','Orientation','Mobility'];
    get schoolsOptions() {
        return [
            { label: 'All', value: 'All'},
            { label: 'Join Processes', value: 'Joint'},
            { label: 'ARTS', value: 'ARTS'},
            { label: 'BIZ', value: 'BIZ'},
            { label: 'CHEM', value: 'CHEM'},
            { label: 'ELEC', value: 'ELEC'},
            { label: 'ENG', value: 'ENG'},
            { label: 'SCI', value: 'SCI'},
        ];
    }
    schoolsAll = ['All','Joint','ARTS','BIZ','CHEM','ELEC','ENG','SCI'];
    get academicYearsOptions() {
        return [
            { label: 'Both', value: 'All'},
            { label: '2019-2020', value: '2019-2020'},
            { label: '2020-2021', value: '2020-2021'},
        ];
    }
    academicYearsAll = ['All','2019-2020','2020-2021'];
    get periodsOptions() {
        return [
            { label: 'All', value: 'All'},
            { label: 'Period 1', value: 'Period1'},
            { label: 'Period 2', value: 'Period2'},
            { label: 'Period 3', value: 'Period3'},
            { label: 'Period 4', value: 'Period4'},
            { label: 'Period 5', value: 'Period5'},
        ];
    }
    periodsAll = ['All','Period1','Period2','Period3','Period4','Period5'];
    get monthsOptions() {
        return [
            { label: 'All', value: 'All'},
            { label: 'August', value: 'August'},
            { label: 'September', value: 'September'},
            { label: 'October', value: 'October'},
            { label: 'November', value: 'November'},
            { label: 'December', value: 'December'},
            { label: 'January', value: 'January'},
            { label: 'February', value: 'February'},
            { label: 'March', value: 'March'},
            { label: 'April', value: 'April'},
            { label: 'May', value: 'May'},
            { label: 'June', value: 'June'},
            { label: 'July', value: 'July'},
        ];
    }
    monthsAll=['All','August','September','October','November','December','January','February','March','April','May','June','July'];
    /*
    Correct the checkBox selecions show that the first 'All' button works correctly
    It should work just like in excel filter selections
    */
    correctSelections(oldSelection, newSelection, allChoices) {
        // Default result
        var result = newSelection;
        // User has deactivated 'All' selection => remove also all other selectitons
        if (oldSelection.includes('All') && !newSelection.includes('All')) {
            result = [];
        // 'All' selected, but user has deselected something => remove 'All'
        } else if (oldSelection.includes('All') && newSelection.includes('All')) {
            result = newSelection;
            // remove 'All'
            const index = newSelection.indexOf('All');
            if (index > -1) {
                result.splice(index, 1);
            } 
        // User has activated 'All' => Select all options
        } else if (!oldSelection.includes('All') && newSelection.includes('All')) {
            result = allChoices;
        // User has selected all other choices, except 'All' option => Activate all
        } else if (!newSelection.includes('All') && newSelection.length == allChoices.length-1) {
            result = allChoices;
        } 
        return result;
    }
    /*
    Event handlers
    */
    handleLevelsChange(e) {
        this.selectedLevels = this.correctSelections(this.selectedLevels, e.detail.value, this.levelsAll);
        // Custom event has selected values as parameter
        const event = new CustomEvent('levelschange', {
            detail: this.selectedLevels
        });
        this.dispatchEvent(event);
    }

    handleProcessesChange(e) {
        this.selectedProcesses = this.correctSelections(this.selectedProcesses, e.detail.value, this.processesAll);
        // Custom event has selected values as parameter
        const event = new CustomEvent('processeschange', {
            detail: this.selectedProcesses
        });
        this.dispatchEvent(event);
    }

    handleSchoolsChange(e) {
        this.selectedSchools = this.correctSelections(this.selectedSchools, e.detail.value, this.schoolsAll);
        // Custom event has selected values as parameter
        const event = new CustomEvent('schoolschange', {
            detail: this.selectedSchools
        });
        this.dispatchEvent(event);
    }

    handleAcademicYearsChange(e) {
        this.selectedAcademicYears = this.correctSelections(this.selectedAcademicYears, e.detail.value, this.academicYearsAll);
        // Custom event has selected values as parameter
        const event = new CustomEvent('academicyearschange', {
            detail: this.selectedAcademicYears
        });
        this.dispatchEvent(event);
    }

    handlePeriodsChange(e) {
        this.selectedPeriods = this.correctSelections(this.selectedPeriods, e.detail.value, this.periodsAll);
        // Custom event has selected values as parameter
        const event = new CustomEvent('periodschange', {
            detail: this.selectedPeriods
        });
        this.dispatchEvent(event);
    }

    handleMonthsChange(e) {
        this.selectedMonths = this.correctSelections(this.selectedMonths, e.detail.value, this.monthsAll);
        // Custom event has selected values as parameter
        const event = new CustomEvent('monthschange', {
            detail: this.selectedMonths
        });
        this.dispatchEvent(event);
    }
}