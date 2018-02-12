angular.module('wtm.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Exit App
  $scope.exit = function() {
    navigator.app.exitApp();
  };

})

.controller('HomeCtrl', function ($scope, $localstorage, $timeout, Question, $ionicModal, BaniTopics, $location, $ionicPopup) {
	Question.reset();
	$scope.data = {};
	// $scope.startBani = $localstorage.get(LSVAR_STARTING_BANI, CONFIG_STARTING_BANI);
	// $localstorage.set('qCompTill_akv', '454'); // 
	// $localstorage.set('qCompTill_japji', '3'); // 
	// $localstorage.set(LSVAR_SHOW_HINDI, 'false');
	// $scope.showHindi = $localstorage.get(LSVAR_SHOW_HINDI, false) === 'true';

	
	if ($localstorage.get(LSVAR_ASK_SERIALLY, null) === null) $localstorage.set(LSVAR_ASK_SERIALLY, CONFIG_DEFAULT_ASK_SERIALLY);
	if ($localstorage.get(LSVAR_SHOW_HINDI_DIALOG, null) === null) $localstorage.set(LSVAR_SHOW_HINDI_DIALOG, 'true');
	$scope.showHindi = $localstorage.get(LSVAR_SHOW_HINDI, false) === 'true';
	// $scope.startBani = 'japji';

	$scope.baniTopics = BaniTopics.getBaniTopics();
	console.log($scope.baniTopics);

	$scope.openQuiz = function(baniId) {
		var learnMode = $localstorage.getLearnMode(false) === 'true';
		if (learnMode) $location.path('/app/learn/true/' + baniId);
		else $location.path('/app/ques/true/' + baniId);
	}

	/*setModelDialog = function(modelUrl, animation) {
		$ionicModal.fromTemplateUrl(modelUrl, {
		    scope: $scope,
		    animation: animation
		}).then(function(modal) {
		    $scope.modal = modal
		});

		$scope.openModal = function() {
		    $scope.modal.show();
		};

		$scope.closeModal = function() {
		    $scope.modal.hide();
		};

		$scope.$on('$destroy', function() {
		    $scope.modal.remove();
		});
	};*/

	setModelDialog('./templates/modalhelp.html', 'slide-in-up', $ionicModal, $scope);
	// var myPopup = createPopupObject(null, 'templates/dialog.html', 'Gurbani Bodh in Hindi', '', null, $scope, $ionicPopup);

	if ($localstorage.get(LSVAR_SHOW_HINDI_DIALOG, 'false') === 'true') {
		setModel2Dialog('./templates/dialog.html', 'slide-in-up', $ionicModal, $scope, $localstorage);
		console.log($scope.modal2);
		$timeout(function() {
			$scope.modal2.show();
		}, 1500);
	}
})

.controller('QuestionCtrl', function ($scope, $stateParams, $localstorage, $timeout, $ionicModal, Question, CommonUtils, $ionicPopup, $ionicBackdrop, $ionicLoading, $location) {

	$scope.goQuestion = function() {

		console.log('Inside QuestionCtrl');
		var debugMode = true;
		// $localstorage.set('qCompTill_japji', '206'); // 
		// var learnMode = $localstorage.getLearnMode(false) === 'true';
		// var onAnswerPage = false;
		$scope.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, false) === 'true';
		$scope.showHindi = $localstorage.get(LSVAR_SHOW_HINDI, false) === 'true';
		console.log('$scope.showHindi ::: ' + $scope.showHindi);
		if ($localstorage.get(LSVAR_ASK_SERIALLY, true) === 'true') Question.checkSerially(); else Question.checkRandomly();
		// Question.checkSerially();
	 	// Question.checkSeriallyOptions();
		
		if ($stateParams.reset == 'true') {
			Question.reset();
		}
		if ($stateParams.bani != null) {
			Question.resetQuestions();
			Question.setBani($stateParams.bani);
		}

		console.log('Inside goQuestion');
		// onAnswerPage = false;
		// hideAllSections();
		$ionicBackdrop.retain();
		/*if (!learnMode)*/ fetchQuestion($stateParams.bani);
		// $scope.allShabads = Question.getAllShabads();

		setModelDialog('./templates/modal.html', 'slide-in-up', $ionicModal, $scope);
		var myPopup = createPopupObject('<h1 class="text-center" style="align:center">{{questionProgress}}</h1>', null, 'Question', '', null, $scope, $ionicPopup);
		$timeout(function() {
			/*$scope.showTuk = true;
			$scope.showQuesWord = true;*/
			$scope.show4Options = false;
			/*$scope.showAnsWord = false;
			$scope.showMeaning = false;
			$scope.showBtnGoQues = false;
			$scope.showBtnGoMeaning = false;
			$scope.showBtnGoTuk = false;*/
			$scope.qwordStyle = 'color:red';

			/*$location.hash('topOfPage');
			$anchorScroll();*/

			// $scope.stage='before-question';
			// $timeout(function() {
				myPopup.close();
				$ionicBackdrop.release();
				// $scope.stage='question';
				$timeout(function() {
					$scope.fourOptionClass = [ 'button-positive', 'button-positive', 'button-positive', 'button-positive' ];
					$scope.showOptions = true;
					$scope.show4Options = true;
				}, 1500); // 2000
			//}, 750); // 750
		}, 750);
	}

	$scope.goTuk = function() {
		console.log('Inside goTuk');
		/*if (learnMode) {
			$scope.showTuk = true;
			$scope.showQuesWord = false;
			$scope.show4Options = false;
			$scope.showAnsWord = false;
			$scope.showMeaning = false;
			$scope.showBtnGoQues = true;
			$scope.showBtnGoMeaning = true;
			$scope.showBtnGoTuk = false;
			$scope.qwordStyle = '';
			fetchQuestion($stateParams.bani);
			setModelDialog('./templates/modal.html', 'slide-in-up');
		}
		else {*/
			$scope.goQuestion();
		/*}*/
	}

	/*$scope.goMeaning = function() {
		$scope.showTuk = true;
		$scope.showQuesWord = false;
		$scope.show4Options = false;
		$scope.showAnsWord = false;
		$scope.showMeaning = true;
		$scope.showBtnGoQues = true;
		$scope.showBtnGoMeaning = false;
		$scope.showBtnGoTuk = false;
		$scope.qwordStyle = '';
	}*/

	$scope.goAnswer = function(quesId, optionId, selectedAns, btnIdx) {
		// if (onAnswerPage) return;
		// onAnswerPage = true;
		$scope.fourOptionClass = [ 'btn-disabled', 'btn-disabled', 'btn-disabled', 'btn-disabled' ];
		$scope.fourOptionClass[btnIdx] = 'button-assertive';
		$scope.fourOptionClass[$scope.correctAnswerIndex] = 'button-balanced';
		console.log('btnIdx: ' + btnIdx + '; correctAnswerIndex: ' + $scope.correctAnswerIndex);
		console.log('$scope.ques :::' + $scope.ques);
		/*
		addCurrQuesTrackerToStorage(Question.isSerial(), $stateParams.bani, Number(quesId)+1);
		var isCorrect = Question.validate($scope.ques, selectedAns);
		addScoreToStorage($stateParams.bani, isCorrect, Question.isComplete());
		addIncorrectToStorage($stateParams.bani, isCorrect, quesId, optionId);
		$scope.resultText = 'INCORRECT';
		if (isCorrect) $scope.resultText = 'CORRECT';*/

		$timeout(function() {
			var bani = $stateParams.bani;
			$location.path('/app/ans/'+quesId+'/'+optionId+'/'+selectedAns+'/'+bani);
		}, 2000); // 750
	}

	/*hideAllSections = function() {
		$scope.showTuk = false;
		$scope.showQuesWord = false;
		$scope.show4Options = false;
		$scope.showAnsWord = false;
		$scope.showMeaning = false;
		$scope.showBtnGoQues = false;
		$scope.showBtnGoMeaning = false;
		$scope.showBtnGoTuk = false;
		$scope.qwordStyle = '';
	}*/

	fetchQuestion = function(bani) {
		// $scope.answer = false;
		
		var quesCompletedTill = $localstorage.get('qCompTill_' + $stateParams.bani, 0);
		console.log('QuestionCtrol ::: fetchQuestion ::: quesCompletedTill :::' + quesCompletedTill);

		var quesId = $stateParams.qId;
		console.log('fetchQuestion ::: quesId :::' + quesId);
		if (quesId == null) {
			if ($localstorage.get(LSVAR_ASK_SERIALLY, true) === 'true') $scope.ques = Question.getQuesOnwards(quesCompletedTill);
			else $scope.ques = Question.random();
		}
		else {
			$scope.ques = Question.getQuesFromId(quesId);
		}
		
		// $scope.ques = Question.getQuesOnwards('17');
		// console.log('$scope.ques :::' + $scope.ques.quesEng);
		// console.log('$scope.ques :::' + JSON.stringify($scope.ques));

		setScopeVarsForQuestionBase($scope, Question.quesCounterText(), CommonUtils.getText(BANI_LIST, Question.getBani()), Question.success());
	}



	getNumber = function(inputParam) {
		if (isNaN(inputParam)) return 0; else return Number(inputParam);
	}

	/*$scope.goToScore = function() {
		$location.path('/app/score');
	}*/

	open = $scope.goTuk();
})

.controller('AnswerCtrl', function ($scope, $stateParams, $state, $ionicGesture, $localstorage, $location, $ionicModal, $timeout, Question, CommonUtils) {

	/*setScopeVarsForQuestion = function() {
		$scope.option = $scope.ques.qOpt; // Question.getOptions($scope.ques);
		$scope.wordPunj = $scope.option.wordPunj;
		$scope.wordEng = $scope.option.wordEng;
		$scope.questionPunjParts = getSplittedTuk($scope.ques.quesPunj.replace(/,/g,""), $scope.option.wordPunj);
		$scope.questionEngParts = getSplittedTuk($scope.ques.quesEng, $scope.option.wordEng);

		$scope.progressText = Question.quesCounterText();
		$scope.questionProgress = $scope.progressText;
		$scope.title = CommonUtils.getText(BANI_LIST, Question.getBani()); // 'Question ' + $scope.progressText;

		$scope.options = _.shuffle(_.zip([$scope.option.opAEng, $scope.option.opBEng, $scope.option.opCEng, $scope.option.opDEng], [$scope.option.opAPunj, $scope.option.opBPunj, $scope.option.opCPunj, $scope.option.opDPunj]));
		$scope.correctAnswerIndex = -1;
		for (var i = 0; i < 4; i++) {
			if ($scope.option.ansEng == $scope.options[i][0]) $scope.correctAnswerIndex = i;
		}
		// $scope.getDebugInfo = Question.debugGetDebugInfo();
		$scope.barType = 'bar-positive';
		$scope.showOptions = false;
		
		$scope.score = Question.success();

		$scope.shabad = $scope.ques.shbd != null ? getSplittedTuk($scope.ques.shbd.shabdPunj, $scope.ques.quesPunj) : null;
		$scope.tuk = $scope.ques.quesPunj;
		$scope.explEng = $scope.ques.explEng;
		$scope.explPunj = $scope.ques.explPunj.split(' *** ');
		$scope.ansEng = $scope.option.ansEng;
		$scope.ansPunj = $scope.option.ansPunj;

		$scope.relatedTuks = $scope.option.relatedTuks;

		console.log($scope.wordPunj + '--' + $scope.tuk + '--' + $scope.explEng);
	}*/

	addScoreToStorage = function (bani, isCorrectQues, isCorrectQuiz) {

		var played = getNumber($localstorage.get(LSVAR_SCORE_PLAYED + bani, 0));
		$localstorage.set(LSVAR_SCORE_PLAYED + bani, played+1);

		if (isCorrectQues) {
			var corr = getNumber($localstorage.get(LSVAR_SCORE_CORRECT + bani, 0));
			$localstorage.set(LSVAR_SCORE_CORRECT + bani, corr+1);

			if (isCorrectQuiz) {
				var quizCorr = getNumber($localstorage.get(LSVAR_SCORE_QUIZ_WON + bani, 0));
				$localstorage.set(LSVAR_SCORE_QUIZ_WON + bani, quizCorr+1);
			}
		}
	}

	addIncorrectToStorage = function (bani, isCorrect, quesId, optionId) {

		if (!isCorrect) {
			var incorrectAnswered = $localstorage.get(LSVAR_ANS_INCORRECT + bani, '');
			if (incorrectAnswered == '') incorrectAnswered += optionId; // optionId includes quesId
			else if ( (','+incorrectAnswered+',').indexOf(','+quesId+'_') < 0) incorrectAnswered += ',' + optionId;
			// else console.log('Already present in the Incorrect List --- optionId :::' + optionId);
			$localstorage.set(LSVAR_ANS_INCORRECT + bani, incorrectAnswered);
			// console.log('INCORRECT Saved :::' + $localstorage.get(LSVAR_ANS_INCORRECT + bani, ''));
		}
	}

	addCurrQuesTrackerToStorage = function (isSerial, bani, quesId) {
		if (isSerial) $localstorage.set(LSVAR_QUES_COMPLETED_TILL + bani, quesId);
	}

	onAnswerLoad = function() {
		console.log('Inside AnswerCtrl ::: onAnswerLoad :::');
		var learnMode = $localstorage.getLearnMode(false) === 'true';
		console.log('Inside AnswerCtrl ::: onAnswerLoad ::: learnMode :::' + learnMode);
		$scope.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, false) === 'true';
		$scope.showHindi = $localstorage.get(LSVAR_SHOW_HINDI, false) === 'true';
		console.log('Inside AnswerCtrl ::: onAnswerLoad ::: $scope.showTranslit :::' + $scope.showTranslit);

		var quesId = $stateParams.qId;
		var bani = $stateParams.bani;
		var selectedAns = $stateParams.selAns;
		var optionId = $stateParams.oId;
		console.log('Parameters :::' + quesId + '/' + optionId + '/' + selectedAns);

		addCurrQuesTrackerToStorage(Question.isSerial(), bani, Number(quesId)+1);
		// Fetch Question based on quesId
		$scope.ques = Question.getQuesFromId(quesId, optionId.split('_')[1]);
		console.log('Inside AnswerCtrl :::' + JSON.stringify($scope.ques));

		setScopeVarsForQuestionBase($scope, Question.quesCounterText(), CommonUtils.getText(BANI_LIST, Question.getBani()), Question.success());

		var isCorrect = Question.validate($scope.ques, selectedAns);
		addScoreToStorage($stateParams.bani, isCorrect, Question.isComplete());
		addIncorrectToStorage($stateParams.bani, isCorrect, quesId, optionId);
		$scope.resultText = 'INCORRECT';
		if (isCorrect) $scope.resultText = 'CORRECT';

		$scope.qwordStyle = 'color:red';

		$scope.stage = 'answer';
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
		console.log('Questions for "' + $stateParams.bani + '" completed till :: ' + $localstorage.get(LSVAR_QUES_COMPLETED_TILL + $stateParams.bani));
		// myPopup.close();
		setModelDialog('./templates/modal.html', 'slide-in-up', $ionicModal, $scope);
		$timeout(function() {
			$scope.score = Question.success();
		}, 150); // 750
	}

	/*$scope.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, false) === 'true';
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
	*/

	/*$scope.swipeLeft = function() {
		if ($scope.isComplete) 
			$rootScope.go('/score'); 
		else 
			$rootScope.go('/ques');
	}*/
	// $scope.getDebugInfo = Question.debugGetDebugInfo();
	$scope.goTuk = function() {
		var learnMode = $localstorage.getLearnMode(false) === 'true';
		if (learnMode) {
			$location.path('/app/learn/false/' + $stateParams.bani);
			// fetchQuestion($stateParams.bani);
			// setModelDialog('./templates/modal.html', 'slide-in-up');
		}
		else {
			$location.path('/app/ques/false/' + $stateParams.bani);
			// $scope.goQuestion();
		}
	}

	$scope.goToScore = function() {
		$location.path('/app/score');
	}

	addCurrQuesTrackerToStorage = function (isSerial, bani, quesId) {
		if (isSerial) $localstorage.set(LSVAR_QUES_COMPLETED_TILL + bani, quesId);
	}

	onAnswerLoad();
})

.controller('ScoreCtrl', function ($scope, $localstorage, $location, Question) {
	$scope.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, false) === 'true';
	$scope.score = Question.scoreText();
	$scope.allQuiz = Question.getQuestionsCovered();
	$scope.success = Question.getSuccessList();
	$scope.feedback = Question.feedback();
	$scope.bani = Question.getBani();
	$scope.showHindi = $localstorage.get(LSVAR_SHOW_HINDI, false) === 'true';
	$scope.learnMode = $localstorage.get(LSVAR_IS_LEARN_MODE, 'false') === 'true';

	$scope.goToQuestion = function() {
		var learnMode = $localstorage.getLearnMode(false);
		$location.path('/app/ques/true/' + $scope.bani);
	}
	$scope.updateLearnMode = function() {
		$localstorage.set(LSVAR_IS_LEARN_MODE, $scope.learnMode);
	};
})

.controller('SettingCtrl', function ($scope, $localstorage, Question) {
	$scope.data = {};
	$scope.data.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, 'false') === 'true';
	$scope.data.showHindi = $localstorage.get(LSVAR_SHOW_HINDI, 'false') === 'true';
	$scope.data.startingBani = $localstorage.get(LSVAR_STARTING_BANI, CONFIG_STARTING_BANI);
	$scope.data.startingBaniList = BANI_LIST;
	$scope.data.askSerially = $localstorage.get(LSVAR_ASK_SERIALLY, 'false') === 'true';
	$scope.data.learnMode = $localstorage.get(LSVAR_IS_LEARN_MODE, 'false') === 'true';
  
	$scope.updateTranslit = function() {
		$localstorage.set(LSVAR_SHOW_TRANSLITERATION, $scope.data.showTranslit);
	};

	$scope.updateHindi = function() {
		$localstorage.set(LSVAR_SHOW_HINDI, $scope.data.showHindi);
	};

	$scope.updateStartingBani = function() {
		$localstorage.set(LSVAR_STARTING_BANI, $scope.data.startingBani);
	};

	$scope.updateAskSerially = function() {
		$localstorage.set(LSVAR_ASK_SERIALLY, $scope.data.askSerially);
		// if ($scope.data.askSerially) Question.checkSerially(); else Question.checkRandomly();
	};
	$scope.updateLearnMode = function() {
		$localstorage.set(LSVAR_IS_LEARN_MODE, $scope.data.learnMode);
	};
})


.controller('IncorrectCtrl', function ($scope, $localstorage) {
	var baniIncorrect = [];
	for (var i = 0; i < BANI_LIST.length; i++) {
		var incorrect = { name: '', count: 0, data: '', banivalue: '', detUrl: '' };
		incorrect.name = BANI_LIST[i].text;
		incorrect.banivalue = BANI_LIST[i].value;
		incorrect.data = $localstorage.get(LSVAR_ANS_INCORRECT + BANI_LIST[i].value, '');
		// console.log(BANI_LIST[i].value + 'incorrect.data ::::' + incorrect.data);
		incorrect.count = (incorrect.data != '') ? incorrect.data.split(',').length : 0;
		incorrect.detUrl = (incorrect.count > 0) ? '#/app/incdetail/'+incorrect.banivalue : null;

		baniIncorrect.push(incorrect);
	}
	$scope.banisIncorrect = baniIncorrect;

})

.controller('IncorrectDetailCtrl', function ($scope, $stateParams, $localstorage, $location, Question) {

	$scope.baniId = $stateParams.baniId;
	for (var i = 0; i < BANI_LIST.length; i++) {
		if ($scope.baniId == BANI_LIST[i].value) $scope.baniText = BANI_LIST[i].text;
	}

	$scope.loadData = function() {
		Question.setBani($scope.baniId);
		var qIds = $localstorage.get(LSVAR_ANS_INCORRECT + $scope.baniId, '');
		var qIdList = qIds.split(',');
		// console.log('qIdList :::' + qIdList);
		// console.log('qIdList.length :::' + qIdList.length);
		var showHowMany = qIdList.length > 10 ? 10 : qIdList.length; // Show only 10 at a time
		var qList = [];
		for (var i = 0; i < showHowMany; i++) {
			var qId = qIdList[i].split('_')[0];
			var oId = qIdList[i].split('_')[1];
			qList.push(Question.getQuesFromId(qId, oId));
		}
		$scope.allIncorrect = qList;
		$scope.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, false) === 'true';
		$scope.showHindi = $localstorage.get(LSVAR_SHOW_HINDI, false) === 'true';
	}

	$scope.goToIncorrectList = function() {
		$location.path('/app/incorrect');
	}

	$scope.remove = function(qIdToRemove, oIdToRemove) {
		removeIncorrectFromStorage($scope.baniId, qIdToRemove, oIdToRemove);
		
		if ($localstorage.get(LSVAR_ANS_INCORRECT + $scope.baniId, '') == '') $location.path('/app/incorrect');
		else $scope.loadData();
	};

	$scope.loadData();

	removeIncorrectFromStorage = function (bani, quesId, optionId) {

		var incorrectAnswered = $localstorage.get(LSVAR_ANS_INCORRECT + bani, '');
		if (incorrectAnswered != '') {
			var qIdList = incorrectAnswered.split(',');
			qIdList = _.without(qIdList, optionId); // optionId includes quesId
			incorrectAnswered = '';
			for (var ctr = 0; ctr < qIdList.length; ctr++) {
				incorrectAnswered += qIdList[ctr];
				if (ctr + 1 < qIdList.length) incorrectAnswered += ',';
			}
		}
		$localstorage.set(LSVAR_ANS_INCORRECT + bani, incorrectAnswered);
	}

})

.controller('ScoreBoardCtrl', function ($scope, $localstorage) {
	$scope.baniList = BANI_LIST;
	// console.log('$scope.baniList :::' + BANI_LIST.length);
	var baniScores = [];
	var baniColors = [ "#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360" ];
	var played = [], correct = [], allQuiz = [];
	var totalP = 0, totalW = 0, totalA = 0;
	for (var i = 0; i < BANI_LIST_ADV.length; i++) {
		var score = { played: 0, correct: 0, allQuiz: 0, labelPlayed: SCORE_LABEL_PLAYED, labelCorrect: SCORE_LABEL_CORRECT, labelAllQuiz: SCORE_LABEL_QUIZ_WON, bani: BANI_LIST_ADV[i] };
		// console.log('BANI_LIST[i]:::' + i + '---' + BANI_LIST[i].value + '---' + BANI_LIST[i].text);
		score.played = $localstorage.get(LSVAR_SCORE_PLAYED + BANI_LIST_ADV[i].baniId, 0); // (Math.random()*100).toPrecision(2));
		totalP += Number(score.played);
		score.correct = $localstorage.get(LSVAR_SCORE_CORRECT + BANI_LIST_ADV[i].baniId, 0); // (Math.random()*100).toPrecision(2));
		totalW += Number(score.correct);
		score.allQuiz = $localstorage.get(LSVAR_SCORE_QUIZ_WON + BANI_LIST_ADV[i].baniId, 0); // (Math.random()*100).toPrecision(2));
		totalA += Number(score.allQuiz);
		baniScores.push(score);

		played.push({ value: score.played, color:BANI_LIST_ADV[i].backColor, highlight: BANI_LIST_ADV[i].backColor, label: BANI_LIST_ADV[i].engText});
		correct.push({ value: score.correct, color:BANI_LIST_ADV[i].backColor, highlight: BANI_LIST_ADV[i].backColor, label: BANI_LIST_ADV[i].engText});
		allQuiz.push({ value: score.allQuiz, color:BANI_LIST_ADV[i].backColor, highlight: BANI_LIST_ADV[i].backColor, label: BANI_LIST_ADV[i].engText});
	}
	var score = { played: totalP, correct: totalW, allQuiz: totalA, labelPlayed: SCORE_LABEL_PLAYED, labelCorrect: SCORE_LABEL_CORRECT, labelAllQuiz: SCORE_LABEL_QUIZ_WON, bani: 'Total', color: '' };
	baniScores.push(score);

	$scope.baniScores = baniScores;
	// console.log('baniScores:::' + baniScores);

	var ctxP = document.getElementById("playedChart").getContext("2d");
	var ctxW = document.getElementById("wonChart").getContext("2d");
	var ctxA = document.getElementById("allQuizChart").getContext("2d");
	var chartP = new Chart(ctxP).Pie(played, {});
	var chartW = new Chart(ctxW).Pie(correct, {});
	var chartA = new Chart(ctxA).Pie(allQuiz, {});
	// document.getElementById('js-legend').innerHTML = myDoughnutChart.generateLegend();
	// document.getElementById('js-legend').appendChild(document.getElementById('js-legend').firstChild);
	
})


.controller('LearnCtrl', function ($scope, $stateParams, $state, $ionicGesture, $localstorage, $location, $ionicModal, Question, CommonUtils) {

	onLearnPageLoad = function() {
		var learnMode = $localstorage.getLearnMode(false) === 'true';
		$scope.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, false) === 'true';
		$scope.showHindi = $localstorage.get(LSVAR_SHOW_HINDI, false) === 'true';
		if ($localstorage.get(LSVAR_ASK_SERIALLY, true) === 'true') Question.checkSerially(); else Question.checkRandomly();
		if ($stateParams.reset == 'true') {
			Question.reset();
		}
		if ($stateParams.bani != null) {
			Question.resetQuestions();
			Question.setBani($stateParams.bani);
		}

		var quesCompletedTill = $localstorage.get('qCompTill_' + $stateParams.bani, 0);
		if ($localstorage.get(LSVAR_ASK_SERIALLY, true) === 'true') $scope.ques = Question.getQuesOnwards(quesCompletedTill);
		else $scope.ques = Question.random();

		setModelDialog('./templates/modal.html', 'slide-in-up', $ionicModal, $scope);
		console.log('Inside LearnCtrl :::' + JSON.stringify($scope.ques));

		var quesId = quesCompletedTill;
		var bani = $stateParams.bani;
		setScopeVarsForQuestionBase($scope, Question.quesCounterText(), CommonUtils.getText(BANI_LIST, Question.getBani()), Question.success());
		$scope.showMeaning = false;
		$scope.showBtnGoMeaning = true;
		$scope.quesId = quesId;
	}

	$scope.goMeaning = function() {
		$scope.showMeaning = true;
		$scope.showBtnGoMeaning = false;
	}

	$scope.goQuestionFromLearn = function() {
		console.log('Inside goQuestionFromLearn')
		$location.path('/app/ques/false/' + $stateParams.bani + '/' + $scope.quesId);
	}

	onLearnPageLoad();
})
;


setScopeVarsForQuestionBase = function($scope, counterText, title, score) {

	$scope.option = $scope.ques.qOpt; // Question.getOptions($scope.ques);
	$scope.wordPunj = $scope.option.wordPunj;
	$scope.wordEng = $scope.option.wordEng;
	$scope.questionPunj = $scope.ques.quesPunj;
	$scope.questionEng = $scope.ques.quesEng;
	$scope.questionPunjParts = getSplittedTuk($scope.ques.quesPunj.replace(/,/g,""), $scope.option.wordPunj);
	$scope.questionEngParts = getSplittedTuk($scope.ques.quesEng, $scope.option.wordEng);

	$scope.progressText = counterText; // Question.quesCounterText();
	$scope.questionProgress = $scope.progressText;
	$scope.title = title; // CommonUtils.getText(BANI_LIST, Question.getBani()); // 'Question ' + $scope.progressText;

	$scope.options = _.shuffle(_.zip([$scope.option.opAEng, $scope.option.opBEng, $scope.option.opCEng, $scope.option.opDEng], [$scope.option.opAPunj, $scope.option.opBPunj, $scope.option.opCPunj, $scope.option.opDPunj]));
	$scope.correctAnswerIndex = -1;
	for (var i = 0; i < 4; i++) {
		if ($scope.option.ansEng == $scope.options[i][0]) $scope.correctAnswerIndex = i;
	}
	// $scope.getDebugInfo = Question.debugGetDebugInfo();
	$scope.barType = 'bar-positive';
	$scope.showOptions = false;
	
	$scope.score = score; // Question.success();

	$scope.shabad = $scope.ques.shbd != null ? getSplittedTuk($scope.ques.shbd.shabdPunj, $scope.ques.quesPunj) : null;
	$scope.tuk = $scope.ques.quesPunj;
	$scope.explEng = $scope.ques.explEng;
	$scope.explPunj = $scope.ques.explPunj.split(' *** ');
	$scope.ansEng = $scope.option.ansEng;
	$scope.ansPunj = $scope.option.ansPunj;

	$scope.relatedTuks = $scope.option.relatedTuks;
};

setModelDialog = function(modelUrl, animation, $ionicModal, $scope) {
	$ionicModal.fromTemplateUrl(modelUrl, {
	    scope: $scope,
	    animation: animation
	}).then(function(modal) {
	    $scope.modal = modal
	});

	$scope.openModal = function() {
	    $scope.modal.show();
	};

	$scope.closeModal = function() {
	    $scope.modal.hide();
	};

	$scope.$on('$destroy', function() {
	    $scope.modal.remove();
	});
};

setModel2Dialog = function(modelUrl, animation, $ionicModal, $scope, $localstorage) {
	$ionicModal.fromTemplateUrl(modelUrl, {
	    scope: $scope,
	    animation: animation
	}).then(function(modal2) {
	    $scope.modal2 = modal2;
	    $scope.data.showHindi = $localstorage.get(LSVAR_SHOW_HINDI, 'false') === 'true';
	    console.log($scope.modal2);
	});

	$scope.openModal2 = function() {
		console.log($scope.modal2);
	    $scope.modal2.show();
	};

	$scope.closeModal2 = function() {
	    $scope.modal2.hide();
	};

	$scope.dontShowAgain = function() {
		$localstorage.set(LSVAR_SHOW_HINDI_DIALOG, 'false');
		$scope.modal2.hide();
	}

	$scope.updateHindi = function() {
		$localstorage.set(LSVAR_SHOW_HINDI, $scope.data.showHindi);
		$scope.showHindi = $scope.data.showHindi;
	}

	$scope.$on('$destroy', function() {
	    $scope.modal2.remove();
	});
};


createPopupObject = function(pTemplate, pTemplateUrl, pTitle, pSubTitle, pButtonsArray, $scope, $ionicPopup) {
	// An elaborate, custom popup -- http://codepen.io/ionic/pen/zkmhJ
	var myPopup = $ionicPopup.show({
		template: pTemplate, //'<h1 class="text-center" style="align:center">{{questionProgress}}</h1>',
		templateUrl: pTemplateUrl,
		title: pTitle,
		subTitle: pSubTitle,
		scope: $scope,
		cssClass: 'popupcorrans',
		buttons: pButtonsArray
	});
	return myPopup;
}

getSplittedTuk = function(tuk, word) {
	var splitArr = tuk.split(word);
	if (_.size(splitArr) > 2) {
		splitArr[1] = _.rest(splitArr, 1).join(' ' + word + ' ');
	}
	return splitArr;
};

