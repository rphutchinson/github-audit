var GitHubApi = require("github");
var googleApis = require("googleapis");
var parseLinks = require("parse-links");
var argsParser = require("argsparser");

var github = new GitHubApi({version: "3.0.0"});

//initialization stuff
var repos = [];
var clArgs = argsParser.parse();
var username = clArgs['-u'];
var password = clArgs['-p'];
var organization = clArgs['-o'];

//execute the program logic
getData();

//helper functions
function getData(page){
	page = page || 1;
	authenticate();
	github.repos.getFromOrg({org: organization, page: page}, function(err, res){

		var links = parseLinks(res.meta.link);
		var next = links.next;
		
		//add all the results to the repos array
		delete(res.meta);
		repos = repos.concat(res);	

		if(next){
			getData(next.substring(next.lastIndexOf('page=')+5));
		} else {
			completed();
		}	
	});
}

function authenticate(){
	github.authenticate({
		type:'basic',
		username: username,
		password: password
	});	
}

function completed(){
	console.log(repos.length + ' total repositories');
	var unaccountedFor = [];
	for(var i=0; i<repos.length; i++){
		//if this repo is in our list of known of repos then remove it from the list 
		if(existingData.indexOf(repos[i].name) === -1){
			unaccountedFor.push(repos[i]);
		}
	}

	console.log(unaccountedFor.length + ' repositories unaccounted for');
	for(var i=0; i<unaccountedFor.length; i++){
		console.log(unaccountedFor[i].name);
	}
}

var existingData = [
'520',
'520dash',
'analytics-engine',
'beeroclock',
'fivetwenty-ingress',
'gaas-appserver',
'gaas-can',
'graph-analytics',
'hackathon2011',
'heroku-buildpack-scala',
'hook.io-ring',
'hook.io-ring-http-server',
'knapsack',
'OpenSourceYourCompany',
'platform-api-java-client',
'platform-api-node-client',
'platform-api-scala-client',
'platform-api-server',
'platform-dashboard',
'platform-job-worker',
'sparcbot',
'Sparcet-Public',
'sprocket',
'turbine',
'turbine-blade',
'turbine-cache-generator',
'core-care',
'Sparcet-Mobile',
'Sparcet-facebook',
'SparcdMobile-iOS',
'HugFactor',
'teamphoria-web',
'Sparcet-iOS',
'sparc-interview',
'stem_premier',
'STEM_Android',
'interview_tests',
'timesheet-web-service',
'EagleRiver',
'chs-battery-stats',
'timesheet-chrome-extension',
'intacct-xdk-client',
'intacct-webservice',
'intacct-reporting',
'intacct-ios-app',
'intacct-android-app',
'intacct-mobile-webapp',
'clark-precon',
'CrowdFlik-iOS',
'CrowdFlik-Android',
'CrowdFlik-API',
'crowdflik-api-load-testing',
'hackathon-judging',
'hackathon-selection',
'knappsack-ios',
'sparcet-ios',
'SPARC-Mobile-Signin',
'HackathonSignIn',
'HackathonTimer-iOS'
]

