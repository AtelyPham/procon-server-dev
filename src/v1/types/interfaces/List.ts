type Entities<T> = {
  [key: string]: T
}

interface List<T> {
  _ids: string[]
  _entities: Entities<T>
  get ids(): string[]
  get entities(): Entities<T>
}

export default List
export { Entities }
