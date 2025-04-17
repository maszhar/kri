export class IsiProyek {
  protected id: number
  protected nama: string

  constructor(parameter: ParameterBuatIsiProyek = {}) {
    this.id = parameter.id ?? 0
    this.nama = parameter.nama ?? 'Isi proyek baru'
  }

  dapatkanId(): number {
    return this.id
  }

  aturId(id: number): void {
    this.id = id
  }

  dapatkanNama(): string {
    return this.nama
  }
}
export interface ParameterBuatIsiProyek {
  id?: number
  nama?: string
}
