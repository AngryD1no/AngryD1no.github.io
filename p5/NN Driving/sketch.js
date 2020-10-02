let nn;
let nn_Name = 'testing6';
let track1;
let img;
let canvas;
let store = false;
let pop_len = 600;
let Population;
let stage;
let inside;
let brain_shape = [6,7,7,2];
let outside;
let save_button;
let show_button;
let init_brain;
let showAll = false;
var score_Data = ['generation,average_score'];
function setup() {
  img = loadImage('car.jpg');
  if (JSON.parse(localStorage.getItem(nn_Name))) {
    init_brain = JSON.parse(localStorage.getItem(nn_Name));
  }else {
    init_brain = false;
  }
  stage = 0;
  outside_button = createButton('Draw Outside');
  outside_button.position(windowWidth*0.90,windowHeight * 0.02);
  outside_button.mouseClicked(drawOutside);
  inside_button = createButton('Draw Inside');
  inside_button.position(windowWidth*0.82,windowHeight * 0.02);
  inside_button.mouseClicked(drawInside);
  startLine_button = createButton('Set Start Line');
  startLine_button.position(windowWidth*0.82,windowHeight * 0.06);
  startLine_button.mouseClicked(setStart);
  start_button = createButton('Start Driving');
  start_button.position(windowWidth*0.90,windowHeight * 0.06);
  start_button.mouseClicked(startDriving);
  show_button = createButton('Show all');
  show_button.position(windowWidth*0.82,windowHeight * 0.1);
  show_button.mouseClicked(changeShow);
  save_button = createButton('Save Best');
  save_button.position(windowWidth*0.90,windowHeight * 0.1);
  save_button.mouseClicked(saveBest);
  startpos = createVector(40,350);
  direction = -PI/2;
  canvas = createCanvas(windowWidth*0.8,windowHeight);
  canvas.position(0,0);
  inside = [];
  outside = [];
}

function download_csv() {
    var csv = 'generation,average_score\n';
    score_Data.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
}

function draw() {
  background(50,200,50);
  if(track1){track1.show();}

  if (stage >= 3) {
    if (Population.step >= pop_len || Population.active == false) {
      Population.active = false;
      Population.naturalSelection();
      Population.step = 0;
      Population.active = true;
      console.log(Population.fitnessSum/Population.size);
      Population.fitnessSum = 0;
      console.log(Population.generation);
      score_Data += [Population.generation,Population.fitnessSum/Population.size];
    }


    if (Population.active) {
      Population.update();
    }

    if (showAll) {
      Population.show();
    }else {
      Population.showBest();
    }
  }

  if (stage <= 1){
    fill(100);
    beginShape();
    for (var i = 0; i < outside.length; i++) {
      vertex(outside[i].x,outside[i].y);
    }
    endShape(CLOSE);
    for (var i = 0; i < outside.length; i++) {
      line(inside[i].x,inside[i].y,outside[i].x,outside[i].y);
    }
    stroke(0);
    strokeWeight(5)

    fill(50,200,50);
    beginShape();
    for (var i = 0; i < inside.length; i++) {
      vertex(inside[i].x,inside[i].y);
    }
    endShape(CLOSE);
  }
}

function saveBest() {
  Population.saveBest();
}

function setStart() {
  track1 = new track(inside,outside);
  stage = 2;
}

function mouseClicked() {
  if (mouseX < width && mouseY < height) {
    if (stage == 0 && mouseButton === LEFT) {
      inside.push(createVector(mouseX,mouseY));
    }
    if (stage == 1 && mouseButton === LEFT) {
      outside.push(createVector(mouseX,mouseY));
    }
    if (stage == 2 && mouseButton === LEFT) {
      startpos = createVector(mouseX,mouseY);
    }
  }
}

function changeShow(){
  if (showAll) {
    showAll = false;
    show_button.html("Show all");
  }else {
    showAll = true;
    show_button.html("Show best");
  }
}

function startDriving() {
  if (stage == 2) {
    direction = -PI/2;
    Population = new population(100,startpos,direction,0.1,init_brain);
    stage = 3;
  }
}
function drawOutside() {
  stage = 1;
}
function drawInside() {
  stage = 0;
}
function storeBest(){
  store = true;
}
