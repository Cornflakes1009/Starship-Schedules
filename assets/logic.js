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
    
    var minUntilShip;

    function calculateTime(childSnapShot) {
        
        var firstShipConverted = moment(childSnapShot.val().firstShip, "hh:mm").subtract("1", "years");
       
        var difference = moment().diff(moment(firstShipConverted), "minutes");
        
        var remainder = difference % childSnapShot.val().frequency;
        console.log("the remainder is " + remainder);
        minUntilShip = childSnapShot.val().frequency - remainder;
        
        moment(minUntilShip).minutes();
        var nextArrival = moment().add(minUntilShip, "minutes").format("hh:mm a");
        
        
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
        firstShip = $("#first-ship").val().trim();
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

    $(document).on("click", ".removable", removeTableRow);
}); // end of document ready

