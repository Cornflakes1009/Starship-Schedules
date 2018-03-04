$(function () {

    var config = {
        apiKey: "AIzaSyDIeJKq6Q2c256oB88R0ktLZOtxP49u5jM",
        authDomain: "starshipscheduler.firebaseapp.com",
        databaseURL: "https://starshipscheduler.firebaseio.com",
        projectId: "starshipscheduler",
        storageBucket: "",
        messagingSenderId: "844519570002"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var ship = "";
    var destination = '';
    var firstShip = '';
    var frequency = '';
    

    database.ref().on('child_added', function (childSnapshot) {
        $('#ship-board').append("<tr class='removable'>" + '<td>' + childSnapshot.val().ship + '</td>' + '<td>' + childSnapshot.val().destination + '</td>' + '<td>' + childSnapshot.val().frequency + '</td>' + '<td>' + childSnapshot.val().firstShip + '</td>' + '<td>' + childSnapshot.val().minUntilShip + '</td>' + '</tr>');
        var tr = $("<tr>");
    var firstShipConverted = moment(firstShip, "hh:mm").subtract("1, years");
    var currentTime = moment();
    // the time difference between current time and the first train
    var difference = moment().diff(moment(firstShipConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilShip = frequency - remainder;
    moment(minUntilShip).minutes();
    var nextArrival = moment().add(minUntilShip, "minutes").format("hh:mm a");
    tr.append("<td>" + nextArrival + "</td>");
    tr.append("<td>" + minUntilShip + "</td>");
    
    });
    

    $("#submit-button").on('click', function (event) {
        event.preventDefault();
        ship = $("#ship").val().trim();
        destination = $("#destination").val().trim();
        firstShip = $("#first-ship").val().trim();
        frequency = $("#frequency").val().trim();
        
        if (ship !== '' && destination !== '' && firstShip !== '' && frequency !== '') {
            database.ref().push({
                ship: ship,
                destination: destination,
                firstShip: firstShip,
                frequency: frequency,
                
            });
        } else {
            alert('Please make sure you fill out all fields. Thank you!');
        }
        console.log(frequency);
        $("#ship").val('');
        $("#destination").val('');
        $("#first-ship").val('');
        $("#frequency").val('');
    })

    function removeTableRow(){
       var ask = confirm('Are you sure you want to delete this entry?');
        if(ask === true){
            (this).remove();
            // need to remove item from database
        return false;
        }
    };
    // var tr = $("<tr>");
    // var firstShipConverted = moment(firstShip, "hh:mm").subtract("1, years");
    // var currentTime = moment();
    // // the time difference between current time and the first train
    // var difference = moment().diff(moment(firstShipConverted), "minutes");
    // var remainder = difference % frequency;
    // var minUntilShip = frequency - remainder;
    // moment(minUntilShip).minutes();
    // var nextArrival = moment().add(minUntilShip, "minutes").format("hh:mm a");
    // tr.append("<td>" + nextArrival + "</td>");
    // tr.append("<td>" + minUntilShip + "</td>");



    $(document).on("click", ".removable", removeTableRow);
}); // end of document ready

