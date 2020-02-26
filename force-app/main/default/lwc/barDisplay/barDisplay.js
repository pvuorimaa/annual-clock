import { LightningElement, track, api, wire } from 'lwc';
import getProcessList from '@salesforce/apex/AnnualClock.getProcessList';

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
    NEW Read data from Apex method using Wire
    */
    @wire(getProcessList) processes;
    // @track processes;
    /*
    connectedCallback() {
        var processRecord;
        for (processRecord in this.processList) {
            this.processes.push({
                Id: processRecord.Id,
                Title: processRecord.Name,
                Description: processRecord.Description__c,
                Level: processRecord.Level__c,
                ProcessType: processRecord.ProcessType__c,
                StartDate: processRecord.StartDate__c,
                EndDate: processRecord.EndDate__c,
                Duration: processRecord.Duration__c,
                Link: processEntry.Link__c
            })
        }
    }
    */
    /*
    Data

    @track processes = [
        {
            Id: 1,
            Title: 'Curriculum plannning at programme level',
            Description: 'Courses are planned and course descriptions are created.',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2019-8-1',
            EndDate: '2020-2-15',
            Link: 'How to Plan Courses',
        },
        {
            Id: 2,
            Title: 'Strategic and pedagocial planning at degree programme',
            Description: '',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2019-8-1',
            EndDate: '2019-9-30',
            Link: '',
        },
        {
            Id: 3,
            Title: 'School specific timelines and guidelines are published',
            Description: '',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2019-8-1',
            EndDate: '2019-8-31',
            Link: '',
        },
        {
            Id: 4,
            Title: 'Additions, removals and changes to courses, minors and majors',
            Description: '',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2019-12-15',
            EndDate: '2020-2-15',
            Link: '',
        },
        {
            Id: 5,
            Title: 'Courses are planned',
            Description: '',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2019-12-15',
            EndDate: '2020-2-15',
            Link: '',
        },
        {
            Id: 6,
            Title: 'Course teachers give proposals for course timetables',
            Description: '',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2019-12-15',
            EndDate: '2020-2-15',
            Link: '',
        },
        {
            Id: 7,
            Title: 'Academic committee decissions on degree programmes curricula',
            Description: '',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2020-2-15',
            EndDate: '2020-3-31',
            Link: '',
        },
        {
            Id: 8,
            Title: 'Finalizing course timetables',
            Description: '',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2020-2-15',
            EndDate: '2020-5-31',
            Link: '',
        },
        {
            Id: 9,
            Title: 'Course teachers give proposals for course timetables',
            Description: '',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2020-3-7',
            EndDate: '2020-4-15',
            Link: '',
        },
        {
            Id: 10,
            Title: 'Course descriptions and timetables are published',
            Description: '',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2020-6-1',
            EndDate: '2020-6-5',
            Link: '',
        },
        {
            Id: 11,
            Title: 'MyCourses workspaces are created for next academic year',
            Description: '',
            Level: 'Bachelor',
            ProcessType: 'Curriculum',
            StartDate: '2020-6-1',
            EndDate: '2020-6-5',
            Link: '',
        },
        {
            Id: 12,
            Title: 'Master level process',
            Description: '',
            Level: 'Master',
            ProcessType: 'Evaluation',
            StartDate: '2020-6-1',
            EndDate: '2020-6-5',
            Link: '',
        },
        {
            Id: 13,
            Title: 'Orientation process',
            Description: '',
            Level: 'Master',
            ProcessType: 'Orientation',
            StartDate: '2019-9-1',
            EndDate: '2019-9-30',
            Link: '',
        },
        {
            Id: 14,
            Title: 'Marketing process',
            Description: '',
            Level: 'Both',
            ProcessType: 'Marketing',
            StartDate: '2019-10-1',
            EndDate: '2019-12-31',
            Link: '',
        }
    ];
    */
    @track displayDate = '2019-10-24';
}