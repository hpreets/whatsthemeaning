angular.module('wtm.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Exit App
  $scope.exit = function() {
    navigator.app.exitApp();
  };

})

.controller('HomeCtrl', function ($scope, $localstorage, $timeout, Question) {
	Question.reset();
	$scope.data = {};
	$scope.startBani = $localstorage.get('startingBani', 'akv');

	// $scope.startBani = 'japji';
})

.controller('QuestionCtrl', function ($scope, $stateParams, $localstorage, $timeout, $ionicModal, Question) {
	var debugMode = true;
	$scope.showTranslit = $localstorage.get('showTransliteration', false) === 'true';
	if ($localstorage.get('askSerially', false) === 'true') Question.checkSerially(); else Question.checkRandomly();
	// Question.checkSerially();
 	// Question.checkSeriallyOptions();
	
	if ($stateParams.reset == 'true') {
		Question.reset();
	}
	if ($stateParams.bani != null) {
		Question.resetQuestions();
		Question.setBani($stateParams.bani);
	}

	$scope.goQuestion = function() {
		$scope.answer = false;

		var quesCompletedTill = $localstorage.get('qCompTill_' + $stateParams.bani, 0);

		if ($localstorage.get('askSerially', false) === 'true') $scope.ques = Question.getQuesOnwards(quesCompletedTill);
		else $scope.ques = Question.random();
		// $scope.ques = Question.get("60", "60_0");

		$scope.option = $scope.ques.qOpt; // Question.getOptions($scope.ques);
		$scope.wordPunj = $scope.option.wordPunj;
		$scope.wordEng = $scope.option.wordEng;
		$scope.questionPunjParts = getSplittedTuk($scope.ques.quesPunj, $scope.option.wordPunj);
		// $scope.questionPunjPart1 = (' '+$scope.ques.quesPunj).substr(0,(' '+$scope.ques.quesPunj).indexOf(' '+$scope.option.wordPunj+' '));
		// $scope.questionPunjPart3 = (' '+$scope.ques.quesPunj).substr((' '+$scope.ques.quesPunj).indexOf(' '+$scope.option.wordPunj+' ')+(' '+$scope.option.wordPunj+' ').length);
		$scope.questionEngParts = getSplittedTuk($scope.ques.quesEng, $scope.option.wordEng);
		// $scope.questionEngPart1 = (' '+$scope.ques.quesEng).substr(0,(' '+$scope.ques.quesEng).indexOf(' '+$scope.option.wordEng+' '));
		// $scope.questionEngPart3 = (' '+$scope.ques.quesEng).substr((' '+$scope.ques.quesEng).indexOf(' '+$scope.option.wordEng+' ')+(' '+$scope.option.wordEng+' ').length);
		$scope.progressText = Question.quesCounterText();
		$scope.title = 'Question ' + $scope.progressText;
		// var optionArr = [$scope.option.opAEng, $scope.option.opBEng, $scope.option.opCEng, $scope.option.opDEng];
		// $scope.options = optionArr; // Common.shuffle(optionArr);
		// $scope.optionsPunj = [$scope.option.opAPunj, $scope.option.opBPunj, $scope.option.opCPunj, $scope.option.opDPunj];
		$scope.options = _.shuffle(_.zip([$scope.option.opAEng, $scope.option.opBEng, $scope.option.opCEng, $scope.option.opDEng], [$scope.option.opAPunj, $scope.option.opBPunj, $scope.option.opCPunj, $scope.option.opDPunj]));
		$scope.correctAnswerIndex = -1;
		for (var i = 0; i < 4; i++) {
			if ($scope.option.ansEng == $scope.options[i][0]) $scope.correctAnswerIndex = i;
		}
		// $scope.getDebugInfo = Question.debugGetDebugInfo();
		$scope.barType = 'bar-positive';
		$scope.showOptions = false;
		/*$scope.option1Class = 'button-positive';
		$scope.option2Class = 'button-positive';
		$scope.option3Class = 'button-positive';
		$scope.option4Class = 'button-positive';*/
		
		$timeout(function() {
			$scope.showOptions = true;
			/*$scope.showOption1 = $scope.showOptions || false;
			$scope.showOption2 = $scope.showOptions || false;
			$scope.showOption3 = $scope.showOptions || false;
			$scope.showOption4 = $scope.showOptions || false;*/
		}, 2000);

		$scope.shabad = $scope.ques.shbd != null ? getSplittedTuk($scope.ques.shbd.shabdPunj, $scope.ques.quesPunj) : null;
		$scope.tuk = $scope.ques.quesPunj;
		$ionicModal.fromTemplateUrl('./templates/modal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal) {
		    $scope.modal = modal
		})  

		$scope.openModal = function() {
		    $scope.modal.show()
		}

		$scope.closeModal = function() {
		    $scope.modal.hide();
		};

		$scope.$on('$destroy', function() {
		    $scope.modal.remove();
		});

	};
	
	getSplittedTuk = function(tuk, word) {
		var splitArr = tuk.split(word);
		if (_.size(splitArr) > 2) {
			splitArr[1] = _.rest(splitArr, 1).join(' ' + word + ' ');
		}
		return splitArr;
	};


	$scope.goAnswer = function(quesId, optionId, selectedAns) {
		/*$scope.showOption1 = false;
		$scope.showOption2 = false;
		$scope.showOption3 = false;
		$scope.showOption4 = false;*/
		/*$scope.option1Class = 'button-stable';
		$scope.option2Class = 'button-stable'; 
		$scope.option3Class = 'button-stable';
		$scope.option4Class = 'button-stable';*/
		
		/*if ($scope.correctAnswerIndex == 0) $scope.option1Class = 'button-balanced'; // $scope.showOption1 = true;
		else if ($scope.correctAnswerIndex == 1) $scope.option2Class = 'button-balanced'; // $scope.showOption2 = true;
		else if ($scope.correctAnswerIndex == 2) $scope.option3Class = 'button-balanced'; // $scope.showOption3 = true;
		else if ($scope.correctAnswerIndex == 3) $scope.option4Class = 'button-balanced'; // $scope.showOption4 = true;*/

		// $scope.ques = Question.validateAndGet(quesId, optionId, selectedAns); // This resulted in jumping of another question while serial
		if (Question.isSerial()) $localstorage.set('qCompTill_' + $stateParams.bani, Number(quesId)+1);
		Question.validate($scope.ques, selectedAns);
		$scope.quesEng = $scope.ques.quesEng;
		$scope.quesPunj = $scope.ques.quesPunj;
		$scope.option = $scope.ques.qOpt;
		$scope.wordEng = $scope.option.wordEng;
		$scope.wordPunj = $scope.option.wordPunj;
		$scope.ansEng = $scope.option.ansEng;
		$scope.ansPunj = $scope.option.ansPunj;
		$scope.explEng = $scope.ques.explEng;
		$scope.explPunj = $scope.ques.explPunj;
		
		$timeout(function() {
			$scope.answer = true;
			$scope.showOptions = false;
			$scope.selAns = selectedAns;
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
		}, 0);
	};

	open = $scope.goQuestion();
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

.controller('SettingCtrl', function ($scope, $localstorage, Question) {
	$scope.data = {};
	$scope.data.showTranslit = $localstorage.get('showTransliteration', 'false') === 'true';
	$scope.data.startingBani = $localstorage.get('startingBani', 'akv');
	$scope.data.startingBaniList = [
		{ text: "Asa Di Vaar", value: "akv" },
		{ text: "Japji", value: "japji" },
		{ text: "Assorted", value: "misc" },
		{ text: "Salok M:9", value: "slokm9" }
	];
	$scope.data.askSerially = $localstorage.get('askSerially', 'false') === 'true';
  
	$scope.updateTranslit = function() {
		$localstorage.set('showTransliteration', $scope.data.showTranslit);
	};

	$scope.updateStartingBani = function() {
		$localstorage.set('startingBani', $scope.data.startingBani);
	};

	$scope.updateAskSerially = function() {
		$localstorage.set('askSerially', $scope.data.askSerially);
		if ($scope.data.askSerially) Question.checkSerially(); else Question.checkRandomly();
	};
})
;
