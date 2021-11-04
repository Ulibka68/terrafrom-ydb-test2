function first() {
  console.log('first(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('first(): called');
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('second(): called', propertyKey);
  };
}

class ExampleClass {
  @first()
  @second()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  method() {
    console.log(this.prop);
  }
  constructor(public prop: string) {}
}

const a = new ExampleClass('AA');
console.log('----- A');
a.method();
console.log('----- B');
const b = new ExampleClass('BB');
b.method();

// eslint-disable-next-line @typescript-eslint/ban-types
function sealed(constructor: Function) {
  console.log(constructor);
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

/*@sealed
class BugReport {
  type = 'report';
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}*/

// BugReport.prototype.a = '5';

function reportableClassDecorator<T extends { new (...args: any[]): any }>(
  constructor: T
) {
  return class extends constructor {
    reportingURL = 'http://www...';
  };
}

@reportableClassDecorator
class BugReport {
  type = 'report';
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

const bug = new BugReport('Needs dark mode');
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"

// Note that the decorator _does not_ change the TypeScript type
// and so the new property `reportingURL` is not known
// to the type system:
// bug.reportingURL;
// Property 'reportingURL' does not exist on type 'BugReport'.
