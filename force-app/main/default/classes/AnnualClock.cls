public with sharing class AnnualClock {
    @AuraEnabled(cacheable=true)
    public static List<Process__c> getProcessList(){
        return [
            SELECT Id, Name, Description__c, Category__c, Level__c, StartDate__c, EndDate__c, Duration__c, Link__c
            FROM Process__c
            ORDER BY Category__c, StartDate__c, EndDate__c
        ];
    }
}