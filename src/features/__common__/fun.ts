export type Ok<T> = { kind: 'ok', value: T };

export type Err = { kind: 'err', error: Error };

export type Result<T> = Ok<T> | Err;

export function mapResult<T, U>(result: Result<T>, f: (value: T) => U): Result<U> {
  if (result.kind == 'ok') {
    return { kind: 'ok', value: f(result.value) };
  } else {
    return result;
  }
}

export function flatMapResult<T, U>(result: Result<T>, f: (value: T) => Result<U>): Result<U> {
  if (result.kind == 'ok') {
    return f(result.value);
  } else {
    return result;
  }
}

export class AsyncResult<T> {
  constructor(private promise: Promise<Result<T>>) {}

  map<U>(f: (value: T) => U): AsyncResult<U> {
    const newPromise = this.promise.then(result => {
      if (result.kind === 'ok') {
        return { kind: result.kind, value: f(result.value) };
      } else {
        return result;
      }
    });
    return new AsyncResult(newPromise);
  }

  flatMap<U>(f: (value: T) => Promise<Result<U>>): AsyncResult<U> {
    const newPromise = this.promise.then(result => {
      if (result.kind === 'ok') {
        return f(result.value);
      } else {
        return Promise.resolve(result);
      }
    });
    return new AsyncResult(newPromise);
  }

  unwrap(): Promise<Result<T>> {
    return this.promise;
  }
}