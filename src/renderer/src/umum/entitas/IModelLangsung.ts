import { type Readable } from 'svelte/store'

export interface IModelLangsung {
  dapatkanNamaLangsung(): Readable<string>
  aturNama(nama: string): void
}
