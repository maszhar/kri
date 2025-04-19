<script lang="ts">
  import type { IsiProyek } from '../../../../../../umum/entitas/IsiProyek'
  import type { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import type { DiagramKelasLangsung } from '../../../entitas/DiagramKelasLangsung.svelte'
  import IkonKelas from '../../ikon/IkonKelas.svelte'
  import { JenisMenuPanelKiri } from '../JenisMenuPanelKiri'
  import ItemPanelKiri from './ItemPanelKiri.svelte'

  interface Properti {
    level: number
    diagramKelas: DiagramKelasLangsung
    idAktif: number
    pilih: (id: number) => void
    bukaMenu: (posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref: IsiProyek) => void
    idPrefix: number
    bukaDiagramKelas: (diagramKelas: DiagramKelasLangsung) => void
    isiProyekAktif: IsiProyek
  }
  const {
    level,
    diagramKelas,
    idAktif,
    pilih,
    bukaMenu,
    idPrefix,
    bukaDiagramKelas,
    isiProyekAktif
  }: Properti = $props()

  const id = parseInt(`${idPrefix}${diagramKelas.dapatkanId()}`)
</script>

<ItemPanelKiri
  {level}
  label={diagramKelas.dapatkanNamaLangsung()}
  {idAktif}
  {pilih}
  bukaMenu={(posisiKlik: Koordinat): void =>
    bukaMenu(posisiKlik, JenisMenuPanelKiri.KELAS, diagramKelas)}
  {id}
  punyaChildren={false}
  buka={(): void => bukaDiagramKelas(diagramKelas)}
  aktif={isiProyekAktif === diagramKelas}
>
  {#snippet ikon()}
    <IkonKelas class="w-full h-full fill-white stroke-black" />
  {/snippet}
</ItemPanelKiri>
