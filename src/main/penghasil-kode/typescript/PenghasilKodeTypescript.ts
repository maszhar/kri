import { Kelas } from '../../../umum/entitas/Kelas'
import { ProyekLama } from '../../../umum/entitas/ProyekLama'
import { PenghasilKodeKlasTypescript } from './PenghasilKodeKlasTypescript'
import { writeFile } from 'fs/promises'
import * as path from 'path'

export class PenghasilKodeTypescript {
  private async simpanKodeKlas(
    folderHasilKode: string,
    klas: Kelas,
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
  proyek: ProyekLama
  folderHasilKode: string
}
