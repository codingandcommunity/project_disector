var fs = require('fs');
const git = require('simple-git')();
var readline = require('readline-sync');

var count = 0



function errorlog(err, idk){
  console.log(err);
  console.log(idk);
}


var repo_link = readline.question("Enter the link to the repo\n");

console.log(repo_link);
repo_link = "https://github.com/codingandcommunity/test-project.git";

var repo_path = readline.question("Where would you like this to be stored (type h or here for wrking dir)\n");
if(repo_path == 'here' || repo_path == 'h'){
  repo_path = process.cwd() + "\\converted_repo";
}

console.log(repo_path);


function projectStatHandler(err, stat) {
  //if the directory exists then create the directory and then the callback function clones the repo
  if(err && err.code == "ENOENT"){
    fs.mkdir(repo_path, errorlog);
    console.log("made the Directory at " + repo_path);
    gitstuff(repo_path);
  }

  //otherwise add one to project path and then check the path again
  else{
    console.log('Directory already exists.');
    count = count + 1;
    if(count > 1){
      repo_path = repo_path.substr(0,repo_path.length-3);
    }
    repo_path = repo_path + "(" + count + ")";

    return projectCheck();
  }
}

//calls fs.stat which checks the status of a directory
function projectCheck(){
  let promise = new Promise((resolve, reject) => {
    fs.stat(repo_path, resolve);
  }).then((err, stat) => {
    projectStatHandler(err, stat)
  });

  return promise;
}

count = 0;
//the button code to find the correct project directory and clone it from github
let promise = projectCheck();


promise.then(
  console.log("hi2") //git.cwd(repo_path).clone("https://github.com/codingandcommunity/test-curriculum.git").log(errorlog) )
);

function gitstuff(repo_path){
  console.log("hi3");
  //git.cwd(repo_path).clone("https://github.com/codingandcommunity/test-curriculum.git").log(errorlog);
  git.cwd(repo_path, errorlog);
  git.clone(repo_link);//.log(errorlog);
  console.log("LOOK HERE");
  console.log("repo link is " + repo_link);
  console.log(repo_link.lastIndexOf("/"));
  var clone_path = repo_path + "\\" + repo_link.substr(repo_link.lastIndexOf("/")+1,(repo_link.length));
  clone_path = clone_path.substr(0,clone_path.length-4);
  console.log("clone path is " + clone_path);
  git.cwd(clone_path).log((err, log) => console.log(log));
}
