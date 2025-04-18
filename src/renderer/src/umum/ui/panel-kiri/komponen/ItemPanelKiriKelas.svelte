<script lang="ts">
  import type { IsiProyek } from '../../../../../../umum/entitas/IsiProyek'
  import type { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import type { KelasLangsung } from '../../../entitas/KelasLangsung.svelte'
  import IkonKelas from '../../ikon/IkonKelas.svelte'
  import { JenisMenuPanelKiri } from '../JenisMenuPanelKiri'
  import ItemPanelKiri from './ItemPanelKiri.svelte'

  interface Properti {
    level: number
    kelas: KelasLangsung
    idAktif: number
    pilih: (id: number) => void
    bukaMenu: (posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref: IsiProyek) => void
    idPrefix: number
    bukaIsiProyek: (isiProyek: IsiProyek) => void
    isiProyekAktif: IsiProyek
  }
  const {
    level,
    kelas,
    idAktif,
    pilih,
    bukaMenu,
    idPrefix,
    bukaIsiProyek,
    isiProyekAktif
  }: Properti = $props()

  const id = parseInt(`${idPrefix}${kelas.dapatkanId()}`)
</script>

<ItemPanelKiri
  {level}
  label={kelas.dapatkanNamaLangsung()}
  {idAktif}
  {pilih}
  bukaMenu={(posisiKlik: Koordinat): void => bukaMenu(posisiKlik, JenisMenuPanelKiri.KELAS, kelas)}
  {id}
  punyaChildren={false}
  buka={(): void => bukaIsiProyek(kelas)}
  aktif={isiProyekAktif === kelas}
>
  {#snippet ikon()}
    <IkonKelas class="w-full h-full fill-transparent stroke-black" />
  {/snippet}
</ItemPanelKiri>
