$(function() {

    var inviteeType = [
        { Name: "Keynote", Id: 0 },
        { Name: "Deep Dive", Id: 1 },
        { Name: "Panel", Id: 2 },
        { Name: "Advisory Committee", Id: 3 },
    ];

    function getSpeakers() {
        console.log('*** getSpeakers');
         // create a deferred object, resolve it once data receieved from server is formatted 
         var d = $.Deferred();

         $.ajax({
                type: "GET",
                url: "/leads/speakers",
                headers: { 'authorization': sessionStorage.getItem('accessToken') },
                success: function(response, status) {
                    if(response.success && response.status == 200) {
                        d.resolve(response.data);
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
        //height: "70%",
        width: "100%",
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