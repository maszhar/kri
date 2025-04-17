export class IsiProyek {
  id: number
  nama: string

  constructor(parameter: ParameterBuatIsiProyek = {}) {
    this.id = parameter.id ?? 0
    this.nama = parameter.nama ?? 'Isi proyek baru'
  }
}
export interface ParameterBuatIsiProyek {
  id?: number
  nama?: string
}
