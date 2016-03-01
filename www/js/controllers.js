var hive = angular.module('hive.controllers', []);


//Totally functioning simple login
hive.controller("LoginCtrl", function($scope, $firebaseAuth, $state){
var users = new Firebase("https://threadtemplate.firebaseio.com/");
  
  //This is going to get and log the user status, this could be copied and/or used for the beginning framework to build
  //a functioning profile page
  var status = new Firebase("https://threadtemplate.firebaseio.com/");
  var authData = status.getAuth();
  
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    $state.go('hive.thread');
  } else {
    console.log("User is logged out");
    $state.go('hive.login');
  }
  
  //This is called when a user clicks the 'Sign Up' button
  $scope.register = function(username, password){
    users.createUser({
      email    : username,
      password : password
    }, function(error) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        users.authWithPassword({
          email: username,
          password: password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
        $state.go('hive.thread');
      }
    });
  };
  
  //This is called when a user clicks the 'Login' button
  $scope.login = function(username, password){
    users.authWithPassword({
      email    : username,
      password : password
    }, function(error) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        $state.go('hive.thread');
      }
    });
  };
  
  
  // we would probably save a profile when we register new users on our app
  // we could also read the profile to see if it's null
  // here we will just simulate this with an isNewUser boolean
  var isNewUser = true;
  
  var ref = new Firebase("https://threadtemplate.firebaseio.com/");
  ref.onAuth(function(authData) {
    if (authData && isNewUser) {
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      ref.child("users").child(authData.uid).set({
        provider: authData.provider,
        name: getName(authData)
      });
    }
  });
  
  // find a suitable name based on the meta info given by each provider
  function getName(authData) {
    switch(authData.provider) {
      case 'password':
        return authData.password.email.replace(/@.*/, '');
      case 'twitter':
        return authData.twitter.displayName;
      case 'facebook':
        return authData.facebook.displayName;
    }
  }
  
  //Logout Functionality
  $scope.logout = function() {
    users.unauth();
    $state.go('hive.login');
  };
  
});



//Thread Page Controller
hive.controller("threadCtrl", function($scope, $firebaseArray) {

var timestamp = Math.floor(Date.now());
var FIREBASE_URL = "https://threadtemplate.firebaseio.com/";

    // Get Stored TODOs
    var todosRef = new Firebase("https://threadtemplate.firebaseio.com/");
    $scope.todos = $firebaseArray(todosRef);



    var newPostRef = new Firebase(FIREBASE_URL + timestamp);
    
    $scope.addItem = function(){
      
      newPostRef.set({
          id: timestamp,
          description: $scope.postDescription,
          likes: 0,
          liked: false
        });
        
        $scope.postDescription = "";
    };
    
    // Update the "completed" status
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(FIREBASE_URL + item.id);

        // Firebase : Update the item
        itemRef.update({
            id: item.id,
            description : item.description,
            likes: item.likes + 1,
            liked: !item.liked
        });

    };
    
});