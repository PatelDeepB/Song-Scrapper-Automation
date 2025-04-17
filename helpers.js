const dashboardLeadsBodyNew = (accountId, start, end, subAccountIDList, toDoOptions, statusOptions, soldStatusOptions, visitStatusOptions, leadSourceFilter, updatedDate) => {
    const filters = {
        "division:name": [
            "none",
            "new",
            "used"
        ],
        "status": [
            "none"
        ],
        "lead_type:name": [
            "email"
        ],
    };

    if (subAccountIDList? subAccountIDList.length > 0 : subAccountIDList !== undefined) {
        filters["account:name"] = subAccountIDList;
    }
    if (toDoOptions !== undefined) {
        filters["todo"] = toDoOptions;
    }

    if(statusOptions !== undefined){
        filters["status"] = statusOptions;
    }
    if(visitStatusOptions !== undefined){
        filters["presented"] = visitStatusOptions;
    }
    if(soldStatusOptions !== undefined){
        filters["sale"] = soldStatusOptions;
    }
    if(leadSourceFilter !== undefined && leadSourceFilter !== "" && leadSourceFilter !== null){
        filters["source"] = [leadSourceFilter];
    }
    if (updatedDate !== undefined){
        filters["updated_at"] = updatedDate;
    }

    const body =  {
        "accountId": accountId !== undefined ? Number(accountId) : undefined,
        "dashboard": "allLead",
        "divisions": [
            "none",
            "new",
            "used"
        ],
        "endDate": end,
        "filteredDates": [
            "created_at",
            "appointment_date",
            "presented_date",
            "sale_date",
            "delivered_date"
        ],
        "filters": filters,
        "options": {
            "carryOver": true,
            "doubleWalkIn": false,
            "endContractStats": false,
            "phoneAppointment": false,
            "recordedDate": false,
            "resultStats": false,
            "showAgent": true,
            "showAllLeads": false,
            "showStats": true,
            "homeVisit": false,
            "lostDate": false
        },
        "orderBy": "todo",
        "page": 1,
        "perPage": 1000,
        "sortBy": "desc",
        "startDate": start
    };

    return body;
}