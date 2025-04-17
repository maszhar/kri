export enum BahasaPemrograman {
  TIDAK_DIATUR = 0,
  TYPESCRIPT = 1
}

export function bahasaPemrogramanToString(target: BahasaPemrograman): string {
  switch (target) {
    case BahasaPemrograman.TIDAK_DIATUR:
      return 'Tidak diatur'
    case BahasaPemrograman.TYPESCRIPT:
      return 'Typescript'
  }
}
