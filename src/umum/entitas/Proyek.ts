import { ProyekPb } from '../proto/kri'
import { Klas } from './Klas'
import { SequenceDiagram } from './SequenceDiagram'

export class Proyek {
  koleksiKlas: Klas[]
  koleksiSequenceDiagram: SequenceDiagram[]

  constructor(parameter: ParameterBuatProyek = {}) {
    // klas
    this.koleksiKlas = parameter.koleksiKlas || []

    // sequence diagram
    this.koleksiSequenceDiagram = parameter.koleksiSequenceDiagram || []
  }

  tambahKlasBaru(): Klas {
    const klas = new Klas()
    this.koleksiKlas.push(klas)
    return klas
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
    return new Proyek({
      koleksiSequenceDiagram: proto.koleksiSequenceDiagram.map((protoSequenceDiagram) =>
        SequenceDiagram.dariProto(protoSequenceDiagram)
      )
    })
  }
}

interface ParameterBuatProyek {
  koleksiKlas?: Klas[]
  koleksiSequenceDiagram?: SequenceDiagram[]
}
