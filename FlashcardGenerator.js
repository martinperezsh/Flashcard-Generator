var inquirer = require('inquirer');
var fs = require('fs')
var mysql = require('mysql');
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'flashcard_db'
});

connection.connect(function(error) {
    if (error) {
        throw error;
    }
    
});

inquirer.prompt([
	{
		type: 'rawlist',
		name: 'firstQ',
		message: 'Pick one of the following options:',
		choices: [
			'New Basic Card',
			'New Clozed Card',
			'View Basic cards',
			'View Clozed cards'
		],

	}
]).then(function(answers) {
	// console.log(JSON.stringify(answers, null, '  '));
    if (answers.firstQ === 'New Basic Card') {
    	inquirer.prompt([
    		{
    			name: 'basicFront',
    			type: 'input',
    			message: 'What would you like on the front of the card?'
    		},
            {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm1",
                default: true
            },
            {
                name: 'basicBack',
                type: 'input',
                message: 'What would you like on the back of the card?'
            },
            {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm2",
                default: true
            }
        ]).then(function(answers){
            if (answers.confirm1, answers.confirm2){
                var newBasicCard = new BasicCard(answers.basicFront, answers.basicBack);

                var basiclogtxt = 'Front: ' + answers.basicFront + ', Back: ' + answers.basicBack + '-----';

                fs.appendFile("basiclog.txt", basiclogtxt);
            }
        });

    } 

    else if (answers.firstQ === 'New Clozed Card'){
        inquirer.prompt([
            {
                name: 'fulltext',
                type: 'input',
                message: 'What is the full sentence?'
            },
            {
                name: 'confirm1',
                type: 'confirm',
                message: 'Are you sure?',
                default: true
            },
            {
                name: 'clozed',
                type: 'input',
                message: 'What part of the sentence would you like to cut?'
            },
            {
                name: 'confirm2',
                type: 'confirm',
                message: 'Are you sure?',
                default: true
            },
            {
                name: 'partial',
                type: 'input',
                message: 'Whats left of the sentence?'
            },
            {
                name: 'confirm3',
                type: 'confirm',
                message: 'Are you sure?',
                default: true
            }
        ]).then(function(answers){
                if (answers.confirm1, answers.confirm2, answers.confirm3){
                    var newClozedCard = new ClozeCard(answers.fulltext, answers.clozed);

                    var clozedlogtxt = 'Full: ' + answers.fulltext + ', Clozed: ' + answers.clozed + ', Partial: ' + answers.partial + '-----';

                    fs.appendFile("log.txt", clozedlogtxt);
                }
        });
    } 

    else if (answers.firstQ === 'View Basic cards') {
    	fs.readFile('basiclog.txt', "utf8", function (err, data) {
            if (err) throw err;
            console.log(JSON.stringify(data, null, 2));
        });
    }  

    else if (answers.firstQ === 'View Clozed cards') {
    	fs.readFile('log.txt', "utf8", function (err, data) {
            if (err) throw err;
            console.log(JSON.stringify(data, null, 2));
        });
    }
});