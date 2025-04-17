import { GalatBahasaPemrogramanTidakDidukung } from '../galat/GalatBahasaPemrogramanTidakDidukung'
import { GalatFrameworkTidakDidukung } from '../galat/GalatFrameworkTidakDidukung'
import { GalatPlatformTidakDidukung } from '../galat/GalatPlatformTidakDidukung'
import { BahasaPemrograman } from '../tipe/BahasaPemrograman'
import { Framework } from '../tipe/Framework'
import { Platform } from '../tipe/Platform'
import { TargetSistem } from '../tipe/TargetSistem'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
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
  protected koleksiSubsistem: Sistem[]

  constructor(parameter: ParameterBuatSistem = {}) {
    super({
      nama: parameter.nama ?? 'Sistem baru'
    })

    this.targetSistem = parameter.target ?? TargetSistem.TIDAK_DIATUR
    this.platform = parameter.platform ?? Platform.TIDAK_DIATUR
    this.framework = parameter.framework ?? Framework.TIDAK_DIATUR
    this.bahasaPemrograman = parameter.bahasaPemrograman ?? BahasaPemrograman.TIDAK_DIATUR

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
}
export interface ParameterBuatSistem extends ParameterBuatIsiProyek {
  target?: TargetSistem
  platform?: Platform
  framework?: Framework
  bahasaPemrograman?: BahasaPemrograman
  koleksiSubsistem?: Sistem[]
}
