import { GalatNamaSama } from '../galat/GalatNamaSama'
import { KelasPb } from '../proto/kri'
import { TipeElemen } from '../tipe/TipeElemen'
import { Asosiasi } from './Asosiasi'
import { Atribut, ParameterBuatAtribut } from './Atribut'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
import { Metode, ParameterBuatMetode } from './Metode'

export class Kelas extends IsiProyek {
  protected koleksiAtribut: Atribut[]
  protected koleksiMetode: Metode[]
  protected koleksiAsosiasi: Asosiasi[]

  constructor(parameter: ParameterBuatKelas = {}) {
    super({
      ...parameter,
      nama: parameter.nama || 'KelasBaru'
    })
    this.koleksiAtribut = parameter.koleksiAtribut ?? []
    this.koleksiMetode = parameter.koleksiMetode ?? []
    this.koleksiAsosiasi = parameter.koleksiAsosiasi ?? []
  }

  protected validasiNamaAnggota(nama: string, elemenLama?: Atribut | Metode): void {
    const koleksiAtributTersaring =
      elemenLama && elemenLama instanceof Atribut
        ? this.koleksiAtribut.filter((atribut) => atribut !== elemenLama)
        : this.koleksiAtribut
    const atributBernamaSama = koleksiAtributTersaring.find(
      (atribut) => atribut.dapatkanNama() == nama
    )
    if (atributBernamaSama) {
      throw new GalatNamaSama(nama, TipeElemen.ATRIBUT)
    }

    const koleksiMetodeTersaring =
      elemenLama && elemenLama instanceof Metode
        ? this.koleksiMetode.filter((metode) => metode !== elemenLama)
        : this.koleksiMetode
    const metodeBernamaSama = koleksiMetodeTersaring.find(
      (metode) => metode.dapatkanNama() === nama
    )
    if (metodeBernamaSama) {
      throw new GalatNamaSama(nama, TipeElemen.OPERASI)
    }
  }

  private dapatkanIdAtributTerbesar(): number {
    let idTerbesar = 0
    if (this.koleksiAtribut.length > 0) {
      idTerbesar = Math.max(...this.koleksiAtribut.map((atribut) => atribut.dapatkanId()))
    }
    return idTerbesar
  }

  private hasilkanNamaAtribut(): string {
    const frasa = 'atribut'

    let indeksNamaBaruTerakhir = 0
    for (const atribut of this.koleksiAtribut) {
      if (new RegExp('^' + frasa).test(atribut.dapatkanNama())) {
        const indeksNama = parseInt(atribut.dapatkanNama().slice(frasa.length))
        if (!isNaN(indeksNama)) {
          indeksNamaBaruTerakhir = indeksNama
        }
      }
    }

    return `${frasa}${indeksNamaBaruTerakhir + 1}`
  }

  buatAtribut(parameter: ParameterBuatAtribut = {}, objekLama?: Atribut): Atribut {
    if (parameter.nama === undefined) {
      parameter.nama = this.hasilkanNamaAtribut()
    }
    this.validasiNamaAnggota(parameter.nama)

    const atribut =
      objekLama ??
      new Atribut(parameter, (namaBaru, elemenLama) =>
        this.validasiNamaAnggota(namaBaru, elemenLama)
      )

    const idTerbesar = this.dapatkanIdAtributTerbesar()
    atribut.aturId(idTerbesar + 1)

    atribut.aturNama(parameter.nama)

    this.koleksiAtribut.push(atribut)
    return atribut
  }

  private hasilkanNamaMetode(): string {
    const frasa = 'atribut'

    let indeksNamaBaruTerakhir = 0
    for (const atribut of this.koleksiAtribut) {
      if (new RegExp('^' + frasa).test(atribut.dapatkanNama())) {
        const indeksNama = parseInt(atribut.dapatkanNama().slice(frasa.length))
        if (!isNaN(indeksNama)) {
          indeksNamaBaruTerakhir = indeksNama
        }
      }
    }

    return `${frasa}${indeksNamaBaruTerakhir + 1}`
  }

  buatMetode(parameter: ParameterBuatMetode = {}, objekLama?: Metode): Metode {
    if (parameter.nama === undefined) {
      parameter.nama = this.hasilkanNamaAtribut()
    }
    this.validasiNamaAnggota(parameter.nama)

    const metode =
      objekLama ??
      new Metode(parameter, (namaBaru, elemenLama) =>
        this.validasiNamaAnggota(namaBaru, elemenLama)
      )

    const idTerbesar = this.dapatkanIdAtributTerbesar()
    metode.aturId(idTerbesar + 1)

    metode.aturNama(parameter.nama)

    this.koleksiMetode.push(metode)
    return metode
  }

  tambahAsosiasi(tujuan: Kelas): Asosiasi {
    const asosiasiBaru = new Asosiasi({
      asal: this,
      tujuan: tujuan
    })
    this.koleksiAsosiasi.push(asosiasiBaru)

    if (tujuan !== this) {
      tujuan.tambahAsosiasiTerkait(asosiasiBaru)
    }

    return asosiasiBaru
  }

  tambahAsosiasiTerkait(asosiasi: Asosiasi): void {
    this.koleksiAsosiasi.push(asosiasi)
  }

  aturKoleksiAtribut(koleksiAtribut: Atribut[]): void {
    this.koleksiAtribut = koleksiAtribut
  }

  serialisasi(): any {
    return {
      id: this.id,
      nama: this.nama,
      koleksiAtribut: this.koleksiAtribut.map((atribut) => atribut.serialisasi())
    }
  }

  static override deserialisasi(
    data: any,
    objekLama?: Kelas,
    pengonversiAtribut?: (data: any) => Atribut
  ): Kelas {
    const kelas = objekLama ?? new Kelas()
    super.deserialisasi(data, kelas)

    const koleksiAtribut = data.koleksiAtribut.map((dataAtribut) =>
      pengonversiAtribut
        ? pengonversiAtribut(dataAtribut)
        : Atribut.deserialisasi(dataAtribut, undefined, (nama, atribut) =>
            kelas.validasiNamaAnggota(nama, atribut)
          )
    )
    kelas.aturKoleksiAtribut(koleksiAtribut)

    return kelas
  }

  keProto(): KelasPb {
    return {
      id: this.id,
      nama: this.nama,
      koleksiAtribut: this.koleksiAtribut.map((atribut) => atribut.keProto())
    }
  }

  static dariProto(proto: KelasPb): Kelas {
    const kelas = new Kelas({
      id: proto.id,
      nama: proto.nama
    })

    const koleksiAtribut = proto.koleksiAtribut.map((protoAtribut) =>
      Atribut.dariProto(protoAtribut, (nama, atribut) => kelas.validasiNamaAnggota(nama, atribut))
    )
    kelas.aturKoleksiAtribut(koleksiAtribut)

    return kelas
  }

  bungkusUntukAi(): any {
    /**
     * Daftar Kunci :
     * i = id
     * n = nama
     */
    return {
      i: this.id,
      n: this.nama
    }
  }
}

export interface ParameterBuatKelas extends ParameterBuatIsiProyek {
  koleksiAtribut?: Atribut[]
  koleksiAsosiasi?: Asosiasi[]
  koleksiMetode?: Metode[]
}
