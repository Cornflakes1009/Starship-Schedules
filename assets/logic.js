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
    var cost = '';


    database.ref().on('child_added', function (childSnapshot) {
        $('#ship-board').append("<tr class='removable'>" + '<td>' + childSnapshot.val().ship + '</td>' + '<td>' + childSnapshot.val().destination + '</td>' + '<td>' + childSnapshot.val().firstShip + '</td>' + '<td>' + childSnapshot.val().frequency + '</td>' + '<td>' + childSnapshot.val().cost + '</td>' + '</tr>');
    });
    var firstShipConverted = moment(firstShip, "hh:mm").subtract("1, years");

    $("#submit-button").on('click', function (event) {
        event.preventDefault();
        ship = $("#ship").val().trim();
        destination = $("#destination").val().trim();
        firstShip = $("#first-ship").val().trim();
        frequency = $("#frequency").val().trim();
        cost = $('#cost').val().trim();
        if (ship !== '' && destination !== '' && firstShip !== '' && frequency !== '' && cost !== '') {
            database.ref().push({
                ship: ship,
                destination: destination,
                firstShip: firstShip,
                frequency: frequency,
                cost: cost
            });
        } else {
            alert('Please make sure you fill out all fields. Thank you!');
        }
        console.log(frequency);
    })

    function removeTableRow(){
       var ask = confirm('Are you sure you want to delete this entry?');
        if(ask === true){
            (this).remove();
        return false;

        }
        
    };
    $(document).on("click", ".removable", removeTableRow);
}); // end of document ready

