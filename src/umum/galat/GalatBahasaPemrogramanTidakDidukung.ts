import { BahasaPemrograman } from '../tipe/BahasaPemrograman'
import { Framework } from '../tipe/Framework'

export class GalatBahasaPemrogramanTidakDidukung extends Error {
  constructor(
    public framework: Framework,
    public bahasaPemrograman: BahasaPemrograman
  ) {
    super(
      `Framework '${framework.toString()}' tidak mendukung bahasa '${bahasaPemrograman.toString()}'`
    )
  }
}
