$(document).ready(function() {

// 1. Initialize Firebase
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
  
  // 2. Button for adding Trains
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
  
    // Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrequency);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainStart + "</td><td>" + trainFrequency + "</td><td>");
  });
  
});
