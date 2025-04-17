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
