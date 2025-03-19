import { Klas } from '../../../umum/entitas/Klas'
import { Proyek } from '../../../umum/entitas/Proyek'
import { PenghasilKodeKlasTypescript } from './PenghasilKodeKlasTypescript'
import { writeFile } from 'fs/promises'
import * as path from 'path'

export class PenghasilKodeTypescript {
  private async simpanKodeKlas(
    folderHasilKode: string,
    klas: Klas,
    hasilKode: string
  ): Promise<void> {
    await writeFile(path.resolve(folderHasilKode, `${klas.nama}.ts`), hasilKode)
  }

  public async hasilkanKode(parameter: ParameterHasilkanKode): Promise<void> {
    for (const klas of parameter.proyek.koleksiKlas) {
      const penghasilKodeKlas = new PenghasilKodeKlasTypescript(klas)
      const hasilKode = penghasilKodeKlas.hasilkanKode()
      await this.simpanKodeKlas(parameter.folderHasilKode, klas, hasilKode)
    }
  }
}

export interface ParameterHasilkanKode {
  proyek: Proyek
  folderHasilKode: string
}
