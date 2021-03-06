/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports) {

Vue.mixin({
    methods: {
        getMatchID: function getMatchID() {
            var url = window.location.href;
            for (var i = url.length - 1; i >= 0; i--) {
                if (url[i] == '/') {
                    break;
                }
            }
            return Number(url.slice(i + 1));
        },
        getMatchData: function getMatchData() {
            var mainthis = this;
            axios.get('/getmatchdata/' + mainthis.match_id).then(function (response) {
                if (response.data == "") {
                    window.location.replace("/");
                } else {
                    mainthis.match_data = response.data;
                    mainthis.setBatmans();
                    mainthis.setFielders();
                    mainthis.ball_consumed = [];
                    mainthis.createBallConsumedArray();
                    mainthis.resumeMatch();
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        setBatmans: function setBatmans() {
            var i = this.getTossWinner();
            if (!this.isSecInn) {
                if (this.match_data.first_innings == 'bat') {
                    this.batsmans = this.match_data.teams[i].players;
                } else if (this.match_data.first_innings == 'bowl') {
                    this.batsmans = this.match_data.teams[Math.abs(i - 1)].players;
                }
            } else if (this.isSecInn) {
                if (this.match_data.first_innings == 'bat') {
                    this.fielders = this.match_data.teams[i].players;
                } else if (this.match_data.first_innings == 'bowl') {
                    this.fielders = this.match_data.teams[Math.abs(i - 1)].players;
                }
            }
        },
        setFielders: function setFielders() {
            var i = this.getTossWinner();
            if (!this.isSecInn) {
                if (this.match_data.first_innings == 'bowl') {
                    this.fielders = this.match_data.teams[i].players;
                } else if (this.match_data.first_innings == 'bat') {
                    this.fielders = this.match_data.teams[Math.abs(i - 1)].players;
                }
            } else if (this.isSecInn) {
                if (this.match_data.first_innings == 'bowl') {
                    this.batsmans = this.match_data.teams[i].players;
                } else if (this.match_data.first_innings == 'bat') {
                    this.batsmans = this.match_data.teams[Math.abs(i - 1)].players;
                }
            }
        },
        createBallConsumedArray: function createBallConsumedArray() {
            var mainthis = this;
            this.ball_consumed = [];
            for (var i = 0; i < mainthis.fielders.length; i++) {
                var obj = {};
                obj['id'] = mainthis.fielders[i].player_id;
                obj['ball'] = 0;
                obj['run'] = 0;
                obj['out'] = null;
                obj['w_taker'] = null;
                mainthis.ball_consumed.push(obj);
            }
            for (var i = 0; i < mainthis.batsmans.length; i++) {
                var obj = {};
                obj['id'] = mainthis.batsmans[i].player_id;
                obj['ball'] = 0;
                obj['run'] = 0;
                obj['out'] = null;
                obj['w_taker'] = null;
                mainthis.ball_consumed.push(obj);
            }
        },
        resumeMatch: function resumeMatch() {
            var mainthis = this;
            axios.get('/getresumematchdata/' + mainthis.match_id).then(function (response) {
                console.log(response.data);
                mainthis.setResumeBasic(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        },
        getTossWinner: function getTossWinner() {
            for (var i = 0; i < this.match_data.teams.length; i++) {
                if (this.match_data.teams[i].team_id == this.match_data.toss_winner) {
                    return i;
                }
            }
        },
        getPlayerName: function getPlayerName(x) {
            for (var i = 0; i < this.match_data.teams.length; i++) {
                for (j = 0; j < this.match_data.teams[i].players.length; j++) {
                    if (this.match_data.teams[i].players[j].player_id == x) {
                        return this.match_data.teams[i].players[j].player_name;
                        break;
                    }
                }
            }
        },
        alreadyOut: function alreadyOut(x) {
            if (this.ball_consumed[x].out == null) {
                return true;
            } else {
                return false;
            }
        },
        calcFirstInningsWicket: function calcFirstInningsWicket() {
            var wicket = 0;
            for (var i = 0; i < this.ball_consumed.length; i++) {
                if (this.ball_consumed[i].out != null) {
                    wicket++;
                }
            }
            return wicket;
        },
        calculateBall: function calculateBall(x) {
            for (var i = 0; i < this.ball_consumed.length; i++) {
                if (parseInt(x) == parseInt(this.ball_consumed[i].id)) {
                    return i;
                    break;
                }
            }
        },
        prepareSecInnings: function prepareSecInnings() {
            this.isSecInn = true;
            this.first_innings.total_first = this.total_run;
            this.total_run = 0;
            this.first_innings.first_inn_wicket = this.calcFirstInningsWicket();
            this.first_innings.first_inn_over = this.ball_data.current_over + '.' + this.ball_data.current_ball;
            this.ball_data.current_ball = 0;
            this.ball_data.current_over = 0;
            this.ball_data.ball_run = 0;
            this.ball_data.extra_type = null;
            this.ball_data.incident = null;
            this.last_ten = [];
            this.extra_runs = [];
            this.inningsEnd = false;
            this.partnership.ball = 0;
            this.partnership.run = 0;
            this.setBatmans();
            this.setFielders();
            this.createBallConsumedArray();
        },
        setResumeBasic: function setResumeBasic(resume_data) {
            var x = resume_data[1];
            if (resume_data[0].stage != 'before_match_start' && resume_data[0].stage != 'first_innings_ended' && resume_data[0].stage != 'match_ended') {
                if (x[3]) {
                    this.prepareSecInnings();
                }
                this.total_run = parseInt(x[0][0]['total_run']);
                this.ball_consumed = x[2];
                this.last_ten = x[4];
                this.partnership.ball = parseInt(x[10]['ball']);
                this.partnership.run = parseInt(x[10]['run']);
                for (var i = x[1][0]['overs'].length - 1; i >= 0; i--) {
                    if (x[1][0]['overs'][i] == '.') {
                        this.ball_data.current_ball = parseInt(x[1][0]['overs'].slice(i + 1));
                        this.ball_data.current_over = parseInt(x[1][0]['overs'].slice(0, i));
                        break;
                    }
                }
                this.isSecInn = x[3];
                this.on_strike.id = x[7]['id'];
                this.non_strike.id = x[8]['id'];
                this.bowler = x[9];
                this.old_bowler = x[12];
                this.first_innings.total_first = x[6]['total_first'];
                this.first_innings.first_inn_wicket = x[6]['first_inn_wicket'];
                this.first_innings.first_inn_over = x[6]['first_inn_over'];
                this.extra_runs = x[5];
                this.ball_data.ball_run = x[11]['ball_run'];
                this.ball_data.incident = x[11]['incident'];
                this.ball_data.extra_type = x[11]['extra_type'];
                this.ball_data.who_out = x[11]['who_out'];
            } else if (resume_data[0].stage == 'first_innings_ended') {
                this.isSecInn = true;
                this.prepareSecInnings();
                this.first_innings.total_first = x[6]['total_first'];
                this.first_innings.first_inn_wicket = x[6]['first_inn_wicket'];
                this.first_innings.first_inn_over = x[6]['first_inn_over'];
            } else if (resume_data[0].stage == 'match_ended') {
                this.isSecInn = true;
                this.winner.matchEnded = true;
                this.first_innings.total_first = x[0].run;
                this.first_innings.first_inn_wicket = x[0].wicket;
                this.first_innings.first_inn_over = x[0].over;
                for (var i = x[1].over.length - 1; i >= 0; i--) {
                    if (x[1].over[i] == '.') {
                        this.ball_data.current_ball = parseInt(x[1].over.slice(i + 1));
                        this.ball_data.current_over = parseInt(x[1].over.slice(0, i));
                        break;
                    }
                }
                this.total_run = x[1].run;
                this.ball_consumed = x[2];
            }
        },
        countBowlerWicket: function countBowlerWicket(x) {
            var wicket = 0;
            this.ball_consumed.forEach(function (item, index) {
                if (item.w_taker == x) {
                    wicket++;
                }
            });
            return wicket;
        },
        getFirstBat: function getFirstBat() {
            var team1 = this.match_data.teams[0].team_id;
            var team2 = this.match_data.teams[1].team_id;
            if (this.match_data.first_innings == "bat") {
                if (team1 == this.match_data.toss_winner) {
                    return [team1, team2];
                } else {
                    return [team2, team1];
                }
            }
            if (this.match_data.first_innings == "bowl") {
                if (team1 == this.match_data.toss_winner) {
                    return [team2, team1];
                } else {
                    return [team1, team2];
                }
            }
        }
    },
    filters: {
        convertOver: function convertOver(x) {
            var over = 0;
            var bowl = 0;
            if (x) {
                over = parseInt(eval(x / 6));
                bowl = eval(x % 6);
                return over + '.' + bowl;
            } else {
                return x;
            }
        },
        localDateTime: function localDateTime(x) {
            var d = new Date(x);
            return d.toDateString() + ', ' + d.toLocaleTimeString();
        }
    },
    computed: {
        countWicket: function countWicket() {
            return this.calcFirstInningsWicket();
        },
        calcRemainingBall: function calcRemainingBall() {
            return this.match_data.over * 6 - (this.ball_data.current_over * 6 + this.ball_data.current_ball);
        },
        calcRemainingRun: function calcRemainingRun() {
            var x = this.first_innings.total_first - this.total_run + 1;
            return x >= 0 ? x : 0;
        },
        totalExtra: function totalExtra() {
            var total = 0;
            for (var i = 0; i < this.extra_runs.length; i++) {
                if (this.extra_runs[i].type == 'nb' || this.extra_runs[i].type == 'wd') {
                    total++;
                }
                total += this.extra_runs[i].extra;
            }
            return total;
        },
        battingTeam: function battingTeam() {
            var i = this.getTossWinner();
            var team = null;
            if (!this.isSecInn) {
                if (this.match_data.first_innings == 'bat') {
                    team = this.match_data.teams[i].team_name;
                } else if (this.match_data.first_innings == 'bowl') {
                    team = this.match_data.teams[Math.abs(i - 1)].team_name;
                }
            } else if (this.isSecInn) {
                if (this.match_data.first_innings == 'bat') {
                    team = this.match_data.teams[Math.abs(i - 1)].team_name;
                } else if (this.match_data.first_innings == 'bowl') {
                    team = this.match_data.teams[i].team_name;
                }
            }
            return team;
        },
        fieldingTeam: function fieldingTeam() {
            var i = this.getTossWinner();
            var team = null;
            if (!this.isSecInn) {
                if (this.match_data.first_innings == 'bowl') {
                    team = this.match_data.teams[i].team_name;
                } else if (this.match_data.first_innings == 'bat') {
                    team = this.match_data.teams[Math.abs(i - 1)].team_name;
                }
            } else if (this.isSecInn) {
                if (this.match_data.first_innings == 'bowl') {
                    team = this.match_data.teams[Math.abs(i - 1)].team_name;
                } else if (this.match_data.first_innings == 'bat') {
                    team = this.match_data.teams[i].team_name;
                }
            }
            return team;
        },
        checkToss: function checkToss() {
            if (this.match_data.first_innings != null) {
                return true;
            } else {
                return false;
            }
        },
        tossWinnerTeam: function tossWinnerTeam() {
            var toss_winner = this.getTossWinner();
            if (typeof toss_winner != 'undefined') {
                return this.match_data.teams[toss_winner].team_name;
            } else {
                return 'No Team';
            }
        },
        decideWinner: function decideWinner() {
            var overs = this.ball_data.current_over + '.' + this.ball_data.current_ball;
            var batt = this.getFirstBat();
            if (this.isSecInn && this.winner.matchEnded && (this.countWicket >= this.match_data.player_total - 1 || overs >= this.match_data.over || this.total_run > this.first_innings.total_first)) {
                this.winner.matchEnded = true;
                if (this.first_innings.total_first == this.total_run && overs == this.match_data.over) {
                    this.winner.isDrawn = true;
                    this.winner.matchEnded = true;
                } else if (this.first_innings.total_first > this.total_run && (overs >= this.match_data.over || this.countWicket >= this.match_data.player_total - 1)) {
                    this.winner.winning_team_id = batt[0];
                    this.winner.matchEnded = true;
                    this.winner.win_by = "run";
                    this.winner.win_digit = eval(this.first_innings.total_first - this.total_run);
                    this.winner.winning_team_name = this.fieldingTeam;
                } else {
                    this.winner.winning_team_id = batt[1];
                    this.winner.matchEnded = true;
                    this.winner.win_by = "wicket";
                    this.winner.win_digit = eval(this.match_data.player_total - 1 - this.countWicket);
                    this.winner.winning_team_name = this.battingTeam;
                }
                return true;
            } else {
                return false;
            }
        }
    }
});

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(46);


/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);

var matchpanel = new Vue({
    data: {
        match_id: '',
        isExtraBall: false,
        match_data: {
            "match_id": '',
            "user_id": '',
            "over": '',
            "location": "",
            "player_total": '',
            "toss_winner": '',
            "first_innings": '',
            "start_time": "",
            "created_at": "",
            "updated_at": "",
            "teams": [{
                "team_id": '',
                "team_name": "",
                "match_id": '',
                'players': []
            }, {
                "team_id": '',
                "team_name": "",
                "match_id": '',
                'players': []
            }]
        },
        on_strike: {
            id: ''
        },
        non_strike: {
            id: ''
        },
        ball_consumed: [],
        bowler: '',
        old_bowler: null,
        ask_start: false,
        tossWinnerIndex: '',
        batsmans: '',
        fielders: '',
        isSecInn: false,
        ball_data: {
            "current_over": 0,
            "current_ball": 0,
            "ball_run": 0,
            "incident": null,
            "extra_type": null,
            "who_out": 1,
            "clear_run": ''
        },
        total_run: 0,
        last_ten: [],
        extra_runs: [],
        first_innings: {
            "total_first": 0,
            "first_inn_wicket": 0,
            "first_inn_over": 0
        },
        inningsEnd: false,
        partnership: {
            "ball": 0,
            "run": 0
        },
        winner: {
            "matchEnded": false,
            "winning_team_id": null,
            "winning_team_name": '',
            "win_digit": null,
            "win_by": null,
            "isDrawn": false
        }
    },
    el: '#match-panel',
    created: function created() {
        this.match_id = this.getMatchID();
        this.getMatchData();
    },
    methods: {
        insertTossData: function insertTossData() {
            var mainthis = this;
            if (this.match_data.toss_winner != null && this.match_data.first_innings != null) {
                axios.post('/getmatchdata/match/settoss/' + this.match_data.match_id, {
                    toss_winner: this.match_data.toss_winner,
                    first_team: this.match_data.first_innings
                }).then(function (response) {
                    mainthis.getMatchData();
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
                mainthis.initInnings();
            }
        },
        initInnings: function initInnings() {
            axios.post('/getmatchdata/match/setinnings/' + this.match_data.match_id, {
                match_id: this.match_data.match_id
            }).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        },
        swapStrike: function swapStrike() {
            var x;
            x = this.on_strike.id;
            this.on_strike.id = this.non_strike.id;
            this.non_strike.id = x;
        },
        setBowler: function setBowler(x) {
            this.bowler = x;
        },
        addNewBall: function addNewBall(event) {
            var mainthis = this;
            if (this.match_data.toss_winner != null && this.match_data.first_innings != null) {
                this.total_run += this.ball_data.ball_run;
                this.fillExtraRunArray();
                this.fillLastTenArray();
                this.countPartnership();
                var ball = this.ball_data.current_over + '.' + this.ball_data.current_ball;
                if (ball <= this.match_data.over) {
                    if (mainthis.ball_data.incident != null) {
                        mainthis.checkWhoOut(event);
                    }
                    axios.post('/getmatchdata/match/addnewball/' + this.match_data.match_id, {
                        player_bat: mainthis.on_strike.id,
                        non_strike: mainthis.non_strike.id,
                        player_bowl: mainthis.bowler,
                        ball_number: mainthis.ball_data.current_over + '.' + mainthis.ball_data.current_ball,
                        incident: mainthis.ball_data.incident,
                        run: mainthis.ball_data.ball_run,
                        extra_type: mainthis.ball_data.extra_type,
                        who_out: mainthis.ball_data.who_out
                    }).then(function (response) {
                        mainthis.applySwap();
                        mainthis.takeWicket(event);
                        if (mainthis.ball_data.current_ball == 0 && (mainthis.ball_data.extra_type == null || mainthis.ball_data.extra_type == 'by')) {
                            mainthis.bowler = null;
                        }
                        if (ball == mainthis.match_data.over || mainthis.calcFirstInningsWicket() >= mainthis.match_data.player_total - 1 || mainthis.total_run > mainthis.first_innings.total_first && mainthis.isSecInn) {
                            mainthis.on_strike.id = null;
                            mainthis.non_strike.id = null;
                            mainthis.bowler = null;
                            mainthis.inningsEnd = true;
                        }
                        console.log(response.data);
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else if (ball > this.match_data.over || mainthis.calcFirstInningsWicket() >= mainthis.match_data.player_total - 1 || mainthis.total_run > mainthis.first_innings.total_first && mainthis.isSecInn) {
                    this.on_strike.id = null;
                    this.non_strike.id = null;
                    this.bowler = null;
                    this.inningsEnd = true;
                }
            }
        },
        checkWhoOut: function checkWhoOut() {
            var striker_id = event.srcElement.id;
            if (striker_id == this.non_strike.id) {
                this.ball_data.who_out = 0;
            } else {
                this.ball_data.who_out = 1;
            }
        },
        prepareNextBall: function prepareNextBall(run, local_extra_type, ball_incident) {
            this.runConditions(local_extra_type, run);
            if (this.ball_data.current_ball + 1 <= 5) {
                if ((local_extra_type == 'nb' || local_extra_type == 'wd') && run >= 1 || local_extra_type == null) {
                    this.incBall(this.on_strike.id);
                    this.incBall(this.bowler);
                } else if (local_extra_type == 'by') {
                    this.incBall(this.bowler);
                    this.incBall(this.on_strike.id);
                }
                this.ball_data.current_ball += 1;
            } else if (this.ball_data.current_ball + 1 == 6) {
                this.ball_data.current_ball = 0;
                this.ball_data.current_over += 1;
                if ((local_extra_type == 'nb' || local_extra_type == 'wd') && run >= 1 || local_extra_type == null) {
                    this.incBall(this.on_strike.id);
                    this.incBall(this.bowler);
                } else if (local_extra_type == 'by') {
                    this.incBall(this.bowler);
                    this.incBall(this.on_strike.id);
                }
                this.old_bowler = this.bowler;
            }
        },
        setBallRun: function setBallRun(run, local_extra_type, ball_incident, event) {
            this.ball_data.incident = ball_incident;
            this.ball_data.extra_type = local_extra_type;
            if (local_extra_type == null || local_extra_type == 'by') {
                this.ball_data.ball_run = run;
                this.prepareNextBall(run, local_extra_type, ball_incident);
            } else {
                this.runConditions(local_extra_type, run);
                if (local_extra_type == 'nb' && run >= 1) {
                    this.incBall(this.on_strike.id);
                }
                this.ball_data.ball_run = run + 1;
            }
            this.ball_data.clear_run = run;
            this.addNewBall(event);
            if (local_extra_type != null) {
                this.isExtraBall = false;
            }
        },
        incBall: function incBall(x) {
            this.ball_consumed[this.calculateBall(x)].ball += 1;
        },
        incRun: function incRun(x, y) {
            this.ball_consumed[this.calculateBall(x)].run += y;
        },
        runConditions: function runConditions(x, run) {
            if (x == null) {
                this.incRun(this.bowler, run);
                this.incRun(this.on_strike.id, run);
            } else if (x == 'wd') {
                this.incRun(this.bowler, run + 1);
            } else if (x == 'nb') {
                this.incRun(this.bowler, run + 1);
                this.incRun(this.on_strike.id, run);
            } else if (x == 'by') {
                this.incRun(this.bowler, run);
            }
        },
        fillExtraRunArray: function fillExtraRunArray() {
            if (this.ball_data.extra_type != null) {
                var ex_data = {};
                ex_data['extra'] = this.ball_data.ball_run;
                ex_data['type'] = this.ball_data.extra_type;
                if (this.ball_data.extra_type == 'nb') {
                    ex_data['extra'] = '';
                } else if (this.ball_data.extra_type == 'wd') {
                    ex_data['extra'] -= 1;
                }
                this.extra_runs.push(ex_data);
            }
        },
        fillLastTenArray: function fillLastTenArray() {
            var lastball = '';
            if (this.ball_data.extra_type == null) {
                lastball = this.ball_data.ball_run;
            } else {
                if (this.ball_data.extra_type == 'by') {
                    lastball = this.ball_data.ball_run;
                } else {
                    lastball = this.ball_data.ball_run - 1;
                }
                lastball += this.ball_data.extra_type;
            }
            if (this.ball_data.incident != null) {
                if (this.ball_data.ball_run == 0 || this.ball_data.ball_run == null || this.ball_data.incident == 'ro') {
                    lastball = 'W';
                } else {
                    lastball += 'W';
                }
            }
            if (this.last_ten.length >= 10) {
                this.last_ten.pop();
            }
            this.last_ten.unshift(lastball);
        },
        takeWicket: function takeWicket(event) {
            if (this.ball_data.incident != null && (this.ball_data.incident == 'b' || this.ball_data.incident == 'c' || this.ball_data.incident == 'lbw' || this.ball_data.incident == 'ro')) {
                var striker_id = event.srcElement.id;
                var striker = this.calculateBall(striker_id);
                this.ball_consumed[striker].out = this.ball_data.incident;
                this.ball_consumed[striker].w_taker = this.bowler;
                if (striker_id == this.on_strike.id) {
                    this.on_strike.id = null;
                } else if (striker_id == this.non_strike.id) {
                    this.non_strike.id = null;
                }
                this.partnership.ball = 0;
                this.partnership.run = 0;
            }
        },
        strikeBat: function strikeBat(x) {
            if (this.non_strike.id != this.on_strike.id && this.non_strike.id == x) {
                this.swapStrike();
            } else if (x != this.on_strike.id && this.on_strike.id == '') {
                this.on_strike.id = x;
            } else if (x != this.on_strike.id) {
                this.on_strike.id = x;
            }
        },
        nonStrikeBat: function nonStrikeBat(x) {
            if (this.on_strike.id != this.non_strike.id && this.on_strike.id == x) {
                this.swapStrike();
            } else if (x != this.non_strike.id && this.non_strike.id == '') {
                this.non_strike.id = x;
            } else if (x != this.non_strike.id) {
                this.non_strike.id = x;
            }
        },
        countPartnership: function countPartnership() {
            this.partnership.run += this.ball_data.ball_run;
            if (this.ball_data.extra_type != 'wd') {
                this.partnership.ball += 1;
            }
        },
        endInnings: function endInnings() {
            var mainthis = this;
            axios.post('/getmatchdata/match/endinnings/' + this.match_data.match_id, {
                match_id: this.match_data.match_id
            }).then(function (response) {
                console.log(response.data);
                mainthis.initInnings();
                if (!mainthis.isSecInn) {
                    mainthis.prepareSecInnings();
                } else {
                    mainthis.winner.matchEnded = true;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        applySwap: function applySwap() {
            if (this.ball_data.clear_run % 2 == 1) {
                this.swapStrike();
            }
            if (this.ball_data.current_ball == 0 && (this.ball_data.extra_type == null || this.ball_data.extra_type == 'by')) {
                this.swapStrike();
            }
        },
        undoLastBall: function undoLastBall() {
            var mainthis = this;
            axios.post('/getmatchdata/match/deletelast/' + this.match_data.match_id, {
                match_id: mainthis.match_id
            }).then(function (response) {
                mainthis.resumeMatch();
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
});

/***/ })

/******/ });