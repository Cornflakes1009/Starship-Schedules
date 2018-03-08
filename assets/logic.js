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

    database.ref().on('child_added', function (childSnapshot) {
        $('#ship-board').append("<tr class='removable'>" + '<td>' + childSnapshot.val().ship + '</td>' + '<td>' + childSnapshot.val().destination + '</td>' + '<td>' + childSnapshot.val().frequency + '</td>' + '<td>' + calculateTime(childSnapshot).nextArrival + '</td>' + '<td>' + calculateTime(childSnapshot).minUntilShip + '</td>' + '</tr>');
    });


    var ship = "";
    var destination = '';
    var firstShip = $("#first-ship").val();

    var frequency = $("#frequency").val().trim();
    //console.log("freq", frequency);
    var minUntilShip;

    function calculateTime(childSnapShot) {
        /////

        //var tr = $("<tr>");
        //console.log('firstShip is ' + firstShip);
        var firstShipConverted = moment(childSnapShot.val().firstShip, "hh:mm").subtract("1", "years");
        //console.log("first ship converted is " + firstShipConverted);

        
        // the time difference between current time and the first train
        //console.log(firstShipConverted);
        var difference = moment().diff(moment(firstShipConverted), "minutes");
        // console.log('first ship ', firstShip);
        // console.log("the difference is " + difference);
        var remainder = difference % childSnapShot.val().frequency;
        console.log("the remainder is " + remainder);
        minUntilShip = childSnapShot.val().frequency - remainder;
        //console.log("minutes until ship is " + minUntilShip);
        moment(minUntilShip).minutes();
        var nextArrival = moment().add(minUntilShip, "minutes").format("hh:mm a");
        // tr.append("<td>" + nextArrival + "</td>");
        // tr.append("<td>" + minUntilShip + "</td>");
        /////
        
        var result = {
            minUntilShip: minUntilShip,
            nextArrival: nextArrival
        }
        return result;
    }





    $("#submit-button").on('click', function (event) {
        event.preventDefault();
        ship = $("#ship").val().trim();
        destination = $("#destination").val().trim();
        firstShip = $("#first-ship").val(); // removed .trim()
        console.log(firstShip);
        frequency = $("#frequency").val().trim();
        console.log(frequency);


        if (ship !== '' && destination !== '' && firstShip !== '' && frequency !== '') {

            database.ref().push({
                ship: ship,
                destination: destination,
                firstShip: firstShip,
                frequency: frequency,
                firstShip: firstShip

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

