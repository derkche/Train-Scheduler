$(document).ready(function() {

var config = {
  apiKey: "AIzaSyBOZdoZyVF_Wq1mPYjPEv-8KKkCEsub5hA",
  authDomain: "trainz-7aafe.firebaseapp.com",
  databaseURL: "https://trainz-7aafe.firebaseio.com",
  projectId: "trainz-7aafe",
  storageBucket: "trainz-7aafe.appspot.com",
  messagingSenderId: "248766606070"
};
firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      train: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFrequency
    };
    console.log(newTrain);
  
    // Uploads new train data to the database
    database.ref().push(newTrain);
  
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    return false;
  });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;

    var timeArray = trainStart.split(":");
    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var trainMinutes;
    var trainArrival;
    if (maxMoment === trainTime) {
      trainArrival = trainTime.format("hh:mm A");
      trainMinutes = trainTime.diff(moment(), "minutes");
    } else {
      var differenceTimes = moment().diff(trainTime, "minutes");
      var trainRemainder = differenceTimes % trainFrequency;
      trainMinutes = trainFrequency - trainRemainder;
      trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");
    }

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainStart + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");
  });
  
});
