function Singleton<T>() {
  abstract class Sing {
    protected static _instance: T
    protected static getInstance(): T {
      return this._instance
    }
  }

  return Sing
}

export default Singleton
