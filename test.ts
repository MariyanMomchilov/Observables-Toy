import { Observable } from "./observable";
import { Observer } from "./observer";

const observableAsync = new Observable<string>(subscriber => {
  const interval = setInterval(() => subscriber.next('Hi'), 2000);
  return () => clearInterval(interval);
});

const subAsync = observableAsync.subscribe(new Observer<string>(x => console.log(x)));
setTimeout(() => subAsync(), 7000);


const observableSync = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  // wont send
  subscriber.next(4);
  // also wont trigger error on complete
  subscriber.error(new Error('Wont throw'));

  return () => undefined;
});

observableSync.subscribe(new Observer(x => console.log(x)));

const mappedObservable = new Observable<number>(subscriber => {
  const arr = [10, 20, 30, 40, 50];
  arr.forEach(value => subscriber.next(value));
  return () => undefined;
}).map(value => value / 10)
  .map(value => value + value);

mappedObservable.subscribe(new Observer(console.log));
const isDegreeOf2 = (value: number) => {
  if (value === 1) return true;
  
  let divisor = 2;
  while(value > 1) {
    value /= divisor;
    divisor *= 2; 
  }
  return value === 1;
}
const filteredObservable = mappedObservable.filter(isDegreeOf2);
filteredObservable.subscribe(new Observer(console.log));

const tappedObservable = mappedObservable.tap(x => console.log(`x = ${x}`));
tappedObservable.subscribe(new Observer(console.log));