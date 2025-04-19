import { Atribut, type ParameterBuatAtribut } from '../../../../umum/entitas/Atribut'
import type { Visibilitas } from '../../../../umum/tipe/Visibilitas'

export class AtributLangsung extends Atribut {
  private stringLangsung = $state('')
  private namaLangsung = $state('')

  constructor(
    parameter: ParameterBuatAtribut,
    validasiNamaBaru: (nama: string, atribut: Atribut) => void
  ) {
    super(parameter, validasiNamaBaru)

    this.namaLangsung = this.nama
    this.stringLangsung = super.toString()
  }

  dapatkanNamaLangsung(): string {
    return this.namaLangsung
  }

  toStringLangsung(): string {
    return this.stringLangsung
  }

  override aturVisibilitas(visibilitas: Visibilitas): void {
    super.aturVisibilitas(visibilitas)
    this.stringLangsung = super.toString()
  }

  aturDariTeks(teks: string): void {
    super.aturDariTeks(teks)
    this.stringLangsung = super.toString()
    this.namaLangsung = this.nama
  }

  override aturNama(nama: string): void {
    super.aturNama(nama)
    this.namaLangsung = nama
    this.stringLangsung = super.toString()
  }
}
