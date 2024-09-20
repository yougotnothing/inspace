import { action, makeObservable, observable } from 'mobx';

class TestStore {
  count: number = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
    });
  }

  increment() {
    this.count++;
  }
}

export const store = new TestStore();
