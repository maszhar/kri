import { ArahParameter } from '../tipe/ArahParameter'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
import { RentangMultiplisitas } from './RentangMultiplisitas'

export class ParameterMetode extends IsiProyek {
  protected arahDiatur: boolean
  protected arah: ArahParameter
  protected tipe?: string
  protected rentangMultiplisitasDiatur: boolean
  protected rentangMultiplisitas: RentangMultiplisitas
  protected bawaan?: string

  protected selaluTulisKeunikan: boolean
  protected unik: boolean
  protected tuliskanKeterurutan: boolean
  protected terurut: boolean
  protected urutan: boolean

  constructor(parameter: ParameterBuatParameterMetode) {
    super({
      ...parameter,
      nama: parameter.nama ?? 'parameterBaru'
    })
    this.arahDiatur = parameter.arahDiatur ?? false
    this.arah = parameter.arah ?? ArahParameter.MASUK
    this.tipe = parameter.tipe
    this.rentangMultiplisitasDiatur = parameter.rentangMultiplisitasDiatur ?? false
    this.rentangMultiplisitas = parameter.rentangMultiplisitas ?? new RentangMultiplisitas()
    this.bawaan = parameter.bawaan
    this.selaluTulisKeunikan = parameter.selaluTulisKeunikan ?? false
    this.unik = parameter.unik ?? false
    this.tuliskanKeterurutan = parameter.tuliskanKeterurutan ?? false
    this.terurut = parameter.terurut ?? false
    this.urutan = parameter.urutan ?? false
  }

  serialisasi(): any {
    return {
      arahDiatur: this.arahDiatur,
      arah: this.arah,
      tipe: this.tipe,
      rentangMultiplisitasDiatur: this.rentangMultiplisitasDiatur,
      rentangMultiplisitas: this.rentangMultiplisitas.serialisasi(),
      bawaan: this.bawaan,
      selaluTulisKeunikan: this.selaluTulisKeunikan,
      unik: this.unik,
      tuliskanKeterurutan: this.tuliskanKeterurutan,
      terurut: this.terurut,
      urutan: this.urutan
    }
  }

  static deserialisasi(data: any): ParameterMetode {
    return new ParameterMetode({
      arahDiatur: data.arahDiatur,
      arah: data.arah,
      tipe: data.tipe,
      rentangMultiplisitasDiatur: data.rentangMultiplisitasDiatur,
      rentangMultiplisitas: RentangMultiplisitas.deserialisasi(data.rentangMultiplisitas),
      bawaan: data.bawaan,
      selaluTulisKeunikan: data.selaluTulisKeunikan,
      unik: data.unik,
      tuliskanKeterurutan: data.tuliskanKeterurutan,
      terurut: data.terurut,
      urutan: data.urutan
    })
  }
}

export interface ParameterBuatParameterMetode extends ParameterBuatIsiProyek {
  arahDiatur?: boolean
  arah?: ArahParameter
  tipe?: string
  rentangMultiplisitasDiatur?: boolean
  rentangMultiplisitas?: RentangMultiplisitas
  bawaan?: string
  selaluTulisKeunikan?: boolean
  unik?: boolean
  tuliskanKeterurutan?: boolean
  terurut?: boolean
  urutan?: boolean
}
