import { SequenceDiagram } from '../../sequence/entitas/SequenceDiagram'

export class Proyek {
  koleksiSequenceDiagram: SequenceDiagram[] = []

  tambahSequenceDiagramBaru(): SequenceDiagram {
    const sequenceDiagram = new SequenceDiagram()
    this.koleksiSequenceDiagram.push(sequenceDiagram)
    return sequenceDiagram
  }
}
