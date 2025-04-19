import { Atribut, type ParameterBuatAtribut } from '../../../../umum/entitas/Atribut'
import type { RentangMultiplisitas } from '../../../../umum/entitas/RentangMultiplisitas'
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

  override aturDiwariskan(diwariskan: boolean): void {
    super.aturDiwariskan(diwariskan)
    this.stringLangsung = super.toString()
  }

  override aturBawaan(bawaan?: string): void {
    super.aturBawaan(bawaan)
    this.stringLangsung = super.toString()
  }

  override aturRentangMultiplisitasDiatur(diatur: boolean): void {
    super.aturRentangMultiplisitasDiatur(diatur)
    this.stringLangsung = super.toString()
  }

  override aturRentangMultiplisitas(rentangMultiplisitas: RentangMultiplisitas): void {
    super.aturRentangMultiplisitas(rentangMultiplisitas)
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
