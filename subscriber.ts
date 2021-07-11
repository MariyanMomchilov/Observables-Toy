export class Subscriber<T> {
  protected completed;

  constructor() {
    this.completed = false;
  }

  next(x: T) {

  }

  error(err: any) {
    if (this.completed)
      return;

    throw err
  }

  complete() {
    this.completed = true;
  }
}
