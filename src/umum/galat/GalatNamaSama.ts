import type { TipeElemen } from '../tipe/TipeElemen'

export class GalatNamaSama extends Error {
  constructor(
    public nama: string,
    public tipe: TipeElemen
  ) {
    super(`nama klas '${nama}' telah digunakan`)
  }
}
