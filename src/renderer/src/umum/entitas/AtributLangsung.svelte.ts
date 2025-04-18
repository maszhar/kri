import { Atribut, type ParameterBuatAtribut } from '../../../../umum/entitas/Atribut'

export class AtributLangsung extends Atribut {
  private stringLangsung = $state('')

  constructor(parameter: ParameterBuatAtribut) {
    super(parameter)

    this.stringLangsung = super.toString()
  }

  toStringLangsung(): string {
    return this.stringLangsung
  }

  override aturNama(nama: string): void {
    super.aturNama(nama)
    this.stringLangsung = super.toString()
  }
}
