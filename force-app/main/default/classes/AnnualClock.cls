public with sharing class AnnualClock {
    @AuraEnabled(cacheable=true)
    public static List<Process__c> getProcessList(){
        return [
            SELECT Id, Name, Description__c, Level__c, ProcessType__c, StartDate__c, EndDate__c, Duration__c, Link__c
            FROM Process__c
            ORDER BY ProcessType__c, StartDate__c, EndDate__c
        ];
    }
}