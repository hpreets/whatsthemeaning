angular.module('wtm.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Exit App
  $scope.exit = function() {
    navigator.app.exitApp();
  };

})

.controller('HomeCtrl', function ($scope, Question) {
	Question.reset();
})

.controller('QuestionCtrl', function ($scope, $stateParams, $localstorage, Question) {
	$scope.showTranslit = $localstorage.get('showTransliteration', false) === 'true';
	// alert('Inside QuestionCtrl');
	if ($stateParams.reset == 'true') {
		Question.reset();
	}
	if ($stateParams.bani != null) {
		Question.setBani($stateParams.bani);
	}
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
	$scope.progressText = Question.quesCounterText();
	// var optionArr = [$scope.option.opAEng, $scope.option.opBEng, $scope.option.opCEng, $scope.option.opDEng];
	// $scope.options = optionArr; // Common.shuffle(optionArr);
	// $scope.optionsPunj = [$scope.option.opAPunj, $scope.option.opBPunj, $scope.option.opCPunj, $scope.option.opDPunj];
	$scope.options = _.shuffle(_.zip([$scope.option.opAEng, $scope.option.opBEng, $scope.option.opCEng, $scope.option.opDEng], [$scope.option.opAPunj, $scope.option.opBPunj, $scope.option.opCPunj, $scope.option.opDPunj]));
	// $scope.getDebugInfo = Question.debugGetDebugInfo();
})

.controller('AnswerCtrl', function ($scope, $stateParams, $state, $ionicGesture, $localstorage, Question) {
	$scope.showTranslit = $localstorage.get('showTransliteration', false) === 'true';
	$scope.ques = Question.validateAndGet($stateParams.qId, $stateParams.oId, $stateParams.selAns);
	$scope.option = $scope.ques.qOpt; // Question.getOptions($scope.ques);

	$scope.quesEng = $scope.ques.quesEng;
	$scope.quesPunj = $scope.ques.quesPunj;
	$scope.wordEng = $scope.option.wordEng;
	$scope.wordPunj = $scope.option.wordPunj;
	$scope.ansEng = $scope.option.ansEng;
	$scope.ansPunj = $scope.option.ansPunj;
	$scope.explEng = $scope.ques.explEng;
	$scope.explPunj = $scope.ques.explPunj;
	$scope.selAns = $stateParams.selAns;

	$scope.isComplete = Question.isComplete();
	$scope.progressText = Question.scoreText();
	
	if ($scope.selAns == $scope.ansEng) { 
		$scope.barType = 'bar-balanced'; 
		$scope.title = 'CORRECT';
	}
	else { 
		$scope.barType = 'bar-assertive' 
		$scope.title = 'INCORRECT';
	};
	$scope.title += ' | Score: ' + $scope.progressText;
	
    var element = angular.element(document.querySelector('#answerDetails'));
	$ionicGesture.on('dragleft', function (event) {
      $scope.$apply(function () {
        if ($scope.isComplete) $state.go('app.score'); else $state.go('app.ques');
      });
    }, element);

	/*$scope.swipeLeft = function() {
		if ($scope.isComplete) 
			$rootScope.go('/score'); 
		else 
			$rootScope.go('/ques');
	}*/
	// $scope.getDebugInfo = Question.debugGetDebugInfo();
})

.controller('ScoreCtrl', function ($scope, $localstorage, Question) {
	$scope.showTranslit = $localstorage.get('showTransliteration', false) === 'true';
	$scope.score = Question.scoreText();
	$scope.allQuiz = Question.getQuestionsCovered();
	$scope.success = Question.getSuccessList();
	$scope.feedback = Question.feedback();
})

.controller('SettingCtrl', function ($scope, $localstorage) {
	$scope.data = {};
	$scope.data.showTranslit = $localstorage.get('showTransliteration', 'false') === 'true';
	$scope.updateTranslit = function() {
		$localstorage.set('showTransliteration', $scope.data.showTranslit);
		console.log($localstorage.get('showTransliteration', 'false'));
	};
})
;
