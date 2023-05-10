let inject = document.getElementById("inject");
let sinnohQuestions = [];
let unovaQuestions = [];
let kalosQuestions = [];
let region = 0;
let count = 0;
let totalScore = 0;
let totalQuestions = 20;

let score = document.getElementById("score");
let p = document.getElementById("p");
let a1 = document.getElementById("a1");
let a2 = document.getElementById("a2");
let a3 = document.getElementById("a3");
let a4 = document.getElementById("a4");

function loadHTML(url) {
  fetch(url)
    .then((data) => data.text())
    .then((response) => {
      if (url === "../site/mainMenu.html") {
        loadMainMenu(response);
      } else if (url === "../site/instructions.html") {
        loadInstructions(response);
      } else if (url === "../site/lvlSelect.html") {
        loadLvl(response);
      } else if (url === "../site/pokemon.html" && region == 1) {
        loadGame(response, sinnohQuestions);
      } else if (url === "../site/pokemon.html" && region == 2) {
        loadGame(response, unovaQuestions);
      } else if (url === "../site/pokemon.html" && region == 3) {
        loadGame(response, kalosQuestions);
      } else if (url === "../site/finished.html") {
        loadFinishedPage(response);
      }
    });
}

function getQuestions(url) {
  fetch(url)
    .then((data) => data.json())
    .then((response) => {
      for (let i = 0; i < 20; i++) {
        sinnohQuestions.push(response.sinnoh[i]);
        region = 1;
      }
      for (let w = 0; w < 20; w++) {
        unovaQuestions.push(response.unova[w]);
        region = 2;
      }
      for (let j = 0; j < 20; j++) {
        kalosQuestions.push(response.kalos[j]);
        region = 3;
      }
    });
}

function loadMainMenu(html) {
  inject.innerHTML = html;

  let injectLvl = document.getElementById("injectLevel");

  injectLvl.addEventListener("click", function (e) {
    loadHTML("../site/instructions.html");

    console.log("this works");
  });
}

function loadInstructions(html) {
  inject.innerHTML = html;
  console.log(html);
  let ready = document.getElementById("ready");
  ready.addEventListener("click", function (e) {
    loadHTML("../site/lvlSelect.html");
  });
}

function loadLvl(html) {
  inject.innerHTML = html;
  let injectSinnoh = document.getElementById("injectSinnoh");
  let injectUnova = document.getElementById("injectUnova");
  let injectKalos = document.getElementById("injectKalos");
  injectSinnoh.addEventListener("click", function (e) {
    loadHTML("../site/pokemon.html");
    region = 1;
  });
  injectUnova.addEventListener("click", function (e) {
    loadHTML("../site/pokemon.html");
    region = 2;
  });
  injectKalos.addEventListener("click", function (e) {
    loadHTML("../site/pokemon.html");
    region = 3;
  });
}

function loadGame(html, questions) {
  inject.innerHTML = html;
  let Q = document.getElementById("Q");
  let a1 = document.getElementById("a1");
  let a2 = document.getElementById("a2");
  let a3 = document.getElementById("a3");
  let a4 = document.getElementById("a4");
  let timerCount = document.getElementById("timer");
  let counter = document.getElementById("counter");
  
  let vol = true
  
  let qNum = 0;
  let timer = 20;
  
  
  let audio = document.getElementById('sound');
        audio.play();
        let volumeBtn = document.getElementById('volume-btn')
        volumeBtn.addEventListener('click',function(e){
            
            if(vol){
                audio.pause()
                vol = false
            }
            else
            {
                audio.play()
                vol = true
            }
            
        })
  timer = setInterval(updateTime, 1000);
  console.log(timer)
  Q.innerText = questions[0].q;
  console.log(questions);
  a1.innerText = questions[0].a1;
  a2.innerText = questions[0].a2;
  a3.innerText = questions[0].a3;
  a4.innerText = questions[0].a4;
  a1.addEventListener("click", function (e) {
    checkAnswer(a1.innerText);
    updateTime();
  });
  a2.addEventListener("click", function (e) {
    checkAnswer(a2.innerText);
    updateTime();
  });
  a3.addEventListener("click", function (e) {
    checkAnswer(a3.innerText);
    updateTime();
  });
  a4.addEventListener("click", function (e) {
    checkAnswer(a4.innerText);
    updateTime();
  });
  function checkAnswer(answer) {
    if (answer === questions[qNum].c) {
      totalScore++;
      counter.innerText = `Score: ${totalScore}/20`;;
    }
    
    timer = 20;
    timerCount.innerText = timer;
    nextQuestion();
  }
  function updateTime() {
    timer--;
    if (timer == 0) {
      timer = 20;
      timerCount.innerText = timer;
      nextQuestion();
      
    } else {
      timerCount.innerText = timer;
    }
  }
  function nextQuestion() {
    qNum++;
    if (qNum < totalQuestions) {
      console.log(qNum);

      loadQuestion();
    } else {
      
      // clearInterval(timer);
      loadHTML("../site/finished.html");
    }
  }
  function loadQuestion() {
    Q.innerText = questions[qNum].q;
    a1.innerText = questions[qNum].a1;
    a2.innerText = questions[qNum].a2;
    a3.innerText = questions[qNum].a3;
    a4.innerText = questions[qNum].a4;
  }
}
function loadFinishedPage(html) {
  inject.innerHTML = html;
  let correct = document.getElementById("correct");
  correct.innerText = `${totalScore}/${totalQuestions}`
  let replayBtn = document.getElementById("replayBtn");
  
  let vol = true
  let audio = document.getElementById('sound');
        audio.play();
        let volumeBtn = document.getElementById('volume-btn')
        volumeBtn.addEventListener('click',function(e){
            
            if(vol){
                audio.pause()
                vol = false
            }
            else
            {
                audio.play()
                vol = true
            }
        })
  replayBtn.addEventListener("click", function (e) {
    loadHTML("../site/instructions.html");
  });
}

loadHTML("../site/mainMenu.html");
getQuestions("../Data/data.json");
