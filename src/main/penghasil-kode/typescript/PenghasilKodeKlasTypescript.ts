import { Klas } from '../../../umum/entitas/Klas'
import { PenghasilKodeAtributKlasTypescript } from './PenghasilKodeAtributKlasTypescript'

export class PenghasilKodeKlasTypescript {
  constructor(private klas: Klas) {}

  private hasilkanKodePembukaKlas(): string {
    return `export class ${this.klas.nama} {\n`
  }

  private hasilkanKodePenutupKlas(): string {
    return `}\n`
  }

  public hasilkanKode(): string {
    let hasilKode = ''
    hasilKode += this.hasilkanKodePembukaKlas()
    this.klas.koleksiAtribut.forEach((atribut) => {
      const penghasilKodeAtribut = new PenghasilKodeAtributKlasTypescript({ atribut })
      hasilKode += penghasilKodeAtribut.hasilkanKode()
    })
    hasilKode += this.hasilkanKodePenutupKlas()
    return hasilKode
  }
}
