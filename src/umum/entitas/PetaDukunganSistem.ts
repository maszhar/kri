import { BahasaPemrograman } from '../tipe/BahasaPemrograman'
import { Framework } from '../tipe/Framework'
import { Platform } from '../tipe/Platform'
import { TargetSistem } from '../tipe/TargetSistem'

export const dukunganPlatform = {
  [TargetSistem.TIDAK_DIATUR]: [Platform.TIDAK_DIATUR],
  [TargetSistem.SERVER]: [Platform.NODE_JS],
  [TargetSistem.DESKTOP]: [Platform.CROSS_PLATFORM_DESKTOP]
}

export const dukunganFramework = {
  [Platform.TIDAK_DIATUR]: [Framework.TIDAK_DIATUR],
  [Platform.CROSS_PLATFORM_DESKTOP]: [Framework.ELECTRON],
  [Platform.NODE_JS]: [Framework.TIDAK_DIATUR]
}

export const dukunganBahasaPemrograman = {
  [Framework.TIDAK_DIATUR]: [BahasaPemrograman.TIDAK_DIATUR, BahasaPemrograman.TYPESCRIPT],
  [Framework.ELECTRON]: [BahasaPemrograman.TYPESCRIPT]
}
