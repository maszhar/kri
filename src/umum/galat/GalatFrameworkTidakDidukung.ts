import { Framework } from '../tipe/Framework'
import { Platform } from '../tipe/Platform'

export class GalatFrameworkTidakDidukung extends Error {
  constructor(
    public platform: Platform,
    public framework: Framework
  ) {
    super(`Platform '${platform.toString()}' tidak mendukung framework '${framework.toString()}'`)
  }
}
