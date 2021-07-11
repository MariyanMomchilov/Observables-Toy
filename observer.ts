import { CompleteMethod, ErrorMethod, NextMethod } from "./types";
import { Subscriber } from "./subscriber";

export class Observer<T> extends Subscriber<T> {
  private nextCb?: NextMethod<T>;
  private errorCb?: ErrorMethod<T>;
  private completeCb?: CompleteMethod<T>;

  constructor(next?: NextMethod<T>, error?: ErrorMethod<T>, complete?: CompleteMethod<T>) {
    super();
    this.nextCb = next;
    this.errorCb = error;
    this.completeCb = complete;
  }

  next(x: T) {
    if (!this.completed) {
      if (this.nextCb) {
        this.nextCb(x);
      }
      else {
        super.next(x);
      }
    }
  }

  error(err: any) {
    if (this.errorCb) {
      this.errorCb(err);
    }
    else {
      super.error(err);
    }
  }

  complete() {
    if (this.completeCb) {
      this.completeCb();
    }
    else {
      super.complete();
    }
  }

}