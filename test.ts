import { Observable } from "./observable";
import { Observer } from "./observer";

const observerAsync = new Observable<string>(subscriber => {
  const interval = setInterval(() => subscriber.next('Hi'), 2000);
  return () => clearInterval(interval);
});

const subAsync = observerAsync.subscribe(new Observer<string>(x => console.log(x)));
setTimeout(() => subAsync(), 7000);


const observerSync = new Observable<number>(subscriber => {
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


const subSync = observerSync.subscribe(new Observer(x => console.log(x)));
