import { Observer } from "./observer";
import { FilterFn, MapFn, SubscribeCallback } from "./types";

export class Observable<T> {
  private push: SubscribeCallback<T>;

  constructor(push: SubscribeCallback<T>) {
    this.push = push;
  }

  subscribe(observer: Observer<T>) {
    const unsubscribe = this.push(observer);
    return () => {
      observer.complete();
      unsubscribe();
    }
  }

  map(mapFn: MapFn<T>): Observable<T> {
    return new Observable(subscriber => {
      return this.push(new Observer(
        (x) => subscriber.next(mapFn(x)),
        subscriber.error,
        subscriber.complete,
      ));
    });
  }

  filter(filterFn: FilterFn<T>): Observable<T> {
    return new Observable(subscriber => {
      return this.push(new Observer(
        (x) => filterFn(x) ? subscriber.next(x) : null,
        subscriber.error,
        subscriber.complete,
      ));
    });
  }
}