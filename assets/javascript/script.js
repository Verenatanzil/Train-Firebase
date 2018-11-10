// initialize firebase
var config = {
    apiKey: "AIzaSyCUwGZYN38J5Xen-Qs6kdBvZEtSub_3H3s",
    authDomain: "train-time-55679.firebaseapp.com",
    databaseURL: "https://train-time-55679.firebaseio.com",
    projectId: "train-time-55679",
    storageBucket: "train-time-55679.appspot.com",
    messagingSenderId: "1013692118584"
};
    firebase.initializeApp(config);

var database = firebase.database();

// submit button to add new trains
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

// grab user inputs
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#first-train-input").val().trim(),"HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

// local temporary object 
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train successfully added");

// clear boxes after submit
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// create firebase event to record user inputs and add rows
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

// converted time pushed back 1 year
    var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(timeConverted);

// current time
    var currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));

// time different
    var timeDifferent = moment().diff(moment(timeConverted),"minutes");

// time apart
    var timeRemainder = timeDifferent % trainFrequency;

// how many minutes away
    var trainAway = trainFrequency - timeRemainder;

// next train
    var arrival = moment().add(trainAway, "minutes");

    var trainArrival = moment(arrival).format("hh:mm A");

// create the new rows
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainArrival),
        $("<td>").text(trainAway),    
    );

// append new row
    $("#train-table > tbody").append(newRow);
});