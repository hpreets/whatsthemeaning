angular.module('wtm.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Exit App
  $scope.exit = function() {
    navigator.app.exitApp();
  };

})

.controller('HomeCtrl', function ($scope, $localstorage, $timeout, Question, $ionicModal, BaniTopics, $location) {
	Question.reset();
	$scope.data = {};
	$scope.startBani = $localstorage.get(LSVAR_STARTING_BANI, CONFIG_STARTING_BANI);
	$localstorage.set(LSVAR_ASK_SERIALLY, CONFIG_DEFAULT_ASK_SERIALLY);
	// $scope.startBani = 'japji';

	$scope.baniTopics = BaniTopics.getBaniTopics();
	console.log($scope.baniTopics);

	$scope.openQuiz = function(baniId) {
		$location.path('/app/ques/true/' + baniId);
	}

	setModelDialog = function(modelUrl, animation) {
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

	setModelDialog('./templates/modalhelp.html', 'slide-in-up');
})

.controller('QuestionCtrl', function ($scope, $stateParams, $localstorage, $timeout, $ionicModal, Question, CommonUtils, $ionicPopup, $ionicBackdrop, $ionicLoading, $location) {
	var debugMode = true;
	var learnMode = $localstorage.getLearnMode(false) === 'true';
	$scope.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, false) === 'true';
	if ($localstorage.get(LSVAR_ASK_SERIALLY, false) === 'true') Question.checkSerially(); else Question.checkRandomly();
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
		hideAllSections();
		$ionicBackdrop.retain();
		if (!learnMode) fetchQuestion($stateParams.bani);

		setModelDialog('./templates/modal.html', 'slide-in-up');
		var myPopup = createPopupObject('<h1 class="text-center" style="align:center">{{questionProgress}}</h1>', 'Question', '');
		$timeout(function() {
			$scope.showTuk = true;
			$scope.showQuesWord = true;
			$scope.show4Options = false;
			$scope.showAnsWord = false;
			$scope.showMeaning = false;
			$scope.showBtnGoQues = false;
			$scope.showBtnGoMeaning = false;
			$scope.showBtnGoTuk = false;
			$scope.qwordStyle = 'color:red';

			$scope.stage='before-question';
			// $timeout(function() {
				myPopup.close();
				$ionicBackdrop.release();
				$scope.stage='question';
				$timeout(function() {
					$scope.showOptions = true;
					$scope.show4Options = true;
				}, 0); // 2000
			//}, 750); // 750
		}, 750);
	}

	$scope.goTuk = function() {
		if (learnMode) {
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
		else {
			$scope.goQuestion();
		}
	}

	$scope.goMeaning = function() {
		$scope.showTuk = true;
		$scope.showQuesWord = false;
		$scope.show4Options = false;
		$scope.showAnsWord = false;
		$scope.showMeaning = true;
		$scope.showBtnGoQues = true;
		$scope.showBtnGoMeaning = false;
		$scope.showBtnGoTuk = false;
		$scope.qwordStyle = '';
	}

	$scope.goAnswer = function(quesId, optionId, selectedAns) {
		hideAllSections();
		addCurrQuesTrackerToStorage(Question.isSerial(), $stateParams.bani, Number(quesId)+1);
		var isCorrect = Question.validate($scope.ques, selectedAns);
		addScoreToStorage($stateParams.bani, isCorrect, Question.isComplete());
		addIncorrectToStorage($stateParams.bani, isCorrect, quesId, optionId);
		$scope.resultText = 'INCORRECT';
		if (isCorrect) $scope.resultText = 'CORRECT';

		// An elaborate, custom popup -- http://codepen.io/ionic/pen/zkmhJ
		var myPopup = $ionicPopup.show({
			template: '<h2 class="text-center" style="align:center">{{resultText}}</h2>', // '<span style="align:center"><img src="./../img/faces/incorrect2.jpg"></img></span>'
			title: '',
			subTitle: $scope.resultText,
			scope: $scope,
		});
		$timeout(function() {
			$scope.showTuk = true;
			$scope.showQuesWord = false;
			$scope.show4Options = false;
			$scope.showAnsWord = true;
			$scope.showMeaning = true;
			$scope.showBtnGoQues = false;
			$scope.showBtnGoMeaning = false;
			$scope.showBtnGoTuk = true;
			$scope.qwordStyle = 'color:red';

			$scope.stage = 'answer';
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
			console.log('Questions for "' + $stateParams.bani + '" completed till :: ' + $localstorage.get(LSVAR_QUES_COMPLETED_TILL + $stateParams.bani));
			myPopup.close();
			$scope.score = Question.success();
		}, 750); // 750
	}

	hideAllSections = function() {
		$scope.showTuk = false;
		$scope.showQuesWord = false;
		$scope.show4Options = false;
		$scope.showAnsWord = false;
		$scope.showMeaning = false;
		$scope.showBtnGoQues = false;
		$scope.showBtnGoMeaning = false;
		$scope.showBtnGoTuk = false;
		$scope.qwordStyle = '';
	}

	fetchQuestion = function(bani) {
		$scope.answer = false;
		
		var quesCompletedTill = $localstorage.get('qCompTill_' + $stateParams.bani, 0);

		if ($localstorage.get(LSVAR_ASK_SERIALLY, false) === 'true') $scope.ques = Question.getQuesOnwards(quesCompletedTill);
		else $scope.ques = Question.random();
		// $scope.ques = Question.get("102", "102_0");
		// console.log('$scope.ques :::' + $scope.ques.quesEng);
		// console.log('$scope.ques :::' + JSON.stringify($scope.ques));

		setScopeVarsForQuestion();
	}

	setScopeVarsForQuestion = function() {

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
	};

	setModelDialog = function(modelUrl, animation) {
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

	
	createPopupObject = function(template, title, subTitle) {
		// An elaborate, custom popup -- http://codepen.io/ionic/pen/zkmhJ
		var myPopup = $ionicPopup.show({
			template: '<h1 class="text-center" style="align:center">{{questionProgress}}</h1>',
			title: 'Question',
			subTitle: '',
			scope: $scope,
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

	getNumber = function(inputParam) {
		if (isNaN(inputParam)) return 0; else return Number(inputParam);
	}

	$scope.goToScore = function() {
		$location.path('/app/score');
	}

	// goAnswerScope = function(quesId, optionId, selectedAns) {

	// 	// $scope.ques = Question.validateAndGet(quesId, optionId, selectedAns); // This resulted in jumping of another question while serial
	// 	if (Question.isSerial()) addCurrQuesTrackerToStorage(Question.isSerial(), $stateParams.bani, Number(quesId)+1); // $localstorage.set(LSVAR_QUES_COMPLETED_TILL + $stateParams.bani, Number(quesId)+1);
	// 	var isCorrect = Question.validate($scope.ques, selectedAns);
	// 	/*if (isCorrect) playSound('correct.wav'); else playSound('wrong.wav');*/

	// 	// update scores
	// 	addScoreToStorage($stateParams.bani, isCorrect, Question.isComplete());
	// 	// update incorrect list
	// 	addIncorrectToStorage($stateParams.bani, isCorrect, quesId, optionId);

	// 	$scope.quesEng = $scope.ques.quesEng;
	// 	$scope.quesPunj = $scope.ques.quesPunj.replace(/,/g, "");
	// 	$scope.option = $scope.ques.qOpt;
	// 	$scope.wordEng = $scope.option.wordEng;
	// 	$scope.wordPunj = $scope.option.wordPunj;
	// 	$scope.ansEng = $scope.option.ansEng;
	// 	$scope.ansPunj = $scope.option.ansPunj;
	// 	$scope.explEng = $scope.ques.explEng;
	// 	$scope.explPunj = $scope.ques.explPunj;
	// 	$scope.answer = true;
	// 	$scope.isCorrect = isCorrect;
	// 	$scope.score = Question.success();
		
	// 	$scope.stage = 'before-answer';
	// 	$scope.resultText = 'INCORRECT';
	// 	if (isCorrect) $scope.resultText = 'CORRECT';

	// 	// An elaborate, custom popup -- http://codepen.io/ionic/pen/zkmhJ
	// 	var myPopup = $ionicPopup.show({
	// 		template: '<h2 class="text-center" style="align:center">{{resultText}}</h2>', // '<span style="align:center"><img src="./../img/faces/incorrect2.jpg"></img></span>'
	// 		title: '',
	// 		subTitle: $scope.resultText,
	// 		scope: $scope,
	// 	});

	// 	$timeout(function() {
	// 		myPopup.close();
	// 		$scope.stage = 'answer';
	// 		$scope.answer = true;
	// 		$scope.showOptions = false;
	// 		$scope.selAns = selectedAns;
	// 		$scope.isComplete = Question.isComplete();
	// 		$scope.progressText = Question.scoreText();
			
	// 		if ($scope.selAns == $scope.ansEng) {
	// 			$scope.barType = 'bar-balanced'; 
	// 			$scope.title = 'CORRECT';
	// 		}
	// 		else { 
	// 			$scope.barType = 'bar-assertive' 
	// 			$scope.title = 'INCORRECT';
	// 		};
			
	// 		$scope.title += ' | Score: ' + $scope.progressText;
	// 		console.log('Questions for "' + $stateParams.bani + '" completed till :: ' + $localstorage.get(LSVAR_QUES_COMPLETED_TILL + $stateParams.bani));
	// 	}, 750); // 750
	// };

	open = $scope.goTuk();
})

// .controller('AnswerCtrl', function ($scope, $stateParams, $state, $ionicGesture, $localstorage, Question) {
// 	$scope.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, false) === 'true';
// 	$scope.ques = Question.validateAndGet($stateParams.qId, $stateParams.oId, $stateParams.selAns);
// 	$scope.option = $scope.ques.qOpt; // Question.getOptions($scope.ques);

// 	$scope.quesEng = $scope.ques.quesEng;
// 	$scope.quesPunj = $scope.ques.quesPunj;
// 	$scope.wordEng = $scope.option.wordEng;
// 	$scope.wordPunj = $scope.option.wordPunj;
// 	$scope.ansEng = $scope.option.ansEng;
// 	$scope.ansPunj = $scope.option.ansPunj;
// 	$scope.explEng = $scope.ques.explEng;
// 	$scope.explPunj = $scope.ques.explPunj;
// 	$scope.selAns = $stateParams.selAns;

// 	$scope.isComplete = Question.isComplete();
// 	$scope.progressText = Question.scoreText();
	
// 	if ($scope.selAns == $scope.ansEng) { 
// 		$scope.barType = 'bar-balanced'; 
// 		$scope.title = 'CORRECT';
// 	}
// 	else { 
// 		$scope.barType = 'bar-assertive' 
// 		$scope.title = 'INCORRECT';
// 	};
// 	$scope.title += ' | Score: ' + $scope.progressText;
	
//     var element = angular.element(document.querySelector('#answerDetails'));
// 	$ionicGesture.on('dragleft', function (event) {
//       $scope.$apply(function () {
//         if ($scope.isComplete) $state.go('app.score'); else $state.go('app.ques');
//       });
//     }, element);

// 	/*$scope.swipeLeft = function() {
// 		if ($scope.isComplete) 
// 			$rootScope.go('/score'); 
// 		else 
// 			$rootScope.go('/ques');
// 	}*/
// 	// $scope.getDebugInfo = Question.debugGetDebugInfo();
// })

.controller('ScoreCtrl', function ($scope, $localstorage, $location, Question) {
	$scope.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, false) === 'true';
	$scope.score = Question.scoreText();
	$scope.allQuiz = Question.getQuestionsCovered();
	$scope.success = Question.getSuccessList();
	$scope.feedback = Question.feedback();
	$scope.bani = Question.getBani();

	$scope.goToQuestion = function() {
		var learnMode = $localstorage.getLearnMode(false);
		/*if (learnMode) $location.path('/app/learn/true/' + $scope.bani);
		else */
		$location.path('/app/ques/true/' + $scope.bani);
	}
})

.controller('SettingCtrl', function ($scope, $localstorage, Question) {
	$scope.data = {};
	$scope.data.showTranslit = $localstorage.get(LSVAR_SHOW_TRANSLITERATION, 'false') === 'true';
	$scope.data.startingBani = $localstorage.get(LSVAR_STARTING_BANI, CONFIG_STARTING_BANI);
	$scope.data.startingBaniList = BANI_LIST;
	$scope.data.askSerially = $localstorage.get(LSVAR_ASK_SERIALLY, 'false') === 'true';
	$scope.data.learnMode = $localstorage.get(LSVAR_IS_LEARN_MODE, 'false') === 'true';
  
	$scope.updateTranslit = function() {
		$localstorage.set(LSVAR_SHOW_TRANSLITERATION, $scope.data.showTranslit);
	};

	$scope.updateStartingBani = function() {
		$localstorage.set(LSVAR_STARTING_BANI, $scope.data.startingBani);
	};

	$scope.updateAskSerially = function() {
		$localstorage.set(LSVAR_ASK_SERIALLY, $scope.data.askSerially);
		if ($scope.data.askSerially) Question.checkSerially(); else Question.checkRandomly();
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
;
