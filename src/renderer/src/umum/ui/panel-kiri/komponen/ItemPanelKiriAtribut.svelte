<script lang="ts">
  import type { IsiProyek } from '../../../../../../umum/entitas/IsiProyek'
  import type { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import type { AtributLangsung } from '../../../entitas/AtributLangsung.svelte'
  import { JenisMenuPanelKiri } from '../JenisMenuPanelKiri'
  import ItemPanelKiri from './ItemPanelKiri.svelte'

  interface Properti {
    level: number
    atribut: AtributLangsung
    idAktif: number
    pilih: (id: number) => void
    bukaMenu: (posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref: IsiProyek) => void
    idPrefix: number
    buka: () => void
  }
  const { level, atribut, idAktif, pilih, bukaMenu, idPrefix, buka }: Properti = $props()

  const id = parseInt(`${idPrefix}${atribut.dapatkanId()}`)
</script>

<ItemPanelKiri
  {level}
  label={atribut.dapatkanNamaLangsung()}
  {idAktif}
  {pilih}
  bukaMenu={(posisiKlik: Koordinat): void =>
    bukaMenu(posisiKlik, JenisMenuPanelKiri.KELAS, atribut)}
  {id}
  punyaChildren={false}
  buka={(): void => buka()}
>
  {#snippet ikon()}
    <div class="font-bold text-red-400">A</div>
  {/snippet}
</ItemPanelKiri>
