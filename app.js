
// define required packages
const watson = require('watson-developer-cloud'),
Twit = require('twit'),
express = require('express'),
fs = require('fs'),
cfenv = require('cfenv'),
http = require('http');

// create a new express server
var app = express();

// define global variables
var num, name;
var texts = [];
var labels = [];
var scores = [];

app.set('view engine','ejs');
app.use(express.static(__dirname));

// To parse the HTML form input
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// define personality insights
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const nlu = new NaturalLanguageUnderstandingV1({
    'username': process.env.username,
    'password': process.env.password,
    'version_date': '2017-02-27'
  });

// define twitter helper
var Twithelper = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  app_only_auth: true
})

/******************** Main Functions ******************/

// if you run the server locally it will run in localhost:port
// otherwise it will run on cloud foundry port
var appEnv = cfenv.getAppEnv();
http.Server(app).listen(appEnv.port, function() {
    console.log("server starting on " + appEnv.url);
});

app.post('/', function(req, res){

  name = req.body.text;
  response = res;

  Twithelper.get('search/tweets',  { 
      q: req.body.text,
      count: 5
     } , function(err, data) {

      if (err) {console.log('Twithelper Error:', err); response.render('table',{data:{error:true}});}

      var json = JSON.stringify(data, null, 2);
      var obj = JSON.parse(json);
      texts = [];
      labels = [];
      scores = [];

      num = 0;
      for (var i = 0; i < obj.statuses.length; i++) {
        analyze(obj.statuses[i].text);
      }

  });//Twithelper.get

});//end of post function

function clean(tweet){

  var cleantweet='';
  var words = tweet.split(" ");

  for (var i = 0; i < words.length - 1; i++) {
    if(words[i]!='RT'&&!words[i].startsWith('http')&&!words[i].startsWith('@')){
      cleantweet = cleantweet.concat(words[i]+' ');
    }
  }

  return cleantweet;
}

function analyze(tweet,res){

  var parameters = {
    text : tweet,
    return_analyzed_text : true,
    features: {
      sentiment: {},
      emotion: {}
    }
  };

  nlu.analyze(parameters, (err, results) => {
      num=num+1;
      if (err) {
        console.log(err);
        texts = texts.concat("unsupported language");
        labels = labels.concat("-");
        scores = scores.concat("-");
      } else {
        texts = texts.concat(results.analyzed_text);
        labels = labels.concat(results.sentiment.document.label);
        scores = scores.concat(results.sentiment.document.score);
      }
      if(num==4){
        var data = {error:false,name:name,text:texts,label:labels,score:scores};
        response.render('table',{data:data});
      }
  });//nlu.analyze

}
