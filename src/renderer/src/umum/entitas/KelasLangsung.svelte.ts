import type { ParameterBuatAtribut } from '../../../../umum/entitas/Atribut'
import { Kelas, type ParameterBuatKelas } from '../../../../umum/entitas/Kelas'
import { AtributLangsung } from './AtributLangsung.svelte'

export class KelasLangsung extends Kelas {
  private namaLangsung = $state('')
  private koleksiAtributLangsung: AtributLangsung[] = $state([])

  constructor(parameter: ParameterBuatKelas) {
    super(parameter)

    this.namaLangsung = this.nama
    this.koleksiAtributLangsung = this.koleksiAtribut as AtributLangsung[]
  }

  dapatkanNamaLangsung(): string {
    return this.namaLangsung
  }

  override aturNama(nama: string): void {
    super.aturNama(nama)
    this.namaLangsung = nama
  }

  dapatkanKoleksiAtributLangsung(): AtributLangsung[] {
    return this.koleksiAtributLangsung
  }

  override buatAtribut(parameter: ParameterBuatAtribut = {}): AtributLangsung {
    const atributBaru = new AtributLangsung(parameter, (namaBaru, elemenLama) =>
      this.validasiNamaAnggota(namaBaru, elemenLama)
    )
    super.buatAtribut(parameter, atributBaru)
    this.koleksiAtributLangsung.push(atributBaru)
    return atributBaru
  }

  static deserialisasi(data: any): KelasLangsung {
    return new KelasLangsung({
      id: data.id,
      nama: data.nama
    })
  }
}
