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

  aturNama(nama: string): void {
    this.nama = nama
  }

  serialisasi(): any {
    return {
      id: this.id,
      nama: this.nama
    }
  }

  static deserialisasi(data: any, objekLama?: IsiProyek): IsiProyek {
    const isiProyek = objekLama ?? new IsiProyek()
    isiProyek.aturId(data.id)
    isiProyek.aturNama(data.nama)
    return isiProyek
  }
}
export interface ParameterBuatIsiProyek {
  id?: number
  nama?: string
}
