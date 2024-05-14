let cheatBoosts = false;

let modLinks = (window.localStorage.getItem("mods")) ? window.localStorage.getItem("mods").split(",") : [];
let moddedBoosters = {};
modTotal = 0;
for(var i = 0; i < modLinks.length; i++){
  fetch(modLinks[i])
  .then((result) => {
    result.json()
    .then((r) => {
      for(var booster in r){
        console.log(r, booster)
        moddedBoosters[booster] = r[booster];
        load();
        loadBoosts();
      }
    })
    
  })
}
function addMods(link){
  modLinks.push(link);
  window.localStorage.setItem("mods", modLinks.join(","));
  loadBoosts();
}
const code = Math.round(Math.random() * 10000)
window.rebirths = 0;
window._Clicks = 0;
window.clicks = 0;
window._Rebirths = 0;
let acheivementsObj = {
  millionaire: false,
  billionaire: false,
  trillionaire: false,
};
window.__defineGetter__("rebirths", function(x){
  return window._Rebirths;
})
window.__defineSetter__("rebirths", function(x){
  if(x.code && x.code == code){
    window._Rebirths = x.value;
  } 
  if(x.reset){
    rebirthCost += Math.round(rebirthCost * 0.5);
    reset(false);
  }
});
window.__defineGetter__("clicks", function(x){
  return parseInt(window._Clicks);
})
window.__defineSetter__("clicks", function(x){
  if(x.code && x.code == code){
    window._Clicks = x.value;
  } 
});
function colourText(){
  let list = document.getElementsByClassName("purchaseable");
  for(var i = 0; i < list.length; i++){
    if(list[i].classList.contains("modBooster")){
      if(moddedBoosters[list[i].id] && clicks > moddedBoosters[list[i].id].cost){
        list[i].style.color = "#2EA100";
      } else {
        list[i].style.color = "#A10000";
      }
    }
    if(list[i].classList.contains("booster")){
      if(clicks > boosters[list[i].id].cost){
        list[i].style.color = "#2EA100";
      } else {
        list[i].style.color = "#A10000";
      }
    } else if(list[i].classList.contains("autoclicker")){
      if(clicks > autoClickers[list[i].id].cost){
        list[i].style.color = "#2EA100";
      } else {
        list[i].style.color = "#A10000";
      }
    }
  }
}
let rebirthCost = 10000000000;
function updateClicker(elem, clicker){
  elem.innerHTML = `Cost: ${autoClickers[clicker].cost} <br>Owned: ${autoClickers[clicker].owned}`;
}
function updateClicks(){
  document.getElementById("clickCounter").textContent = `Clicks: ${clicks}`
  colourText();
}
let clickerUnlocks = {
  30000: "clicker1",
  120000: "clicker2",
  750000: "clicker3",
  1000000: "clicker4",
  12500000: "clicker5",
  75000000: "clicker6",
  100000000: "clicker7",
  1000000000: "clicker8",
}
let acheivementUnlocks = {
  1000000: "millionaire",
  1000000000: "billionaire",
  1000000000000: "trillionaire",
}
function unlock(){
  for(var a in clickerUnlocks){
    if(clicks >= a){
      autoClickers[clickerUnlocks[a]].unlocked = true;
    }
  }
  for(var a in acheivementUnlocks){
    if(clicks >= a){
      addAcheivement(acheivementUnlocks[a]);
    }
  }
}
let autoClickers = {
  clicker1: {
    interval: 3000,
    unlocked: false,
    cost: 1000,
    unlockAfter: 30000,
    owned: 0,
  },
  clicker2: {
    interval: 2000,
    unlocked: false,
    cost: 20000,
    unlockAfter: 120000,
    owned: 0,
  },
  clicker3: {
    interval: 1500,
    unlocked: false,
    cost: 500000,
    unlockAfter: 750000,
    owned: 0,
  },
  clicker4: {
    interval: 1000,
    unlocked: false,
    cost: 750000,
    unlockAfter: 1000000,
    owned: 0,
  },
  clicker5: {
    interval: 800,
    unlocked: false,
    cost: 10000000,
    unlockAfter: 12500000,
    owned: 0,
  },
  clicker6: {
    interval: 600,
    unlocked: false,
    cost: 50000000,
    unlockAfter: 75000000,
    owned: 0,
  },
  clicker7: {
    interval: 400,
    unlocked: false,
    cost: 175000000,
    unlockAfter: 100000000,
    owned: 0,
  },
  clicker8: {
    interval: 200,
    unlocked: false,
    cost: 1000000000,
    unlockAfter: 10000000000,
    owned: 0,
  }
}

document.getElementById("acheivements").acheivements = true;
let autoclickerDiv = document.createElement("div");
function switchDivs(){
  if(document.getElementById("acheivements").acheivements){
    document.getElementById("acheivements").acheivements = false;
    let str = '<button onclick="switchDivs()">Switch to achievements</button><br>';
    document.getElementById("acheivements").innerHTML = "";
    for(var autoclicker in autoClickers){
      if(autoClickers[autoclicker].unlocked){
        str += `<div onmouseover="document.getElementById('data').textContent = \`An autoclicker, clicks once every ${autoClickers[autoclicker].interval} milliseconds.\`" class="unselectable purchaseable autoclicker" id="${autoclicker}" onclick="if (clicks > autoClickers['${autoclicker}'].cost) {clicks = {value: clicks - autoClickers['${autoclicker}'].cost, code: code}; autoClickers['${autoclicker}'].owned += 1; autoClickers['${autoclicker}'].cost += Math.round(autoClickers['${autoclicker}'].cost * (0.2 - rebirths/500)); updateClicks(); updateClicker(this, '${autoclicker}'); } else{ alert('You dont have enough clicks for that!')}" >Cost: ${autoClickers[autoclicker].cost} <br>Owned: ${autoClickers[autoclicker].owned}</div>`;
        /*let div = document.createElement("div");
        div.id = autoclicker;
        div.onclick = function(){
          let clicker = autoClickers[this.id];
          if(clicks > clicker.cost){
            autoClickers[this.id].cost += Math.round(clicker.cost * 0.2);
            autoClickers[this.id].cost += Math.round(autoClickers[this.id].cost * 0.2);
            autoClickers[this.id].owned += 1;
            clicks -= clicker.cost;
            updateClicks();
            div.textContent = `${this.id} <br> cost: ${autoClickers[this.id].cost} <br> owned: ${autoClickers[this.id].owned} <br> CPS: ${1000 / autoClickers[this.id].interval}`
            console.log(div)
            document.getElementById("acheivements").appendChild(div);
            console.log(div)*/
          }else {
        str += '<p class="unselectable">You have not unlocked this clicker.</p>'
          }
        }
    document.getElementById("acheivements").innerHTML = str;
      } else {
    document.getElementById("acheivements").acheivements = true;
    document.getElementById("acheivements").innerHTML = "";
    let str = '<button onclick="switchDivs()">Switch to autoclickers</button><br>';
    for(var acheivment in acheivementsObj){
      if(acheivementsObj[acheivment]){
        str += `<p class="unselectable" class="acheived unselectable" id=${acheivment}>${acheivment}</p>`;
      } else {
        str += `<p class="not_acheived unselectable" id=${acheivment}>${acheivment}</p>`;
      }
    }
    document.getElementById("acheivements").innerHTML = str;
      }
    }
function updateBoosts(){
  for (var boost in boosters){
    let booster = boosters[boost];
    document.getElementById(boost).innerHTML = `<p class="unselectable purchaseable booster" style="width: 200px;" onClick="${boost}Buy()" id="${boost}">Buy ${booster.name} <br>Cost: ${booster.cost} <br>Owned: ${booster.owned}</p>`
    
  }
}
function reset(includeRebirths = true) {
  let condition = true;
  let mods = (window.localStorage.getItem("mods")) ? window.localStorage.getItem("mods").split(",") : [];
  if(includeRebirths){
    condition = confirm("Are you sure you want to reset progress??");
  }
  (condition) ? window.localStorage.clear() : null;
  if(!includeRebirths && condition){
    window.localStorage.setItem("rebirths", rebirths)
    window.localStorage.setItem("rebirthcost", rebirthCost);
  }
  window.localStorage.setItem("mods", mods.join(","));
  (condition) ? location.reload() : null;
}
let boosters = {
  b1: {
    name: "Booster 1",
    boostAmount: 1,
    origin: "vanilla",
    description: "A basic booster, boosts clicks gained per click by one.",
    cost: 20,
    owned: 0,
  },
  b2: {
    name: "Booster 2",
    boostAmount: 5,
    origin: "vanilla",
    description: "A basic booster, boosts clicks gained per click by five.",
    cost: 550,
    owned: 0,
  },
  b3: {
    name: "Booster 3",
    boostAmount: 10,
    origin: "vanilla",
    description: "A basic booster, boosts clicks gained per click by ten.",
    cost: 2000,
    owned: 0,
  },
  b4: {
    name: "Booster 4",
    boostAmount: 15,
    origin: "vanilla",
    description: "A basic booster, boosts clicks gained per click by fifteen.",
    cost: 10000,
    owned: 0,
  },
  b5: {
    name: "Booster 5",
    boostAmount: 25,
    origin: "vanilla",
    description: "A basic booster, boosts clicks gained per click by twenty-five.",
    cost: 75000,
    owned: 0,
  },
}
let totalBoosts = 0;


function load(){
  clicks = {value: parseInt(window.localStorage.getItem("clicks")) || 0, code: code}
  totalBoosts = parseInt(window.localStorage.getItem("totalBoosts")) || 0;
  boosters = JSON.parse(window.localStorage.getItem("boosters")) || boosters;
  acheivementsObj = JSON.parse(window.localStorage.getItem("acheivements")) || acheivementsObj;
  autoClickers = JSON.parse(window.localStorage.getItem("autoclickers")) || autoClickers;
  rebirths = { value: parseInt(window.localStorage.getItem("rebirths")) || rebirths, code: code };
  rebirthCost = parseInt(window.localStorage.getItem("rebirthcost")) || rebirthCost;
  moddedBoosters = (window.localStorage.getItem("moddedBoosters") && window.localStorage.getItem("moddedBoosters") != "{}") ?JSON.parse(window.localStorage.getItem("moddedBoosters")) : moddedBoosters;
  modTotal = parseInt(window.localStorage.getItem("modTotal")) || 0;
  updateClicks();
}
load();
colourText();
document.getElementById("rebirth").textContent = "Rebirth cost: " + rebirthCost;
function loadBoosts(){
  let finalStr = "";
  let div = document.getElementById("boosters");
  for (var boost in boosters){
    if(boosters[boost].unlockCondition && !eval(boosters[boost].unlockCondition)){ continue; }
    let booster = boosters[boost]
    console.log(booster);
    
    window[`${boost}Buy`] = function(elem){
      let boost2 = elem.id;
      if(clicks > boosters[boost2].cost){
        clicks = {value: clicks - boosters[boost2].cost, code: code};
        boosters[boost2].cost += Math.floor(boosters[boost2].cost * (0.2 - rebirths/500));
        boosters[boost2].owned += 1;
        updateClicks();
        elem.innerHTML = boosters[boost2].name + " owned: " + boosters[boost2].owned + "<br> Cost: " + boosters[boost2].cost;
        totalBoosts += booster.boostAmount;
      }
    }
    let str = `
    <p class="unselectable purchaseable booster" style="width: 200px;" onClick="${boost}Buy(this)" onmouseover="document.getElementById('data').innerHTML = \`\${boosters[this.id].description} <br>This booster originates from \${boosters[this.id].origin} and it costs \${boosters[this.id].cost} clicks. <br>You have \${boosters[this.id].owned} of these boosters. \`" id="${boost}">Buy ${booster.name} <br>Cost: ${booster.cost} <br>Owned: ${booster.owned}</p>
    `
    finalStr += str;
  }
  if(window.localStorage.getItem("mods")){
    for (var boost in moddedBoosters){
      if(moddedBoosters[boost].unlockCondition && !eval(moddedBoosters[boost].unlockCondition)){ continue; }
      let booster = moddedBoosters[boost]
      console.log(booster);

      window[`${boost}Buy`] = function(elem){
        let boost2 = elem.id;
        if(clicks > moddedBoosters[boost2].cost){
          clicks = {value: clicks - moddedBoosters[boost2].cost, code: code};
          moddedBoosters[boost2].cost += Math.floor(moddedBoosters[boost2].cost * (0.2 - rebirths/500));
          moddedBoosters[boost2].owned += 1;
          updateClicks();
          elem.innerHTML = moddedBoosters[boost2].name + " owned: " + moddedBoosters[boost2].owned + "<br> Cost: " + moddedBoosters[boost2].cost;
          modTotal += booster.boostAmount;
        }
      }
      let str = `
      <p class="unselectable purchaseable modBooster" style="width: 200px;" onClick="${boost}Buy(this)" onmouseover="document.getElementById('data').innerHTML = \`\${moddedBoosters[this.id].description} <br>This booster originates from \${moddedBoosters[this.id].origin} and it costs \${moddedBoosters[this.id].cost} clicks. <br>You have \${moddedBoosters[this.id].owned} of these boosters. \`" id="${boost}">Buy ${booster.name} <br>Cost: ${booster.cost} <br>Owned: ${booster.owned}</p>
      `
      finalStr += str;
    }
  }
  finalStr += "<button onclick='loadBoosts()'>Reload Boosts</button>";
  div.innerHTML = finalStr;
}
loadBoosts();
function save(){
  window.localStorage.setItem("clicks", clicks);
  window.localStorage.setItem("totalBoosts", totalBoosts);
  window.localStorage.setItem("boosters", JSON.stringify(boosters));
  window.localStorage.setItem("acheivements", JSON.stringify(acheivementsObj))
  window.localStorage.setItem("autoclickers", JSON.stringify(autoClickers))
  window.localStorage.setItem("rebirths", rebirths);
  window.localStorage.setItem("rebirthcost", rebirthCost);
  window.localStorage.setItem("moddedBoosters", JSON.stringify(moddedBoosters));
  window.localStorage.setItem("modTotal", modTotal);
}
function addAcheivement(name){
  if(document.getElementById(name) && document.getElementById(name).classList.toString().split(" ").includes("not_acheived")){
    document.getElementById(name).classList.remove("not_acheived");
  }
  (!acheivementsObj[name]) ? acheivementsObj[name] = true : null;
}
setInterval(function(){
  clicks = {value: clicks + (totalBoosts + 1) * autoClickers.clicker1.owned, code: code };
  unlock();
  updateClicks();
}, autoClickers.clicker1.interval);
setInterval(function(){
  clicks = {value: clicks + (totalBoosts + 1) * autoClickers.clicker2.owned, code: code };
  unlock();
  updateClicks();
}, autoClickers.clicker2.interval);

setInterval(function(){
  clicks = {value: clicks + (totalBoosts + 1) * autoClickers.clicker3.owned, code: code };
  unlock();
  updateClicks();
}, autoClickers.clicker3.interval);

setInterval(function(){
  clicks = {value: clicks + (totalBoosts + 1) * autoClickers.clicker4.owned, code: code };
  unlock();
  updateClicks();
}, autoClickers.clicker4.interval);

setInterval(function(){
  clicks = {value: clicks + (totalBoosts + 1) * autoClickers.clicker4.owned, code: code };
  unlock();
  updateClicks();
}, autoClickers.clicker4.interval);

setInterval(function(){
  clicks = {value: clicks + (totalBoosts + 1) * autoClickers.clicker5.owned, code: code };
  unlock();
  updateClicks();
}, autoClickers.clicker5.interval);
setInterval(function(){
  clicks = {value: clicks + (totalBoosts + 1) * autoClickers.clicker6.owned, code: code };
  unlock();
  updateClicks();
}, autoClickers.clicker6.interval);
setInterval(function(){
  clicks = {value: clicks + (totalBoosts + 1) * autoClickers.clicker7.owned, code: code };
  unlock();
  updateClicks();
}, autoClickers.clicker7.interval);
setInterval(function(){
  clicks = {value: clicks + (totalBoosts + 1) * autoClickers.clicker8.owned, code: code };
  unlock();
  updateClicks();
}, autoClickers.clicker8.interval);
for (var clicker in autoClickers){
  if(!autoClickers[clicker].reduced){
    autoClickers[clicker].cost -= Math.round(autoClickers[clicker].cost * (rebirths/500));
    autoClickers[clicker].reduced = true;
  }
}
for (var booster in boosters){
  if(!boosters[booster].reduced){
    boosters[booster].cost -= Math.round(boosters[booster].cost * (rebirths/500));
    boosters[booster].reduced = true;
    save();
  }
}
function rebirth(){
  if(clicks > rebirthCost){
    if(confirm("Are you sure you want to rebirth?? You will lose everything except your rebirth count.")){
      /*clicks -= rebirthCost;
      rebirthCost += Math.round(rebirthCost * 0.5);
      rebirths += 1;
      reset(false);
    }*/
        rebirths = {code: code, value: rebirths + 1, reset: true};
  }
  } else {
    alert("You dont have enough to rebirth yet.")
  }

}
/*function init() {
  let button = document.createElement('button');
  button.id = 'dyslexieToggle';
  button.onclick = enableDyslexie;
  button.innerHTML = "Enable Dyslexia-friendly font!";

  let style = document.createElement('style');
  let dyslexieFont = false;

  let dyslexieStyle = `
    textarea {
      font-family: 'Dyslexie' !important;
      }
      html{
        font-family: 'Dyslexie' !important;
      }
      button{
        font-family: 'Dyslexie' !important;
      }
      p{
        font-family: 'Dyslexie' !important;
      }
      a{
        font-family: 'Dyslexie' !important;
      }

      @font-face {
        font-family: 'Dyslexie';
        src: url("Dyslexie.ttf") format('truetype');
      }
  `;

  document.body.appendChild(button);
  style.innerHTML = `
  @font-face {
    font-family: 'Dyslexie';
    src: url("Dyslexie.ttf") format('truetype');
    }
  #dyslexieToggle{
    font-family: 'Dyslexie' !important;
    }
  `
  document.head.appendChild(style);

  function enableDyslexie() {
    if (dyslexieFont === false) {
      style.innerHTML = dyslexieStyle;
      dyslexieFont = true;
    } else if (dyslexieFont === true) {
      style.innerHTML = '';
      dyslexieFont = false;
    }
  }
};
const dyslexie = {
  init: function() {
    init()
  },
  info: function() {
    console.log(
  "%cHello! If this is showing up, you used \"dyslexie.info()\" for help with the dyslexie font script. %cYou simply use \"dyslexie.init()\" for it to start, you can customize the button's style because it has the id \"dyslexieToggle\".",
  "font-size: 30px;",
  "font-size: 20px;"
);

  }
};*/
