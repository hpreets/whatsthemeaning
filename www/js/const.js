var BANI_AKV_VALUE = 'akv',
	BANI_AKV_LABEL = 'Asa Di Vaar',
	BANI_JAPJI_VALUE = 'japji',
	BANI_JAPJI_LABEL = 'Japji Saheb',
	BANI_MISC_VALUE = 'misc',
	BANI_MISC_LABEL = 'Assorted',
	BANI_SLOKM9_VALUE = 'slokm9',
	BANI_SLOKM9_LABEL = 'Salok M:9',
	BANI_SLOKKBR_VALUE = 'slokkbr',
	BANI_SLOKKBR_LABEL = 'Salok Kabeer Ji',
	BANI_SLOKFRD_VALUE = 'slokfrd',
	BANI_SLOKFRD_LABEL = 'Salok Fareed Ji',
	BANI_BARAHMM_VALUE = 'barahmm',
	BANI_BARAHMM_LABEL = 'Baarah Maha Maanjh',

	BANI_LIST = [
		{ text: BANI_AKV_LABEL, value: BANI_AKV_VALUE },
		{ text: BANI_JAPJI_LABEL, value: BANI_JAPJI_VALUE },
		{ text: BANI_MISC_LABEL, value: BANI_MISC_VALUE },
		{ text: BANI_SLOKM9_LABEL, value: BANI_SLOKM9_VALUE },
		{ text: BANI_SLOKKBR_LABEL, value: BANI_SLOKKBR_VALUE },
		{ text: BANI_SLOKFRD_LABEL, value: BANI_SLOKFRD_VALUE },
		{ text: BANI_BARAHMM_LABEL, value: BANI_BARAHMM_VALUE }
	],

	BANI_LIST_ADV = [
		{img:"", backColor:"#7db956", punjText: "jpujI swihb", engText: BANI_JAPJI_LABEL, baniId:BANI_JAPJI_VALUE, subEngText:""},
		{img:"", backColor:"#f3ca2b", punjText: "Awsw dI vwr", engText: BANI_AKV_LABEL, baniId:BANI_AKV_VALUE, subEngText:""},
		{img:"", backColor:"#f0c0e1", punjText: "slok mhlw 9", engText: BANI_SLOKM9_LABEL, baniId:BANI_SLOKM9_VALUE, subEngText:""}, 
		{img:"", backColor:"#efe573", punjText: "bwrh mwhw mWJ", engText: BANI_BARAHMM_LABEL, baniId:BANI_BARAHMM_VALUE, subEngText:""}, 
		{img:"", backColor:"#f7646c", punjText: "coxvy Sbd", engText: BANI_MISC_LABEL, baniId:BANI_MISC_VALUE, subEngText:""},
		{img:"", backColor:"#c1a29e", punjText: "slok syK PrId ky", engText: BANI_SLOKFRD_LABEL, baniId:BANI_SLOKFRD_VALUE, subEngText:""}, 
		{img:"", backColor:"#85c9a9", punjText: "slok Bgq kbIr jIau ky", engText: BANI_SLOKKBR_LABEL, baniId:BANI_SLOKKBR_VALUE, subEngText:""},
	],

	CONFIG_STARTING_BANI = BANI_BARAHMM_VALUE,
	CONFIG_DEFAULT_ASK_SERIALLY = 'true',

	LSVAR_SHOW_TRANSLITERATION = 'showTransliteration',
	LSVAR_SHOW_HINDI = 'showHindi',
	LSVAR_SHOW_HINDI_DIALOG = 'showHindiDialog',
	LSVAR_STARTING_BANI = 'startingBani',
	LSVAR_ASK_SERIALLY = 'askSerially',
	LSVAR_QUES_COMPLETED_TILL = 'qCompTill_',
	LSVAR_SCORE_PLAYED = 'played_',
	LSVAR_SCORE_CORRECT = 'correct_',
	LSVAR_SCORE_QUIZ_WON = 'quiz_won_',
	LSVAR_ANS_INCORRECT = 'incorrect_',
	LSVAR_IS_LEARN_MODE = 'islearnmode',

	TITLE_CORRECT = 'CORRECT',
	TITLE_INCORRECT = 'INCORRECT',

	SCORE_LABEL_PLAYED = 'Played:',
	SCORE_LABEL_CORRECT = 'Answered Correctly:',
	SCORE_LABEL_QUIZ_WON = 'Quizes Won:',

	BANI_TOPICS = [
		[BANI_LIST_ADV[0]],
		[BANI_LIST_ADV[1], BANI_LIST_ADV[2]],
		[BANI_LIST_ADV[3], BANI_LIST_ADV[4]],
		[BANI_LIST_ADV[5], BANI_LIST_ADV[6]]
	]
	;

