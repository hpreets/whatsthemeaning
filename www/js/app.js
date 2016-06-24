angular.module('wtm', ['ionic', 'wtm.controllers', 'wtm.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

	var backButton = $ionicPlatform.onHardwareBackButton(function(e) {
	  e.preventDefault();
	  e.stopPropagation();
	  return false;
    });
	
	var deregister = $ionicPlatform.registerBackButtonAction(function(e) {
	  e.preventDefault();
	  e.stopPropagation();
	  return false;
    }, 101);
	
	// $ionicPlatform.on('backbutton', backButton);
	// $scope.on('$destroy', deregister);
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
    .state('app.firstlearn', {
      url: "/learn/:reset/:bani",
      views: {
        'menuContent' :{
          templateUrl: "templates/learnmode.html",
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
    .state('app.learn', {
      url: "/learn",
      views: {
        'menuContent' :{
          templateUrl: "templates/learnmode.html",
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
    .state('app.scoreboard', {
      url: "/scoreboard",
      views: {
        'menuContent' :{
          templateUrl: "templates/scoreboard.html",
          controller: 'ScoreBoardCtrl'
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
    .state('app.incorrect', {
      url: "/incorrect",
      views: {
        'menuContent' :{
          templateUrl: "templates/incorrect.html",
          controller: 'IncorrectCtrl'
        }
      }
    })
    .state('app.incdetail', {
      url: "/incdetail/:baniId",
      views: {
        'menuContent' :{
          templateUrl: "templates/incdet.html",
          controller: 'IncorrectDetailCtrl'
        }
      }
    })

	;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
