'use strict';

angular.module('wtm.controllers', [])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $scope.expiresOn = new Date(3014, 5, 3);
        $scope.currentDate = new Date();
        $rootScope.home = function() {
          $scope.slide = 'slide-right';
          $location.url('/');
        }
        $rootScope.go = function(path){
          $scope.slide = 'slide-left';
          $location.url(path);
        }
        $rootScope.exit = function(path){
        	navigator.app.exitApp();
        }
    }])
    .controller('HomeCtrl', ['$scope', 'Question', function ($scope, Question) {
    	Question.reset();
        $scope.goHome = function () {
        	
            if ((window.location) && (window.location.hash) && (window.location.hash.indexOf('home') > 0)) {
                navigator.app.exitApp();   // This will exit the application
            }
            else {
                $location.path('/home');  // This will redirect the application to home page
                if (!$scope.$$phase)
                    $scope.$apply();
            }
        }
    }])
    .controller('QuestionCtrl', ['$scope', '$routeParams', 'Question', 'QuestionCounter', 'Common', function ($scope, $routeParams, Question, QuestionCounter, Common) {
        if ($routeParams.bani != null) Question.setBani($routeParams.bani);
        // Question.checkSerially();
        $scope.ques = Question.random();
        // $scope.ques = Question.get("111", "111_1");
        $scope.option = $scope.ques.qOpt; // Question.getOptions($scope.ques);
        $scope.wordPunj = $scope.option.wordPunj;
        $scope.wordEng = $scope.option.wordEng;
        $scope.questionPunjPart1 = (' '+$scope.ques.quesPunj).substr(0,(' '+$scope.ques.quesPunj).indexOf(' '+$scope.option.wordPunj+' '));
        $scope.questionPunjPart3 = (' '+$scope.ques.quesPunj).substr((' '+$scope.ques.quesPunj).indexOf(' '+$scope.option.wordPunj+' ')+(' '+$scope.option.wordPunj+' ').length);
        $scope.questionEngPart1 = (' '+$scope.ques.quesEng).substr(0,(' '+$scope.ques.quesEng).indexOf(' '+$scope.option.wordEng+' '));
        $scope.questionEngPart3 = (' '+$scope.ques.quesEng).substr((' '+$scope.ques.quesEng).indexOf(' '+$scope.option.wordEng+' ')+(' '+$scope.option.wordEng+' ').length);
        $scope.progressText = QuestionCounter.quesCounterText();
        // var optionArr = [$scope.option.opAEng, $scope.option.opBEng, $scope.option.opCEng, $scope.option.opDEng];
        // $scope.options = optionArr; // Common.shuffle(optionArr);
        // $scope.optionsPunj = [$scope.option.opAPunj, $scope.option.opBPunj, $scope.option.opCPunj, $scope.option.opDPunj];
        $scope.options = _.shuffle(_.zip([$scope.option.opAEng, $scope.option.opBEng, $scope.option.opCEng, $scope.option.opDEng], [$scope.option.opAPunj, $scope.option.opBPunj, $scope.option.opCPunj, $scope.option.opDPunj]));
        // $scope.getDebugInfo = Question.debugGetDebugInfo();
    }])
    .controller('AnswerCtrl', ['$scope', '$routeParams', '$rootScope', 'Question', 'QuestionCounter', function ($scope, $routeParams, $rootScope, Question, QuestionCounter) {
        $scope.ques = Question.validateAndGet($routeParams.qId, $routeParams.oId, $routeParams.selAns);
        $scope.option = $scope.ques.qOpt; // Question.getOptions($scope.ques);

        $scope.quesEng = $scope.ques.quesEng;
        $scope.quesPunj = $scope.ques.quesPunj;
        $scope.wordEng = $scope.option.wordEng;
        $scope.wordPunj = $scope.option.wordPunj;
        $scope.ansEng = $scope.option.ansEng;
        $scope.ansPunj = $scope.option.ansPunj;
        $scope.explEng = $scope.ques.explEng;
        $scope.explPunj = $scope.ques.explPunj;
        $scope.selAns = $routeParams.selAns;

        $scope.isComplete = Question.isComplete();
        $scope.progressText = QuestionCounter.scoreText();
        $scope.swipeLeft = function() {
        	if ($scope.isComplete) 
        		$rootScope.go('/score'); 
        	else 
        		$rootScope.go('/ques');
        }
        // $scope.getDebugInfo = Question.debugGetDebugInfo();
    }])
    .controller('TestCtrl', ['$scope', '$routeParams', 'Question', 'QuestionCounter', function ($scope, $routeParams, Question, QuestionCounter) {
        $scope.allQues = Question.getAllQuestions();
        $scope.allOptions = Question.getAllOptions();
    }])
    .controller('ScoreCtrl', ['$scope', '$location', '$routeParams', 'Question', 'QuestionCounter', function ($scope, $location, $routeParams, Question, QuestionCounter) {
        $scope.score = QuestionCounter.scoreText();
        $scope.allQuiz = Question.getQuestionsCovered();
        $scope.success = Question.getSuccessList();
        $scope.feedback = QuestionCounter.feedback();
        $scope.restart = function() {
        	Question.reset();
            $scope.slide = 'slide-left';
            $location.url('/ques');
        };
    }])
    ;
