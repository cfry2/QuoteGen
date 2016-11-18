/*

	entry point for angularJS instantiates the app as well as references Firebase
	Created by Cameron Fry on 16/12/2015
*/


var app = angular.module('qApp', ["ngRoute", "firebase", "ngStorage", 'mm.foundation']);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://dazzling-inferno-5138.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);