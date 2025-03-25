import { ProyekPb } from '../proto/kri'
import { DiagramKlas } from './DiagramKlas'
import { Klas } from './Klas'
import { SequenceDiagram } from './SequenceDiagram'
import { GalatNamaSama } from '../galat/GalatNamaSama'
import { TipeElemen } from '../tipe/TipeElemen'

export class Proyek {
  koleksiKlas: Klas[]
  koleksiSequenceDiagram: SequenceDiagram[]
  koleksiDiagramKlas: DiagramKlas[]

  constructor(parameter: ParameterBuatProyek = {}) {
    // klas
    this.koleksiKlas = parameter.koleksiKlas ?? []

    // diagram klas
    this.koleksiDiagramKlas = parameter.koleksiDiagramKlas ?? []

    // sequence diagram
    this.koleksiSequenceDiagram = parameter.koleksiSequenceDiagram ?? []
  }

  // klas
  tambahKlasBaru(): Klas {
    let nomorKlasBaru = 1
    const frasaKlasBaru = 'KlasBaru'
    this.koleksiKlas.forEach((klas) => {
      if (new RegExp('^' + frasaKlasBaru).test(klas.nama)) {
        const nomorKlasBaruSekarang = parseInt(klas.nama.slice(frasaKlasBaru.length))
        if (!isNaN(nomorKlasBaruSekarang)) {
          nomorKlasBaru = nomorKlasBaruSekarang + 1
        }
      }
    })
    const klas = new Klas({ nama: frasaKlasBaru + nomorKlasBaru.toString() })
    this.koleksiKlas.push(klas)
    return klas
  }

  ubahNamaKlas(klas: Klas, nama: string): void {
    const klasSelainTerkait = this.koleksiKlas.filter((itemKlas) => itemKlas != klas)
    if (this.koleksiKlas.length - 1 == klasSelainTerkait.length) {
      const namaSama = klasSelainTerkait.find((itemKlas) => itemKlas.nama == nama)
      if (!namaSama) {
        klas.nama = nama
      } else {
        throw new GalatNamaSama(nama, TipeElemen.Klas)
      }
    }
  }

  hapusKlas(klas: Klas): void {
    const indeksKlasTerkait = this.koleksiKlas.findIndex((itemKlas: Klas) => itemKlas === klas)
    if (indeksKlasTerkait > -1) {
      this.koleksiKlas.splice(indeksKlasTerkait, 1)
    }
  }

  // diagram urutan
  tambahDiagramKlasBaru(): DiagramKlas {
    const diagramKlas = new DiagramKlas()
    this.koleksiDiagramKlas.push(diagramKlas)
    return diagramKlas
  }

  tambahSequenceDiagramBaru(): SequenceDiagram {
    const sequenceDiagram = new SequenceDiagram()
    this.koleksiSequenceDiagram.push(sequenceDiagram)
    return sequenceDiagram
  }

  private beriIdUntukSeluruhKlas(): void {
    for (let i = 0; i < this.koleksiKlas.length; i++) {
      this.koleksiKlas[i].id = i + 1
    }
  }

  bungkusData(): unknown {
    this.beriIdUntukSeluruhKlas()

    return {
      koleksiKlas: this.koleksiKlas.map((klas) => klas.bungkusData()),
      koleksiSequenceDiagram: this.koleksiSequenceDiagram.map((sequenceDiagram): unknown =>
        sequenceDiagram.bungkusData()
      )
    }
  }

  static bongkarBungkusanData(data: any): Proyek {
    const koleksiKlas = data.koleksiKlas.map((dataKlas) => Klas.bongkarBungkusanData(dataKlas))
    return new Proyek({
      koleksiKlas: koleksiKlas,
      koleksiSequenceDiagram: data.koleksiSequenceDiagram.map(
        (dataSequenceDiagram: any): SequenceDiagram =>
          SequenceDiagram.bongkarBungkusanData(dataSequenceDiagram, koleksiKlas)
      )
    })
  }

  keProto(): ProyekPb {
    this.beriIdUntukSeluruhKlas()

    return {
      koleksiKlas: this.koleksiKlas.map((klas) => klas.keProto()),
      koleksiSequenceDiagram: this.koleksiSequenceDiagram.map((sequenceDiagram) =>
        sequenceDiagram.keProto()
      )
    }
  }

  static dariProto(proto: ProyekPb): Proyek {
    const koleksiKlas = proto.koleksiKlas.map((protoKlas) => Klas.dariProto(protoKlas))

    return new Proyek({
      koleksiKlas: koleksiKlas,
      koleksiSequenceDiagram: proto.koleksiSequenceDiagram.map((protoSequenceDiagram) =>
        SequenceDiagram.dariProto(protoSequenceDiagram, koleksiKlas)
      )
    })
  }

  buatKlonaSequenceDiagram(indeks: number): void {
    this.koleksiSequenceDiagram[indeks] = this.koleksiSequenceDiagram[indeks].buatKlona()
  }
}

interface ParameterBuatProyek {
  koleksiKlas?: Klas[]
  koleksiSequenceDiagram?: SequenceDiagram[]
  koleksiDiagramKlas?: DiagramKlas[]
}
