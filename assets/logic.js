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
    var firstShip = $("#first-ship").val();
    var frequency = $("#frequency").val().trim();
    var minUntilShip;




    database.ref().on('child_added', function (childSnapshot) {
        $('#ship-board').append("<tr class='removable'>" + '<td>' + childSnapshot.val().ship + '</td>' + '<td>' + childSnapshot.val().destination + '</td>' + '<td>' + childSnapshot.val().frequency + '</td>' + '<td>' + childSnapshot.val().nextArrival + '</td>' + '<td>' + childSnapshot.val().minUntilShip + '</td>' + '</tr>');
    });

    $("#submit-button").on('click', function (event) {
        event.preventDefault();
        ship = $("#ship").val().trim();
        destination = $("#destination").val().trim();
        firstShip = $("#first-ship").val(); // removed .trim()
        console.log(firstShip);
        frequency = $("#frequency").val().trim();
        console.log(frequency);
        /////
        //var tr = $("<tr>");
        //console.log('firstShip is ' + firstShip);
        var firstShipConverted = moment(firstShip, "hh:mm").subtract("1, years");
        //console.log("first ship converted is " + firstShipConverted);
        var currentTime = moment();
        // the time difference between current time and the first train
        var difference = moment().diff(moment(firstShipConverted), "minutes");
        //console.log("the difference is " + difference);
        var remainder = difference % frequency;
        //console.log("the remainder is " + remainder);
        minUntilShip = frequency - remainder;
        //console.log("minutes until ship is " + minUntilShip);
        moment(minUntilShip).minutes();
        var nextArrival = moment().add(minUntilShip, "minutes").format("hh:mm a");
        // tr.append("<td>" + nextArrival + "</td>");
        // tr.append("<td>" + minUntilShip + "</td>");
        /////

        if (ship !== '' && destination !== '' && firstShip !== '' && frequency !== '') {

            database.ref().push({
                ship: ship,
                destination: destination,
                firstShip: firstShip,
                frequency: frequency,
                nextArrival: nextArrival,
                minUntilShip: minUntilShip
            });
        } else {
            alert('Please make sure you fill out all fields. Thank you!');
        }
        $("#ship").val('');
        $("#destination").val('');
        $("#first-ship").val('');
        $("#frequency").val('');
    })

    function removeTableRow() {
        var ask = confirm('Are you sure you want to delete this entry?');
        if (ask === true) {
            (this).remove();
            // need to remove item from database
            return false;
        }
    };

    $(document).on("click", ".removable", removeTableRow);
}); // end of document ready

