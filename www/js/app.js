angular.module('wtm', ['ionic', 'wtm.controllers', 'wtm.services', 'wtm.directives', 'ngCordova'])

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

  String.prototype.fixForHindi = function() {
    /*return (' ' + this).replace(/suixAY/g, 'suixEy').replace(/ iek/g, ' ek').replace(/wiek/g, 'wek').replace(/AYsw/g, 'Eysw')
                    .replace(/EVk/g, "AoVk").replace(/Eih/g, 'Aoih').replace(/Eh/g, 'Aoh').replace(/EQY/g, 'AoQY').replace(/haumY/g, 'hamY')
                    .replace(/paux/g, 'pax').replace(/duie/g, 'due').replace(/Enw/g, 'Aonw')
                .replace(/wie /g, 'we ').replace(/ ie/g, ' e').replace(/weI /g, 'weé ').replace(/eIAY/g, 'eéEy')
                    .replace(/eIAih/g, 'eéAih').replace(/oie/g, 'oe').replace(/AweIAw/g, 'AweéAw').replace(/yie/g, 'ye')
                    .replace(/wieE/g, 'weAo')
                .replace(/eI /g, 'eé ').replace(/ au/g, ' a').replace(/au /g, 'a ').replace(/ieAw/g, 'eAw').replace(/aU/g, 'å')
                  .replace(/wey/g, 'wE')
                  .replace(/IAY/g, 'IEy').replace(/eI/g, 'eé') // .replace(/E /g, "Ao ")
                .replace(/ru/g, '{').replace(/rU/g, '}').replace(/µ/g, 'N')
                .replace(/ey/g, 'E').replace(/AY/g, 'Ey').replace(/E/g, 'Ao').replace(/au/g, 'a').replace(/ie/g, 'e')
                .replace(/ ƒ /g, ' nUM ').replace(/ <> /g, '< ').replace(/<> /g, '< '); //  haumY */
    return (' ' + this)
                
                .replace(/Vu/g, 'V£').replace(/VU/g, 'V¢').replace(/kR/g, 'k®').replace(/z/g, 'jæ')
                .replace(/ru/g, '{').replace(/rU/g, '}').replace(/µ/g, 'N')
                .replace(/E/g, 'Ao')
                .replace(/eI/g, 'eé')
                .replace(/ey/g, 'E').replace(/AY/g, 'Ey').replace(/au/g, 'a').replace(/ie/g, 'e')
                .replace(/ ƒ /g, ' nUM ').replace(/ <> /g, '< ').replace(/<> /g, '< '); //  haumY 
  }
	
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
    .state('app.ques', {
      url: "/ques/:reset/:bani",
      views: {
        'menuContent' :{
          templateUrl: "templates/question.html",
          controller: 'QuestionCtrl'
        }
      }
    })
    .state('app.learn', {
      url: "/learn/:reset/:bani",
      views: {
        'menuContent' :{
          templateUrl: "templates/learnmode.html",
          controller: 'LearnCtrl'
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
    /*.state('app.ques', {
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
    })*/
    .state('app.ans', {
      url: "/ans/:qId/:oId/:selAns/:bani",
      views: {
        'menuContent' :{
          templateUrl: "templates/answer.html",
          controller: 'AnswerCtrl'
        }
      }
    })
    .state('app.queswithid', {
      url: "/ques/:reset/:bani/:qId",
      views: {
        'menuContent' :{
          templateUrl: "templates/question.html",
          controller: 'QuestionCtrl'
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
