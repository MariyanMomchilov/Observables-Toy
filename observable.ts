import { Observer } from "./observer";
import { SubscribeCallback } from "./types";

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
}