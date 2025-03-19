import { Proyek } from '../../umum/entitas/Proyek'

export class PenghasilKode {
  hasilkanKodeTypescript(parameter: ParameterHasilkanKodeTypescript): void {
    console.log(parameter.folderHasilKode)
  }
}

interface ParameterHasilkanKodeTypescript {
  proyek: Proyek
  folderHasilKode: string
}
