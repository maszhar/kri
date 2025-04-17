<script lang="ts">
  import type { IsiProyek } from '../../../../../../umum/entitas/IsiProyek'
  import type { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import type { SistemLangsung } from '../../../entitas/SistemLangsung.svelte'
  import { JenisMenuPanelKiri } from '../JenisMenuPanelKiri'
  import ItemPanelKiri from './ItemPanelKiri.svelte'

  interface Properti {
    level: number
    sistem: SistemLangsung
    idAktif: number
    pilih: (id: number) => void
    bukaMenu: (posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref: IsiProyek) => void
    idPrefix: number
  }
  const { level, sistem, idAktif, pilih, bukaMenu, idPrefix }: Properti = $props()

  const id = parseInt(`${idPrefix}${sistem.dapatkanId()}`)
</script>

<ItemPanelKiri
  {level}
  label={sistem.dapatkanNamaLangsung()}
  {idAktif}
  {pilih}
  bukaMenu={(posisiKlik: Koordinat): void =>
    bukaMenu(posisiKlik, JenisMenuPanelKiri.SISTEM, sistem)}
  {id}
/>
