import { AxiosResponse } from 'axios'

export type GeneratorT<T> = Generator<
  Promise<AxiosResponse<T>>,
  void,
  AxiosResponse<T>
>
