import type { Atribut, ParameterBuatAtribut } from '../../../../umum/entitas/Atribut'
import { Kelas, type ParameterBuatKelas } from '../../../../umum/entitas/Kelas'
import type { ParameterBuatOperasi, Operasi } from '../../../../umum/entitas/Operasi'
import { AtributLangsung } from './AtributLangsung.svelte'
import { OperasiLangsung } from './OperasiLangsung.svelte'

export class KelasLangsung extends Kelas {
  private namaLangsung = $state('')
  private koleksiAtributLangsung: AtributLangsung[] = $state([])
  private koleksiOperasiLangsung: OperasiLangsung[] = $state([])

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

  dapatkanKoleksiOperasiLangsung(): OperasiLangsung[] {
    return this.koleksiOperasiLangsung
  }

  override buatOperasi(parameter: ParameterBuatOperasi = {}): Operasi {
    const operasiBaru = new OperasiLangsung(parameter, (namaBaru, elemenLama) =>
      this.validasiNamaAnggota(namaBaru, elemenLama)
    )
    super.buatOperasi(parameter, operasiBaru)
    this.koleksiOperasiLangsung.push(operasiBaru)
    return operasiBaru
  }

  override aturKoleksiOperasi(koleksiOperasi: Operasi[]): void {
    super.aturKoleksiOperasi(koleksiOperasi)
    this.koleksiOperasiLangsung = this.koleksiOperasi as OperasiLangsung[]
  }

  static override deserialisasi(data: any): KelasLangsung {
    const kelasLangsung = new KelasLangsung({})
    const pengonversiAtribut = (dataAtribut: any): AtributLangsung => {
      return AtributLangsung.deserialisasi(dataAtribut, undefined, (nama, atribut) =>
        kelasLangsung.validasiNamaAnggota(nama, atribut)
      )
    }
    const pengonversiOperasi = (dataAtribut: any): OperasiLangsung => {
      return OperasiLangsung.deserialisasi(dataAtribut, undefined, (nama, atribut) =>
        kelasLangsung.validasiNamaAnggota(nama, atribut)
      )
    }
    super.deserialisasi(data, kelasLangsung, pengonversiAtribut, pengonversiOperasi)
    return kelasLangsung
  }
}
