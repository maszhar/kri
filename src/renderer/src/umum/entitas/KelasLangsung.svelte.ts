import type { Atribut, ParameterBuatAtribut } from '../../../../umum/entitas/Atribut'
import { Kelas, type ParameterBuatKelas } from '../../../../umum/entitas/Kelas'
import type { ParameterBuatMetode, Metode } from '../../../../umum/entitas/Metode'
import { AtributLangsung } from './AtributLangsung.svelte'
import { MetodeLangsung } from './MetodeLangsung.svelte'

export class KelasLangsung extends Kelas {
  private namaLangsung = $state('')
  private koleksiAtributLangsung: AtributLangsung[] = $state([])
  private koleksiMetodeLangsung: MetodeLangsung[] = $state([])

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

  override aturKoleksiAtribut(koleksiAtribut: Atribut[]): void {
    super.aturKoleksiAtribut(koleksiAtribut)
    this.koleksiAtributLangsung = this.koleksiAtribut as AtributLangsung[]
  }

  dapatkanKoleksiMetodeLangsung(): MetodeLangsung[] {
    return this.koleksiMetodeLangsung
  }

  override buatMetode(parameter: ParameterBuatMetode = {}): Metode {
    const metodeBaru = new MetodeLangsung(parameter, (namaBaru, elemenLama) =>
      this.validasiNamaAnggota(namaBaru, elemenLama)
    )
    super.buatMetode(parameter, metodeBaru)
    this.koleksiMetodeLangsung.push(metodeBaru)
    return metodeBaru
  }

  static override deserialisasi(data: any): KelasLangsung {
    const kelasLangsung = new KelasLangsung({})
    const pengonversiAtribut = (dataAtribut: any): AtributLangsung => {
      return AtributLangsung.deserialisasi(dataAtribut, undefined, (nama, atribut) =>
        kelasLangsung.validasiNamaAnggota(nama, atribut)
      )
    }
    super.deserialisasi(data, kelasLangsung, pengonversiAtribut)
    return kelasLangsung
  }
}
