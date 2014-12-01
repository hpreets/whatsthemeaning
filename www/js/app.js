angular.module('wtm', ['ionic', 'wtm.controllers', 'wtm.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' : {
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.credit', {
      url: "/credits",
      views: {
        'menuContent' :{
          templateUrl: "templates/credits.html"
        }
      }
    })
    .state('app.firstques', {
      url: "/ques/:reset/:bani",
      views: {
        'menuContent' :{
          templateUrl: "templates/question.html",
          controller: 'QuestionCtrl'
        }
      }
    })

    .state('app.playagain', {
      url: "/ques/:reset",
      views: {
        'menuContent' :{
          templateUrl: "templates/question.html",
          controller: 'QuestionCtrl'
        }
      }
    })
    .state('app.ques', {
      url: "/ques",
      views: {
        'menuContent' :{
          templateUrl: "templates/question.html",
          controller: 'QuestionCtrl'
        }
      }
    })
    .state('app.ans', {
      url: "/ans/:qId/:oId/:selAns",
      views: {
        'menuContent' :{
          templateUrl: "templates/answer.html",
          controller: 'AnswerCtrl'
        }
      }
    })
    .state('app.score', {
      url: "/score",
      views: {
        'menuContent' :{
          templateUrl: "templates/score.html",
          controller: 'ScoreCtrl'
        }
      }
    })
    .state('app.setting', {
      url: "/setting",
      views: {
        'menuContent' :{
          templateUrl: "templates/setting.html",
          controller: 'SettingCtrl'
        }
      }
    })

	;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

