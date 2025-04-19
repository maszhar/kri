import { Metode, type ParameterBuatMetode } from '../../../../umum/entitas/Metode'

export class MetodeLangsung extends Metode {
  private namaLangsung = $state('')
  private teksLangsung = $state('')

  constructor(
    parameter: ParameterBuatMetode,
    validasiNamaBaru: (nama: string, metode: Metode) => void
  ) {
    super(parameter, validasiNamaBaru)

    this.namaLangsung = this.nama
    this.teksLangsung = this.toString()
  }

  dapatkanNamaLangsung(): string {
    return this.namaLangsung
  }

  toStringLangsung(): string {
    return this.teksLangsung
  }
}
