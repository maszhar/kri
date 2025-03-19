import { Klas } from '../../../umum/entitas/Klas'

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
    hasilKode += this.hasilkanKodePenutupKlas()
    return hasilKode
  }
}
