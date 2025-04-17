export enum Framework {
  TIDAK_DIATUR = 0,
  ELECTRON = 1
}

export function frameworkToString(target: Framework): string {
  switch (target) {
    case Framework.TIDAK_DIATUR:
      return 'Tidak diatur'
    case Framework.ELECTRON:
      return 'Electron'
  }
}
