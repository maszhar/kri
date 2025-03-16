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

  bungkusData(): unknown {
    return {
      koleksiSequenceDiagram: this.koleksiSequenceDiagram.map((sequenceDiagram): unknown =>
        sequenceDiagram.bungkusData()
      )
    }
  }

  static bongkarDataTerbungkus(data: any): Proyek {
    return new Proyek({
      koleksiSequenceDiagram: data.koleksiSequenceDiagram.map(
        (dataSequenceDiagram: any): SequenceDiagram =>
          SequenceDiagram.bongkarDataTerbungkus(dataSequenceDiagram)
      )
    })
  }

  keProto(): ProyekPb {
    return {
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
