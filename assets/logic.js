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

$("#submit-button").on('click', function (event) {
    event.preventDefault();
    console.log('submit clicked');
    ship = $("#ship").val().trim();
    destination = $("#destination").val().trim();
    firstShip = $("#first-ship").val().trim();
    frequency = $("#frequency").val().trim();
    cost = $('#cost').val().trim();
    database.ref().push({
        ship: ship,
        destination: destination,
        firstShip: firstShip,
        frequency: frequency,
        cost: cost
    });
    database.ref().orderByChild("start").limitToLast(1).on('child_added', function (childSnapshot) {
        $('#ship-board').append("<tr>" + '<td>' + childSnapshot.val().ship + '</td>' + '<td>' + childSnapshot.val().destination + '</td>' + '<td>' + childSnapshot.val().firstShip + '</td>' + '<td>' + childSnapshot.val().frequency + '</td>' + '<td>' + childSnapshot.val().cost + '</td>' + '</tr>');
    });
})

}); // end of document ready