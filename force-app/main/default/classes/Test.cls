public with sharing class Test {
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult>getGroups(){
        return [
            SELECT Group__c
            FROM Process__c
            GROUP BY Category__c, Group__c
        ];
    }
   	@AuraEnabled(cacheable=true)
    public static List<Process__c>getGroupProcesses(String GroupName){
        System.debug('Group: ' + GroupName);
        return [
            SELECT Id, Name, Description__c, Category__c, Level__c, StartDate__c, EndDate__c, Duration__c, Link__c
			FROM Process__c
			WHERE Group__c = :GroupName
            ORDER BY StartDate__c, EndDate__c
    	];
    }
}