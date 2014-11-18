'use strict';

angular.module('wtm', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'wtm.controllers',
    'wtm.services'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/ques/:bani', {templateUrl: 'partials/question.html', controller: 'QuestionCtrl'});
    $routeProvider.when('/ques', {templateUrl: 'partials/question.html', controller: 'QuestionCtrl'});
    $routeProvider.when('/ans/:qId/:oId/:selAns', {templateUrl: 'partials/answer.html', controller: 'AnswerCtrl'});
    $routeProvider.when('/score', {templateUrl: 'partials/score.html', controller: 'ScoreCtrl'});
    $routeProvider.when('/test', {templateUrl: 'partials/test.html', controller: 'TestCtrl'});
    $routeProvider.when('/testoption', {templateUrl: 'partials/testoption.html', controller: 'TestCtrl'});
    $routeProvider.otherwise({redirectTo: '/home'});
}]);

/*
var onDeviceReady = function(){
    document.addEventListener("backbutton", function(e){
    	e.preventDefault();
    }, false);
};
document.addEventListener("deviceready", onDeviceReady, false);
*/
