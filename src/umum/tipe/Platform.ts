import { PlatformPb } from '../proto/kri'

export enum Platform {
  TIDAK_DIATUR = 0,
  CROSS_PLATFORM_DESKTOP = 1,
  NODE_JS = 2
}

export function platformToString(target: Platform): string {
  switch (target) {
    case Platform.TIDAK_DIATUR:
      return 'Tidak diatur'
    case Platform.CROSS_PLATFORM_DESKTOP:
      return 'Cross Platform Desktop'
    case Platform.NODE_JS:
      return 'Node.js'
  }
}

/**
 * Mengkonversi dari Platform (enum lokal) ke PlatformPb (protobuf)
 */
export function platformKeProto(platform: Platform): PlatformPb {
  switch (platform) {
    case Platform.TIDAK_DIATUR:
      return PlatformPb.TIDAK_DIATUR
    case Platform.CROSS_PLATFORM_DESKTOP:
      return PlatformPb.CROSS_PLATFORM_DESKTOP
    case Platform.NODE_JS:
      return PlatformPb.NODE_JS
    default:
      return PlatformPb.TIDAK_DIATUR
  }
}

/**
 * Mengkonversi dari PlatformPb (protobuf) ke Platform (enum lokal)
 */
export function platformDariProto(pb: PlatformPb): Platform {
  switch (pb) {
    case PlatformPb.TIDAK_DIATUR:
      return Platform.TIDAK_DIATUR
    case PlatformPb.CROSS_PLATFORM_DESKTOP:
      return Platform.CROSS_PLATFORM_DESKTOP
    case PlatformPb.NODE_JS:
      return Platform.NODE_JS
    default:
      return Platform.TIDAK_DIATUR
  }
}
