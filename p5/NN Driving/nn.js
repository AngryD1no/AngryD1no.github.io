class NeuralNetwork {
  constructor(a,lr) {
    if (a instanceof NeuralNetwork) {
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = [];
      for (var i = 0; i < a.hidden_nodes.length; i++) {
        this.hidden_nodes[i] = a.hidden_nodes[i];
      }
      this.output_nodes = a.output_nodes;
      this.weights = [];
      this.biases = [];
      for (var i = 0; i < a.weights.length; i++) {
        this.weights[i] = a.weights[i].copy();
        this.biases[i] = a.biases[i].copy();
      }
    }else {
      this.input_nodes = a[0];
      this.hidden_nodes = [];
      for (var i = 1; i < a.length-1; i++) {
        this.hidden_nodes[i-1] = a[i];
      }
      this.output_nodes = a[a.length-1];
      this.weights = [];
      this.biases = [];
      for (var i = 0; i < a.length-1; i++) {
        this.weights[i] = new Matrix(a[i+1],a[i]);
        this.biases[i] = new Matrix(a[i+1],1);
        this.weights[i].randomize();
        this.biases[i].randomize();
      }
      this.lr = lr;
    }
  }
  feedforward(input) {
    input = Matrix.fromArray(input);
    let hidden_layers_output = [];
    for (var i = 0; i < this.hidden_nodes.length; i++) {
      if (i == 0) {
        hidden_layers_output[i] = Matrix.multiply(this.weights[i],input);
      }else{
        hidden_layers_output[i] = Matrix.multiply(this.weights[i],hidden_layers_output[i-1]);
      }
      hidden_layers_output[i].add(this.biases[i]);
      hidden_layers_output[i].map(sigmoid);
    }
    let output = Matrix.multiply(this.weights[this.weights.length-1],hidden_layers_output[this.hidden_nodes.length-1]);
    output.add(this.biases[this.biases.length-1]);
    output.map(sigmoid);
    output = Matrix.transpose(output).data[0];
    return output;
  }
  train(input,target){
    input = Matrix.fromArray(input);
    let hidden_layers_output = [];
    for (var i = 0; i < this.hidden_nodes.length; i++) {
      if (i == 0) {
        hidden_layers_output[i] = Matrix.multiply(this.weights[i],input);
      }else{
        hidden_layers_output[i] = Matrix.multiply(this.weights[i],hidden_layers_output[i-1]);
      }
      hidden_layers_output[i].add(this.biases[i]);
      hidden_layers_output[i].map(sigmoid);
    }
    let output = Matrix.multiply(this.weights[this.weights.length-1],hidden_layers_output[this.hidden_nodes.length-1]);
    output.add(this.biases[this.biases.length-1]);
    output.map(sigmoid);

    target = Matrix.fromArray(target);
    let error = [];
    let gradient = [];
    let weights_deltas = [];
    let hidden_layers_output_t = [];
    for (var i = 0; i < hidden_layers_output.length; i++) {
      hidden_layers_output_t[i] = Matrix.transpose(hidden_layers_output[i]);
    }

    error[this.weights.length-1] = Matrix.subtract(target,output);
    gradient[this.weights.length-1] = Matrix.map(sigmoid_dash,output);
    gradient[this.weights.length-1].multiply(error[this.weights.length-1]);
    gradient[this.weights.length-1].multiply(this.lr);
    weights_deltas[this.weights.length-1] = Matrix.multiply(gradient[this.weights.length-1],hidden_layers_output_t[hidden_layers_output_t.length-1])

    this.weights[this.weights.length-1].add(weights_deltas[this.weights.length-1]);
    this.biases[this.weights.length-1].add(gradient[this.weights.length-1]);


    for (var i = 1; i < this.weights.length; i++) {
      let index = this.weights.length-1-i;
      error[index] = Matrix.multiply(Matrix.transpose(this.weights[index+1]),error[index+1]);
      gradient[index] = Matrix.map(sigmoid_dash,hidden_layers_output[index]);
      gradient[index].multiply(error[index]);
      gradient[index].multiply(this.lr);
      if (index == 0) {
        weights_deltas[index] = Matrix.multiply(gradient[index],Matrix.transpose(input));
      }else {
        weights_deltas[index] = Matrix.multiply(gradient[index],hidden_layers_output_t[index]);
      }
      this.weights[index].add(weights_deltas[index]);
      this.biases[index].add(gradient[index]);
    }
  }

  copy(){
    return new NeuralNetwork(this);
  }
  mutate(rate){
    function mutate(val){
      if (Math.random() < rate) {
        return val + Math.random() - 0.5;
      }else {
        return val;
      }
    }

    for (var i = 0; i < this.weights.length; i++) {
      this.weights[i].map(mutate);
      this.biases[i].map(mutate);
    }
  }
  static load(object){
    let shape = [];
    shape[0] = object.input_nodes;
    for (var i = 0; i < object.hidden_nodes.length; i++) {
      shape[i+1] = object.hidden_nodes[i]
    }
    shape.push(object.output_nodes)
    let brain = new NeuralNetwork(shape);
    for (var i = 0; i < object.biases.length; i++) {
      brain.biases[i] = Matrix.load(object.biases[i]);
    }
    for (var i = 0; i < object.weights.length; i++) {
      brain.weights[i] = Matrix.load(object.weights[i]);
    }
    return brain;
  }
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function sigmoid_dash(x){
  return x*(1-x);
}
