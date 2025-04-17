import { Sistem, type ParameterBuatSistem } from '../../../../umum/entitas/Sistem'

export class SistemLangsung extends Sistem {
  private namaLangsung = $state('')

  constructor(parameter: ParameterBuatSistem) {
    super(parameter)

    this.namaLangsung = this.nama
  }

  dapatkanNamaLangsung(): string {
    return this.namaLangsung
  }
}
