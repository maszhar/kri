import { GalatBahasaPemrogramanTidakDidukung } from '../galat/GalatBahasaPemrogramanTidakDidukung'
import { GalatFrameworkTidakDidukung } from '../galat/GalatFrameworkTidakDidukung'
import { GalatNamaSama } from '../galat/GalatNamaSama'
import { GalatPlatformTidakDidukung } from '../galat/GalatPlatformTidakDidukung'
import { SistemPb } from '../proto/kri'
import {
  BahasaPemrograman,
  bahasaPemrogramanDariProto,
  bahasaPemrogramanKeProto
} from '../tipe/BahasaPemrograman'
import { Framework, frameworkDariProto, frameworkKeProto } from '../tipe/Framework'
import { Platform, platformDariProto, platformKeProto } from '../tipe/Platform'
import { TargetSistem, targetSistemDariProto, targetSistemKeProto } from '../tipe/TargetSistem'
import { TipeElemen } from '../tipe/TipeElemen'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
import { Kelas, ParameterBuatKelas } from './Kelas'
import {
  dukunganBahasaPemrograman,
  dukunganFramework,
  dukunganPlatform
} from './PetaDukunganSistem'

export class Sistem extends IsiProyek {
  protected targetSistem: TargetSistem = TargetSistem.TIDAK_DIATUR
  protected platform: Platform = Platform.TIDAK_DIATUR
  protected framework: Framework = Framework.TIDAK_DIATUR
  protected bahasaPemrograman: BahasaPemrograman = BahasaPemrograman.TIDAK_DIATUR

  protected koleksiKelas: Kelas[]
  protected koleksiSubsistem: Sistem[]

  constructor(parameter: ParameterBuatSistem = {}) {
    super({
      ...parameter,
      nama: parameter.nama ?? 'Sistem baru'
    })

    this.targetSistem = parameter.target ?? TargetSistem.TIDAK_DIATUR
    this.platform = parameter.platform ?? Platform.TIDAK_DIATUR
    this.framework = parameter.framework ?? Framework.TIDAK_DIATUR
    this.bahasaPemrograman = parameter.bahasaPemrograman ?? BahasaPemrograman.TIDAK_DIATUR

    this.koleksiKelas = parameter.koleksiKelas ?? []
    this.koleksiSubsistem = parameter.koleksiSubsistem ?? []
  }

  dapatkanTarget(): TargetSistem {
    return this.targetSistem
  }

  aturTargetSistem(target: TargetSistem): void {
    this.targetSistem = target
    this.platform = dukunganPlatform[this.targetSistem][0]
    this.framework = dukunganFramework[this.platform][0]
    this.bahasaPemrograman = dukunganBahasaPemrograman[this.framework][0]
  }

  dapatkanPlatform(): Platform {
    return this.platform
  }

  aturPlatform(platform: Platform): void {
    if (!dukunganPlatform[this.targetSistem].includes(platform)) {
      throw new GalatPlatformTidakDidukung(this.targetSistem, platform)
    }

    this.platform = platform
    this.framework = dukunganFramework[this.platform][0]
    this.bahasaPemrograman = dukunganBahasaPemrograman[this.framework][0]
  }

  dapatkanFramework(): Framework {
    return this.framework
  }

  aturFramework(framework: Framework): void {
    if (!dukunganFramework[this.platform].includes(framework)) {
      throw new GalatFrameworkTidakDidukung(this.platform, framework)
    }

    this.framework = framework
    this.bahasaPemrograman = dukunganBahasaPemrograman[this.framework][0]
  }

  dapatkanBahasaPemrograman(): BahasaPemrograman {
    return this.bahasaPemrograman
  }

  aturBahasaPemrograman(bahasa: BahasaPemrograman): void {
    if (!dukunganBahasaPemrograman[this.framework].includes(bahasa)) {
      throw new GalatBahasaPemrogramanTidakDidukung(this.framework, bahasa)
    }

    this.bahasaPemrograman = bahasa
  }

  private validasiNamaKelas(nama: string): void {
    const kelasBernamaSama = this.koleksiKelas.find((kelas) => kelas.dapatkanNama() === nama)
    if (kelasBernamaSama) {
      throw new GalatNamaSama(nama, TipeElemen.KELAS)
    }
  }

  private hasilkanNamaKelas(): string {
    const frasa = 'KelasBaru'

    let indeksNamaBaruTerakhir = 0
    for (const kelas of this.koleksiKelas) {
      if (new RegExp('^' + frasa).test(kelas.dapatkanNama())) {
        const indeksNama = parseInt(kelas.dapatkanNama().slice(frasa.length))
        if (!isNaN(indeksNama)) {
          indeksNamaBaruTerakhir = indeksNama
        }
      }
    }

    return `${frasa}${indeksNamaBaruTerakhir + 1}`
  }

  buatKelas(parameter: ParameterBuatKelas = {}, objekLama?: Kelas): Kelas {
    if (parameter.nama === undefined) {
      parameter.nama = this.hasilkanNamaKelas()
    }
    this.validasiNamaKelas(parameter.nama)

    let idTertinggi = 0
    if (this.koleksiKelas.length > 0) {
      idTertinggi = Math.max(...this.koleksiKelas.map((kelas) => kelas.dapatkanId()))
    }

    const kelasBaru = objekLama ?? new Kelas(parameter)
    if (objekLama) {
      kelasBaru.aturNama(parameter.nama)
    }
    kelasBaru.aturId(idTertinggi + 1)

    this.koleksiKelas.push(kelasBaru)
    return kelasBaru
  }

  dapatkanKoleksiSubsistem(): Sistem[] {
    return this.koleksiSubsistem
  }

  buatSubsistem(parameter: ParameterBuatSistem = {}, objekLama?: Sistem): Sistem {
    let idSubsistemTerbesar = 0
    if (this.koleksiSubsistem.length > 0) {
      idSubsistemTerbesar = Math.max(...this.koleksiSubsistem.map((subsistem) => subsistem.id))
    }

    const subsistem = objekLama ?? new Sistem(parameter)
    subsistem.aturId(idSubsistemTerbesar + 1)
    this.koleksiSubsistem.push(subsistem)
    return subsistem
  }

  serialisasi(): any {
    return {
      id: this.id,
      nama: this.nama,
      targetSistem: this.targetSistem,
      platform: this.platform,
      framework: this.framework,
      bahasaPemrograman: this.bahasaPemrograman,
      koleksiSubsistem: this.koleksiSubsistem.map((subsistem) => subsistem.serialisasi())
    }
  }

  static deserialisasi(data: any): Sistem {
    return new Sistem({
      id: data.id,
      nama: data.nama,
      target: data.targetSistem as TargetSistem,
      platform: data.platform as Platform,
      framework: data.framework as Framework,
      bahasaPemrograman: data.bahasaPemrograman as BahasaPemrograman,
      koleksiSubsistem: data.koleksiSubsistem.map((dataSubsistem) =>
        Sistem.deserialisasi(dataSubsistem)
      )
    })
  }

  keProto(): SistemPb {
    return {
      id: this.id,
      nama: this.nama,
      targetSistem: targetSistemKeProto(this.targetSistem),
      platform: platformKeProto(this.platform),
      framework: frameworkKeProto(this.framework),
      bahasaPemrograman: bahasaPemrogramanKeProto(this.bahasaPemrograman),
      koleksiSubsistem: this.koleksiSubsistem.map((subsistem) => subsistem.keProto())
    }
  }

  static dariProto(proto: SistemPb): Sistem {
    return new Sistem({
      id: proto.id,
      nama: proto.nama,
      target: targetSistemDariProto(proto.targetSistem),
      platform: platformDariProto(proto.platform),
      framework: frameworkDariProto(proto.framework),
      bahasaPemrograman: bahasaPemrogramanDariProto(proto.bahasaPemrograman),
      koleksiSubsistem: proto.koleksiSubsistem.map((protoSubsistem) =>
        Sistem.dariProto(protoSubsistem)
      )
    })
  }
}
export interface ParameterBuatSistem extends ParameterBuatIsiProyek {
  target?: TargetSistem
  platform?: Platform
  framework?: Framework
  bahasaPemrograman?: BahasaPemrograman
  koleksiKelas?: Kelas[]
  koleksiSubsistem?: Sistem[]
}
