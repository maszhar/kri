export enum TargetSistem {
  TIDAK_DIATUR = 0,
  DESKTOP = 1,
  SERVER = 2
}

export function targetSistemToString(target: TargetSistem): string {
  switch (target) {
    case TargetSistem.TIDAK_DIATUR:
      return 'Tidak diatur'
    case TargetSistem.DESKTOP:
      return 'Desktop'
    case TargetSistem.SERVER:
      return 'Server'
  }
}
