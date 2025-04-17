const dashboardLeadsBodyNew = require("./helpers");
const moment = require("moment");

const axios = require("axios");


const leadImporterAllFilters = async (accountId, bearerToken, startDate, endDate, subAccountIDList, toDoOptions, statusOptions, soldStatusOptions, visitStatusOptions, leadSourceFilter, dateFilterOptions, updatedDate) => {
    const config = {
        method: "post",
        url: "https://api.crm.activix.ca/dashboard/leads",
        headers: {
            authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json"
        },
        data: {
            ...dashboardLeadsBodyNew(accountId, moment(startDate, 'YYYY-MM-DD').format("YYYY-MM-DDTHH:mm:ssZ").toString(), moment(endDate, 'YYYY-MM-DD').endOf('day').format("YYYY-MM-DDTHH:mm:ssZ").toString(), subAccountIDList, toDoOptions, statusOptions, soldStatusOptions, visitStatusOptions, leadSourceFilter, updatedDate),
        }
    };

    Logger(config);

    const rawData = await axios(config);

    return rawData.data.data
        .filter((row) => {
            if ((dateFilterOptions === "Todo date" || dateFilterOptions === "All") && row?.next_todo_date !== undefined) {
                const startDateIs = new Date(startDate);
                const endDateIs = new Date(endDate);
                endDateIs.setDate(endDateIs.getDate() + 1);
                const dateToCheck = new Date(row?.next_todo_date);
                if (dateToCheck >= startDateIs && dateToCheck <= endDateIs) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        })
        .filter((row) => {
            if ((dateFilterOptions === "Created at" || dateFilterOptions === "All") && row?.created_at !== undefined) {
                const startDateIs = new Date(startDate);
                const endDateIs = new Date(endDate);
                endDateIs.setDate(endDateIs.getDate() + 1);
                const dateToCheck = new Date(row?.created_at);
                if (dateToCheck >= startDateIs && dateToCheck <= endDateIs) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        })
        .filter((row) => {
            if ((dateFilterOptions === "Sold date" || dateFilterOptions === "All") && row?.sale_date !== undefined && row?.sale_date !== null) {
                const startDateIs = new Date(startDate);
                const endDateIs = new Date(endDate);
                endDateIs.setDate(endDateIs.getDate() + 1);
                const dateToCheck = new Date(row?.sale_date);

                if (dateToCheck >= startDateIs && dateToCheck <= endDateIs) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        })
        .filter((row) => {
            if ((dateFilterOptions === "Updated date" || dateFilterOptions === "All") && row?.updated_at !== undefined) {
                const startDateIs = new Date(startDate);
                const endDateIs = new Date(endDate);
                endDateIs.setDate(endDateIs.getDate() + 1);
                const dateToCheck = new Date(row?.updated_at);

                if (dateToCheck >= startDateIs && dateToCheck <= endDateIs) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        })
        .map((row) => {
            return {
                customer: {
                    firstName: row?.first_name,
                    lastName: row?.last_name,
                    phoneNumbers: [
                        {
                            phoneNumber: row.phones.filter((phone) => phone.mobile)[0]?.phone.replace(/\D/g, "").slice(-10),
                            type: "cell"
                        }
                    ],
                    emailAddresses: [{
                        type: "personal",
                        emailAddress: ""
                    }]
                },
                vehicle: {
                    year: row?.vehicles?.[0]?.year,
                    make: row?.vehicles?.[0]?.make,
                    model: row?.vehicles?.[0]?.model,
                },
                lead: {
                    source: {
                        name: row?.source
                    }
                },
                salesperson: {
                    firstName: row?.sorting.advisors?.split(" ")[0],
                    lastName: row?.sorting.advisors?.split(" ")[1],
                },
                bdcAgent: {
                    firstName: row?.sorting?.agents?.split(" ")[0],
                    lastName: row?.sorting?.agents?.split(" ")[1],
                }
            };
        });
};