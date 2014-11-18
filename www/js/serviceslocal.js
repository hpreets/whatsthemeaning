'use strict';

(function () {

		//var questions = japjituks,
		//options = japjiques,

        var questions = misctuks,
		options = miscques,
		    					
        getQuestionById = function (qId, oId, addToCovered) {
            var ques = null,
                l = questions.length,
                opt = null,
                i;
            if (qId == null) qId = nextRandomIntFromSet();
            ques = questions[qId];
            if (oId == null) {
                oId = (ques.totalQCnt == "0" ? "0" : Math.floor(Math.random()*(parseInt(ques.totalQCnt)-0+1)+0) );
                opt = getOptionByQuesAndOptId(qId, oId);
            }
            else {
                opt = getOptionById(oId);
            }
            ques.qOpt = opt;
            if (addToCovered) covered.push(ques);
            return ques;

        },
        getOptionById = function (qOptId) {
            var option = null,
                l = options.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (options[i].Id == qOptId) {
               	    option = options[i];
                    break;
                }
            }
            return option;
        },
        getOptionByQuesAndOptId = function (qId, optId) {
            return getOptionById(qId+"_"+optId);
        },
        getAllQuestions = function () {
            var ques = [];
            for (i = 0; i < questions.length; i++) {
                var q = questions[i];
                for (j=0; j<=q.totalQCnt; j++) {
                    q.qOpt = getOptionById(q.Id+'_'+j);
                    ques.push[q];
                }
            }
            return ques;
        },
        getAllQuestionsOnly = function () {
            return questions;
        },
        getAllOptionsOnly = function () {
            return options;
        },
        total = questions.length,
        max = 10,
        maxRandomIntSetSize = 100,
        randomIntSet = [],
        covered = [],
        success = [],
        refillAt = 20,
        baniType = 'misc',
        debugSerial = false,
        randomIntNotInSet = function(max, intSet) {
            var rnd = _.random(0, max); // Math.floor(Math.random()*max);
            while (intSet.indexOf(rnd) >= 0) {
       	        rnd = _.random(0, max); // Math.floor(Math.random()*max);
            }
            return rnd;
        },
        nextRandomIntFromSet = function() {
        	if (randomIntSet == null  ||  randomIntSet.length <= refillAt) {
				if (debugSerial) populateSerialIntSet();
        		else populateRandomIntSet();
        	}
        	var rnd = randomIntSet.pop();
        	return rnd;
        },
        addScore = function(customQues, selAns) {
       	    if (customQues.qOpt.ansEng == selAns) {
                success.push(customQues.Id);
            }
       	    return null;
        },
        correctAnswers = function() {
        	return success;
        },
        questionsCovered = function() {
        	return covered;
        },
        correctAnswersCount = function() {
        	return success.length;
        },
        questionsCoveredCount = function() {
        	return covered.length;
        },
        maxQuestionsPerQuiz = function() {
        	return max;
        },
        populateRandomIntSet = function() {
        	for (var i = 0; randomIntSet.length < maxRandomIntSetSize; i++) {
        		randomIntSet.unshift(randomIntNotInSet(total-1, randomIntSet));
        	}
        },
        populateSerialIntSet = function() {
        	for (var i = 0; i < total; i++) {
        		randomIntSet.unshift(i);
        	}
        },
        resetStat = function() {
        	covered = [];
        	success = [];
        },
        setQuestionSet = function(bani) {
            if (bani == 'japji') {
		        questions = japjituks;
		        options = japjiques;
            }
            else {
		        questions = misctuks;
		        options = miscques;
            }
            if (baniType != bani) {
                total = questions.length;
                randomIntSet = [];
                resetStat;
            }
            baniType = bani;
        };
        


    angular.module('wtm.services', [])
        .factory('Question', [ 
            function () {
                return {
                    random: function () {
                        return getQuestionById(null, null, true);
                    },
                    get: function (qId, oId) {
                    	return getQuestionById(qId, oId, false);
                    },
                    getAllOptions: function () {
                        return getAllOptionsOnly();
                    },
                    getAllQuestions: function () {
                        return getAllQuestionsOnly();
                    },
                    getCoveredQuestions: function () {
                        return questionsCovered();
                    },
                    validateAndGet: function (qId, oId, selAns) {
                    	var ques = getQuestionById(qId, oId, false);
                    	addScore(ques, selAns);
                        return ques;
                    },
                    isComplete: function () {
                        return max == covered.length;
                    },
                    getSuccessList: function () {
                        return correctAnswers();
                    },
                    getQuestionsCovered: function () {
                        return questionsCovered();
                    },
                    reset: function () {
                        return resetStat();
                    },
                    setBani : function(bani) {
                    	setQuestionSet(bani);
                    },
                    checkSerially : function() {
						debugSerial = true;
					},
                    debugGetDebugInfo : function() {
                        /*var debugInfo = new Object();
                        debugInfo.currentRandomIntSetSize = randomIntSet.length;
                        debugInfo.maxRandomIntSetSize = total;
                        debugInfo.correctAnswersCount = correctAnswersCount();
                        debugInfo.questionsCoveredCount = questionsCoveredCount();
                        debugInfo.maxRandomIntSetSize = maxRandomIntSetSize;
                        debugInfo.refillAt = refillAt;
                        debugInfo.baniType = baniType;
                        debugInfo.randomIntSet = randomIntSet;
                        console.log('Completed creating debugInfo :::'+_.pairs(debugInfo));
                    	// return debugInfo;*/
                        return '';
                    },
                }

            }])
        .factory('QuestionCounter', [
            function () {
                return {
                    scoreText: function () {
                        return '' + correctAnswers().length + '/' + questionsCovered().length;
                    },
                    quesCounterText: function () {
                        return '' + questionsCovered().length + '/' + maxQuestionsPerQuiz();
                    },
                    success: function () {
                        return correctAnswers().length;
                    },
                    covered: function () {
                        return questionsCovered().length;
                    },
                    max: function () {
                        return maxQuestionsPerQuiz();
                    },
                    feedback: function () {
                    	var percent = (correctAnswers().length*100/max);
                    	if (percent == 100) return "Excellent, keep it up.";
                    	else if (percent > 80) return "Good, keep practicing";
                    	else return "You need to practice more";
                    },
                }
            }])
        .factory('Common', [
            function () {
                return {
                    shuffle: function (arr) {
                    	for (var i = arr.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            var temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                        }
                    	return arr;
                    },
                }
            }])
        ;

}());
