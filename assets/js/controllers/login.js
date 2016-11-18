app.controller("login", ["$scope", "$firebaseAuth",
  function($scope, $firebaseAuth) {
    var ref = new Firebase("https://dazzling-inferno-5138.firebaseio.com/");
    $scope.auth = $firebaseAuth(ref);
    console.log("login controller loaded")
    //$scope.statusText;
    $scope.linkText = 'Login';
      $scope.login = function() {
      ref.authWithPassword({
        email    : $scope.login.username,
        password : $scope.login.password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          statusText = "Login Failed! incorrect details";

          
          //$scope.$apply();
          alert($scope.statusText);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          statusText = "Login successful, 1 second...";
          window.location = "/";
          $scope.linkText = 'Logout';
          
        }
});
    };

    
    ref.onAuth(checkAuth);

    function checkAuth(authData) 
    {
      if (authData) 
      {
        $scope.linkText = 'Logout';
      }    
      else 
      {

      }
    }
    $scope.logout = function()
    {
      ref.unauth();
      $scope.linkText = 'Login';
    }
  }
]);