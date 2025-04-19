<script lang="ts">
  import type { IsiProyek } from '../../../../../../umum/entitas/IsiProyek'
  import type { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import type { OperasiLangsung } from '../../../entitas/OperasiLangsung.svelte'
  import { JenisMenuPanelKiri } from '../JenisMenuPanelKiri'
  import ItemPanelKiri from './ItemPanelKiri.svelte'

  interface Properti {
    level: number
    operasi: OperasiLangsung
    idAktif: number
    pilih: (id: number) => void
    bukaMenu: (posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref: IsiProyek) => void
    idPrefix: number
    buka: () => void
  }
  const { level, operasi, idAktif, pilih, bukaMenu, idPrefix, buka }: Properti = $props()

  const id = parseInt(`${idPrefix}${operasi.dapatkanId()}`)
</script>

<ItemPanelKiri
  {level}
  label={operasi.dapatkanNamaLangsung()}
  {idAktif}
  {pilih}
  bukaMenu={(posisiKlik: Koordinat): void =>
    bukaMenu(posisiKlik, JenisMenuPanelKiri.OPERASI, operasi)}
  {id}
  punyaChildren={false}
  buka={(): void => buka()}
>
  {#snippet ikon()}
    <div class="font-bold text-green-400">M</div>
  {/snippet}
</ItemPanelKiri>
