import { Atribut, type ParameterBuatAtribut } from '../../../../umum/entitas/Atribut'

export class AtributLangsung extends Atribut {
  private stringLangsung = $state('')
  private namaLangsung = $state('')

  constructor(parameter: ParameterBuatAtribut) {
    super(parameter)

    this.namaLangsung = this.nama
    this.stringLangsung = super.toString()
  }

  dapatkanNamaLangsung(): string {
    return this.namaLangsung
  }

  toStringLangsung(): string {
    return this.stringLangsung
  }

  override aturNama(nama: string): void {
    super.aturNama(nama)
    this.namaLangsung = nama
    this.stringLangsung = super.toString()
  }
}
