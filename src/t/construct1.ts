interface SobakaConstruiren {
  new (hour: number, minute: number): FuncInterface1;
}
interface FuncInterface1 {
  method1(): void;
}

function createClock(
  ctor: SobakaConstruiren,
  hour: number,
  minute: number
): FuncInterface1 {
  return new ctor(hour, minute);
}

class Sobaka implements FuncInterface1 {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(h: number, m: number) {}
  method1() {
    console.log('beep beep');
  }
}
const analog = createClock(Sobaka, 7, 32);
