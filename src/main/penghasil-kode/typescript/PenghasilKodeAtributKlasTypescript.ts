import { Atribut } from '../../../umum/entitas/Atribut'

export class PenghasilKodeAtributKlasTypescript {
  private atribut: Atribut

  constructor(parameter: ParameterBuatPenghasilKodeAtributKlasTypescript) {
    this.atribut = parameter.atribut
  }

  hasilkanKode(): string {
    let hasilKode = ''
    // indentasi
    hasilKode += '  '
    // atribut
    hasilKode += `private ${this.atribut.nama}: any`
    // baris baru
    hasilKode += '\n'
    return hasilKode
  }
}

interface ParameterBuatPenghasilKodeAtributKlasTypescript {
  atribut: Atribut
}
