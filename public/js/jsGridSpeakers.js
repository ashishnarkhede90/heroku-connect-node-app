$(function() {

    var inviteeType = [
        { Name: "Keynote", Id: 0 },
        { Name: "Deep Dive", Id: 1 },
        { Name: "Panel", Id: 2 },
        { Name: "Advisory Committee", Id: 3 },
    ];

    function mapSpeakerRecords(data) {
       // format the data so that jsGrid displays it correctly
        var leadsToApprove = []; // array to collect data to be displayed
        for(var index in data) {
            var l = {
                'First Name': data[index].firstname,
                'Last Name': data[index].lastname,
                'Invitee Type': data[index].type
            }
        }
    }

    function getSpeakers() {
        console.log('*** getSpeakers');
         // create a deferred object, resolve it once data receieved from server is formatted 
         var d = $.Deferred();

         $.ajax({
                type: "GET",
                url: "/speakers",
                headers: { 'authorization': sessionStorage.getItem('accessToken') },
                success: function(response, status) {
                    if(response.success && response.status == 200) {
                        var speakerList = mapSpeakerRecords(response.data);
                        d.resolve(speakerList);
                    }
                    else if(!response.success && response.status == 403) {
                        $(location).attr('href', '/error');
                    }                    
                },
                error: function(xhrObj, status, error) {
                    console.log(status + ': ' + error);
                }
            });

         //return the promise on deferred object created above
         return d.promise();
    }

    var db = {
        loadData: function() {
            return getSpeakers();
        }
    }

    $("#jsGrid").jsGrid({
        height: "70%",
        width: "100%",
        filtering: false,
        inserting: false,
        editing: false,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageButtonCount: 5,
        controller: db,
        fields: [
            { name: "First Name", type: "text", width: 150 },
            { name: "Last Name", type: "text", width: 150 },
            { name: "Invitee Type", type: "text", width: 150 },
        ]
    });
    
});