class Matrix {
constructor(rows,cols) {
  this.rows = rows;
  this.cols = cols;
  this.data = [];
  for (let i = 0; i < this.rows; i++) {
    this.data[i] = [];
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] = 0.2;
    }
  }
}
static fromArray(arr){
  let m = new Matrix(arr.length,1);
  for (var i = 0; i < arr.length; i++) {
    m.data[i][0] = arr[i];
  }
  return m;
}
transpose(){
  let result = new Matrix(this.cols,this.rows);
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      result.data[j][i] = this.data[i][j];
    }
  }
  this.cols,this.rows = result.cols,result.rows;
  this.data = result.data;
}
static transpose(m){
  let result = new Matrix(m.cols,m.rows);
  for (let i = 0; i < m.rows; i++) {
    for (let j = 0; j < m.cols; j++) {
      result.data[j][i] = m.data[i][j];
    }
  }
  return result;
}
static subtract(m,n){
  let a = m.data;
  let b = n.data;
  let output = new Matrix(m.rows,m.cols);
  for (let i = 0; i < m.rows; i++) {
    for (let j = 0; j < m.cols; j++) {
      output.data[i][j] = a[i][j]-b[i][j];
    }
  }
  return output;
}
static multiply(m,n){
  if (m.cols !== n.rows) {
    return undefined;
  }
  let a = m.data;
  let b = n.data;
  let result = new Matrix(m.rows,n.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols;j++) {
      let sum = 0;
      for (var k = 0; k < m.cols; k++) {
        sum += a[i][k] * b[k][j];
      }
      result.data[i][j] = sum;
    }
  }
  return result;
}
multiply(n){
  if (n instanceof Matrix) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] *= n.data[i][j];
      }
    }
  }else{
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] *= n;
      }
    }
  }
}
map(fn){
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      let val = this.data[i][j];
      this.data[i][j] = fn(val);
    }
  }
}
static map(fn,m){
  let output = new Matrix(m.rows,m.cols);
  for (let i = 0; i < m.rows; i++) {
    for (let j = 0; j < m.cols; j++) {
      let val = m.data[i][j];
      output.data[i][j] = fn(val);
    }
  }
  return output;
}
print(){
  console.table(this.data);
}
add(n){
  if (n instanceof Matrix) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += n.data[i][j];
      }
    }
  }else {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += n;
      }
    }
  }
}

randomize(){
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      let val = Math.random()*2 - 1;
      this.data[i][j] = val;
    }
  }
}
copy(){
  let m = new Matrix(this.rows,this.cols);
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      m.data[i][j] = this.data[i][j];
    }
  }
  return m;
}
static load(object){
  let m = new Matrix(object.rows,object.cols);
  for (var i = 0; i < object.rows; i++) {
    for (var j = 0; j < object.cols; j++) {
      m.data[i][j] = object.data[i][j];
    }
  }
  return m;
}
}
