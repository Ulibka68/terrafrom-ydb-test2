interface ClassConstruct {
  new (): any;
}

// class Sobaka implements FuncInterface1 {
class Sobaka {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  method1() {
    console.log('beep beep');
  }
}

function zuzuzu(ctor: ClassConstruct) {
  // return new ctor();
  const obj = new ctor(); // HERE
  obj.method1();
}

zuzuzu(Sobaka);
