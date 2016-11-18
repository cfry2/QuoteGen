/*

  Routes file for the app
  Created by Cameron Fry on 16/12/2015
*/



app.run(["$rootScope", "$location", function($rootScope, $location) {
$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  console.log("error!");
  if (error === "AUTH_REQUIRED") {
    $location.path('/login');
    console.log("Access rejected!");
  }
});
}]);

    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'assets/js/views/dashboard.html',
                controller  : 'main',
                            resolve: {
              // controller will not be loaded until $waitForAuth resolves
              // Auth refers to our $firebaseAuth wrapper in the example above
              "currentAuth": ["Auth", function(Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                console.log("waiting for auth");
                console.log(Auth);
                return Auth.$requireAuth();

              }]
            }
            })

            // route for the about page
            .when('/login', {
                templateUrl : 'assets/js/views/login.html',
                controller  : 'login',
                  resolve: {
    // controller will not be loaded until $requireAuth resolves
    // Auth refers to our $firebaseAuth wrapper in the example above
    "currentAuth": ["Auth", function(Auth) {
      // $requireAuth returns a promise so the resolve waits for it to complete
      // If the promise is rejected, it will throw a $stateChangeError (see above)
      console.log("require for auth");
      return Auth.$waitForAuth();
    }]
  }

            })

            // route for the contact page
            .when('/register', {
                templateUrl : 'assets/js/views/register.html',
                controller  : 'mainController'
            });
    }]);