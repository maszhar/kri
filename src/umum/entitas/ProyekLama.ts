import { ProyekPb } from '../proto/kri'
import { CeritaPengguna } from './CeritaPengguna'
import { DiagramKasusGuna } from './DiagramKasusGuna'
import { DiagramKlas } from './DiagramKlas'
import { Kelas } from './Kelas'
import { SequenceDiagram } from './SequenceDiagram'

export class ProyekLama {
  // === ATRIBUT ===
  koleksiCeritaPengguna: CeritaPengguna[]
  koleksiKlas: Kelas[]
  koleksiSequenceDiagram: SequenceDiagram[]
  koleksiDiagramKlas: DiagramKlas[]
  protected koleksiDiagramKasusGuna: DiagramKasusGuna[]

  // === KONSTRUKTOR ===
  constructor(parameter: ParameterBuatProyek = {}) {
    this.koleksiCeritaPengguna = parameter.koleksiCeritaPengguna ?? []
    this.koleksiKlas = parameter.koleksiKlas ?? []
    this.koleksiDiagramKasusGuna = parameter.koleksiDiagramKasusGuna ?? []
    this.koleksiDiagramKlas = parameter.koleksiDiagramKlas ?? []
    this.koleksiSequenceDiagram = parameter.koleksiSequenceDiagram ?? []
  }

  // === OPERASI ===
  // klas
  hapusKlas(klas: Kelas): void {
    const indeksKlasTerkait = this.koleksiKlas.findIndex((itemKlas: Kelas) => itemKlas === klas)
    if (indeksKlasTerkait > -1) {
      this.koleksiKlas.splice(indeksKlasTerkait, 1)
    }
  }

  // diagram urutan
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

  static bongkarBungkusanData(data: any): ProyekLama {
    const koleksiKlas = data.koleksiKlas.map((dataKlas) => Kelas.bongkarBungkusanData(dataKlas))
    return new ProyekLama({
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

  static dariProto(proto: ProyekPb): ProyekLama {
    const koleksiKlas = proto.koleksiKlas.map((protoKlas) => Kelas.dariProto(protoKlas))

    return new ProyekLama({
      koleksiKlas: koleksiKlas,
      koleksiSequenceDiagram: proto.koleksiSequenceDiagram.map((protoSequenceDiagram) =>
        SequenceDiagram.dariProto(protoSequenceDiagram, koleksiKlas)
      )
    })
  }

  bungkusUntukAi(): any {
    /**
     * Daftar Kunci :
     * dk = koleksi diagram klas
     */
    return {
      dk: this.koleksiDiagramKlas.map((diagramKlas) => diagramKlas.bungkusUntukAi())
    }
  }

  buatKlonaSequenceDiagram(indeks: number): void {
    this.koleksiSequenceDiagram[indeks] = this.koleksiSequenceDiagram[indeks].buatKlona()
  }
}

export interface ParameterBuatProyek {
  koleksiCeritaPengguna?: CeritaPengguna[]
  koleksiKlas?: Kelas[]
  koleksiSequenceDiagram?: SequenceDiagram[]
  koleksiDiagramKlas?: DiagramKlas[]
  koleksiDiagramKasusGuna?: DiagramKasusGuna[]
}
