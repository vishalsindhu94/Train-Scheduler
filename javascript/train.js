var name;
var destination;
var frequency;
var firstTrain;   
var minutesAway;
var nextArrival;

  var config = {
    apiKey: "AIzaSyD-sJVDYy7WYw5Y1G02R6-Ruc8bOXtRrCk",
    authDomain: "vishal-s-firebase.firebaseapp.com",
    databaseURL: "https://vishal-s-firebase.firebaseio.com",
    projectId: "vishal-s-firebase",
    storageBucket: "vishal-s-firebase.appspot.com",
    messagingSenderId: "889105410279"
  };
  firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train-btn").on("click", function() {
      
        var Name=$("#name").val().trim();
        var Destination=$("#destination").val().trim();
        var FirstTrain=$("#first-train").val().trim();
        var Frequency=$("#frequency").val().trim();
        database.ref("traindata").push({
        name:Name,
        destination:Destination,
        firstTrain:FirstTrain,
        frequency:Frequency,

      });
    });
    database.ref("traindata").on("child_added", function(snapshot) {
      console.log(snapshot.val());

       name= snapshot.val().name;
       destination= snapshot.val().destination;
       frequency= snapshot.val().frequency;
       firstTrain=snapshot.val().firstTrain;
       //caculate nextArrival and minutesAway (firstTrain-frequency gives us the next train then that train minus the frequency gives the 1 after that)
       // use modulus will give us the remainder time which would be minutesAway
         var trainFormat = moment(firstTrain, "HH:mm").subtract(1, "years");
         console.log(trainFormat);
         var currentTime=moment();
         console.log("current time: " + moment(currentTime).format("hh:mm"));
         var diffTime = moment().diff(moment(trainFormat), "minutes");
         console.log("diffTime: " + diffTime);
         remainderTime=diffTime % frequency;
         console.log(remainderTime);
         minutesAway = frequency - redmainderTime;
         console.log(minutesAway);
         nextArrival = moment().add(nextArrival, "minutes");
         console.log("nextarrival: " + moment(nextArrival).format("hh:mm"));
        
      var trainRow=$("<tr>");
      trainRow.append("<td>"+name+"</td>");
      trainRow.append("<td>"+destination+"</td>");
      trainRow.append("<td>"+frequency+"</td>");
      trainRow.append("<td>"+nextArrival+"</td>");
      trainRow.append("<td>"+minutesAway+"</td>");
      $("#train-table").append(trainRow);
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });