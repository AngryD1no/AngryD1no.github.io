class population {
  constructor(size,position, direction,mr,starter) {
    this.cars = [];
    this.size = size;
    this.mutation_rate = mr
    this.active = true;
    this.generation = 0;
    this.fitnessSum = 0;
    this.position = position;
    this.direction = direction;
    this.step = 0;
    this.brains = [];
    this.new_brains = [];
    if (starter) {
      for (var i = 0; i < size; i++) {
        this.brains[i] = NeuralNetwork.load(starter);
        this.cars[i] = new car(this.brains[i],position, direction);
      }
    }else{
      for (var i = 0; i < size; i++) {
        this.brains[i] = new NeuralNetwork(brain_shape);
        this.cars[i] = new car(this.brains[i],position, direction);
      }

    }
  }
  show(){
    for (var i = 0; i < this.cars.length; i++) {
      this.cars[i].show();
    }
  }
  showBest(){
    this.cars[0].show();
  }
  update(){
    let completed = true;
    for (var i = 0; i < this.cars.length; i++) {
      this.cars[i].update();
      if (this.cars[i].driving) {
        completed = false;
      }
    }
    if (completed) {
      this.active = false;
    }
    this.step++;

  }
  saveBest(){
    localStorage.setItem(nn_Name,JSON.stringify(this.cars[0].brain));
  }
  naturalSelection(){
    let max_score = -1;
    for (var i = 0; i < this.cars.length; i++) {
      if(this.cars[i].fitness > max_score){
        this.new_brains[0] = this.cars[i].brain.copy();
        max_score = this.cars[i].fitness;
      }
    }
    if (store) {
      let best = JSON.stringify(this.new_brains[0]);
      localStorage.setItem('brain', best);
      store = false;
    }
    this.calculateFitnessSum();
    for (var i = 1; i < this.cars.length; i++) {
      let parent = this.selectParents();
      this.new_brains[i] = parent.copy();
      this.new_brains[i].mutate(this.mutation_rate);
    }
    for (var i = 0; i < this.cars.length; i++) {
      this.cars[i] = new car(this.new_brains[i],this.position,this.direction);
    }
    this.generation++;
  }
  calculateFitnessSum(){
    for (var i = 0; i < this.cars.length; i++) {
      this.fitnessSum += this.cars[i].fitness;
    }
  }
  selectParents(){
    let rand = Math.random()*this.fitnessSum;
    let runningSum = 0;

    for (var i = 0; i < this.cars.length; i++) {
      runningSum += this.cars[i].fitness;
      if (runningSum > rand) {
        return this.cars[i].brain;
      }
    }
    return this.cars[this.cars.length-1].brain;

  }
}
