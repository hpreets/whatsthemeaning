angular.module('wtm.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Question', function() {

	// alert('Inside Question');
/*	var misctuks = [{"Id" : "0", "quesPunj" : "jogu n BgvI kpVI jogu n mYly vyis ] nwnk Gir bYiTAw jogu pweIAY siqgur kY aupdyis ]", "quesEng" : "jog n bhagavee kaparree jog n mailae vaes |", "explPunj" : "hy BweI! (igRhsq iqAwg ky) gyrUey rMg dy k`piVAW nwl jW mYly pihrwvy nwl (prmwqmw dw) imlwp nhIN ho jWdw [ pr, hW, hy nwnk! gurU dy aupdyS dI rwhIN igRhsq ivc rihMidAW hI (prmwqmw nwl) imlwp ho skdw hY [", "explEng" : "Yoga is not obtained by wearing saffron robes; Yoga is not obtained by wearing dirty robes. O Nanak, Yoga is obtained even while sitting in your own home, by following the Teachings of the True Guru.", "page" : "1413", "mahla" : "3", "totalQCnt" : "0"},
{"Id" : "1", "quesPunj" : "sMq sBw kau sdw jYkwru ]", "quesEng" : "santh sabhaa ko sadhaa jaikaar |", "explPunj" : "jYkwru-nmskwr [ (hy BweI!) swD sMgiq A`gy sdw isr invwau", "explEng" : "I salute and applaud the Society of the Saints.", "page" : "183", "mahla" : "5", "totalQCnt" : "0"},
{"Id" : "2", "quesPunj" : "Aink pVdy mih kmwvY ivkwr ] iKn mih pRgt hoih sMswr ]3]", "quesEng" : "anik parradhae mehi kamaavai vikaar | khin mehi pragatt hohi sansaar |", "explPunj" : "(ismrn-hIn mnu`K prmwqmw nUM AMg-sMg nwh jwxdw hoieAw) AnykW pridAW ipCy (lokW qoN lukw ky) ivkwr krm kmWdw hY, pr (aus dy kukrm) jgq dy AMdr iek iKn ivc hI prgt ho jWdy hn [3[", "explEng" : "Hiding behind many screens, they commit acts of corruption, but in an instant, they are revealed to all the world. ||3||", "page" : "194", "mahla" : "5", "totalQCnt" : "0"},
{"Id" : "3", "quesPunj" : "hir jo ikCu kry su hir ikAw Bgqw BwieAw ]", "quesEng" : "har jo kish karae s har kiaa bhagathaa bhaaeiaa |", "explPunj" : "BwieAw-cMgw l`gdw hY [ jo kuJ prmwqmw krdw hY aus dy BgqW nMU auh im`Tw l`gdw hY (qy auh ies qrHW Awqmk suK mwxdy hn) [", "explEng" : "Whatever the Lord does, is pleasing to the Lord's devotee.", "page" : "176", "mahla" : "5", "totalQCnt" : "0"}],

miscques = [{"Id" : "0_0", "wordPunj" : "BgvI", "wordEng" : "bhagavee", "ansEng" : "Saffron", "ansPunj" : "gyrUey rMg", "opAEng" : "Running", "opAPunj" : "Bjxw", "opBEng" : "With devotion", "opBPunj" : "BgqI nwl", "opCEng" : "White", "opCPunj" : "ic~tw", "opDEng" : "Saffron", "opDPunj" : "gyrUey rMg"},
{"Id" : "1_0", "wordPunj" : "sMq sBw", "wordEng" : "santh sabhaa", "ansEng" : "Society of Saints", "ansPunj" : "swD sMgiq", "opAEng" : "Gurduara Singh Sabha", "opAPunj" : "gurduAwrw isMG sBw", "opBEng" : "Society of Saints", "opBPunj" : "swD sMgiq", "opCEng" : "Praise (Sobha)", "opCPunj" : "vifAweI", "opDEng" : "Bhai Sobha Singh", "opDPunj" : "BweI soBw isMG"},
{"Id" : "2_0", "wordPunj" : "pRgt", "wordEng" : "pragatt", "ansEng" : "Revealed", "ansPunj" : "prgt", "opAEng" : "Thoughts", "opAPunj" : "soc", "opBEng" : "Revealed", "opBPunj" : "prgt", "opCEng" : "Act of Corruption", "opCPunj" : "ivkwr", "opDEng" : "Roundabout", "opDPunj" : "gol c~kr"},
{"Id" : "3_0", "wordPunj" : "hir ikAw", "wordEng" : "har kiaa", "ansEng" : "Lord's", "ansPunj" : "prmwqmw dy", "opAEng" : "Lord's", "opAPunj" : "prmwqmw dy", "opBEng" : "What is Lord", "opBPunj" : "prmwqmw kI hY", "opCEng" : "Lord did it", "opCPunj" : "prmwqmw ny kIqw", "opDEng" : "Pleasing", "opDPunj" : "luBwauNdw"}],
*/
	var questions = misctuks,
	options = miscques,
	totalquescount = -1,
	currquescount = -1,
	currqid = -1,
							
	getQuestionById = function (qId, oId, addToCovered) {
		// alert(qId + '--' + oId + '--' + addToCovered);
		var ques = null,
			l = questions.length,
			opt = null,
			i;
		if (qId == null  &&  debugSerialOptions) {
			if (totalquescount != -1) {
				if (currquescount + 1 > totalquescount) {
					totalquescount = -1;
				}
				else {
					currquescount = currquescount + 1;
					ques = questions[currqid];
					opt = getOptionByQuesAndOptId(currqid, currquescount);
					ques.qOpt = opt;
				}
			}
			if (totalquescount == -1) {
				qId = nextRandomIntFromSet();
				// alert(qId);
				currqid = qId;
				ques = questions[qId];
				totalquescount = ques.totalQCnt;
				oId = 0;
				currquescount = oId;
				opt = getOptionByQuesAndOptId(qId, oId);
				ques.qOpt = opt;
			}
		}
		else {
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
		}
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
	maxRandomIntSetSize = 50,
	randomIntSet = [],
	covered = [],
	success = [],
	refillAt = 20,
	baniType = 'misc',
	debugSerial = false,
	debugSerialOptions = false,
	randomIntNotInSet = function(max, intSet) {
		var rnd = Math.floor(Math.random()*max); // _.random(0, max);
		while (intSet.indexOf(rnd) >= 0) {
			rnd = Math.floor(Math.random()*max); // _.random(0, max);
		}
		return rnd;
	},
	nextRandomIntFromSet = function() {
		if (randomIntSet == null  ||  randomIntSet.length <= refillAt) {
			if (debugSerial || debugSerialOptions) populateSerialIntSet();
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
			maxRandomIntSetSize = 100;
		}
		else if (bani == 'slokm9') {
			questions = slokm9tuks;
			options = slokm9ques;
			maxRandomIntSetSize = 50;
		}
		else {
			questions = misctuks;
			options = miscques;
			maxRandomIntSetSize = 100;
		}
		if (baniType != bani) {
			total = questions.length;
			randomIntSet = [];
			resetStat;
		}
		baniType = bani;
	};

  return {
    all: function() {
      return null;
    },
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
                    checkSeriallyOptions : function() {
						debugSerialOptions = true;
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
})

.factory('$localstorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
})
;
