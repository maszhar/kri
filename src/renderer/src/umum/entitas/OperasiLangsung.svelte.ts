import { Operasi, type ParameterBuatOperasi } from '../../../../umum/entitas/Operasi'

export class OperasiLangsung extends Operasi {
  private namaLangsung = $state('')
  private teksLangsung = $state('')

  constructor(
    parameter: ParameterBuatOperasi,
    validasiNamaBaru: (nama: string, operasi: Operasi) => void
  ) {
    super(parameter, validasiNamaBaru)

    this.namaLangsung = this.nama
    this.teksLangsung = this.toString()
  }

  dapatkanNamaLangsung(): string {
    return this.namaLangsung
  }

  override aturNama(nama: string): void {
    super.aturNama(nama)
    this.namaLangsung = nama
    this.teksLangsung = this.toString()
  }

  override aturDariTeks(teks: string): void {
    super.aturDariTeks(teks)
    this.namaLangsung = this.nama
    this.teksLangsung = this.toString()
  }

  toStringLangsung(): string {
    return this.teksLangsung
  }
}
