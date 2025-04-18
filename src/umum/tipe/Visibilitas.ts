export enum Visibilitas {
  TIDAK_DIATUR = 0,
  PUBLIC = 1,
  PROTECTED = 2,
  PRIVATE = 3,
  PACKAGE = 4
}

export function visibilitasKeSimbol(visibilitas: Visibilitas): string {
  switch (visibilitas) {
    case Visibilitas.TIDAK_DIATUR:
      return ''
    case Visibilitas.PUBLIC:
      return '+'
    case Visibilitas.PROTECTED:
      return '#'
    case Visibilitas.PRIVATE:
      return '-'
    case Visibilitas.PACKAGE:
      return '~'
  }
}
