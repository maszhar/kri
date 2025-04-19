<script lang="ts">
  import type { IsiProyek } from '../../../../../../umum/entitas/IsiProyek'
  import type { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import { DiagramKelasLangsung } from '../../../entitas/DiagramKelasLangsung.svelte'
  import { KelasLangsung } from '../../../entitas/KelasLangsung.svelte'
  import type { SistemLangsung } from '../../../entitas/SistemLangsung.svelte'
  import IkonKelas from '../../ikon/IkonKelas.svelte'
  import IkonSistem from '../../ikon/IkonSistem.svelte'
  import { JenisMenuPanelKiri } from '../JenisMenuPanelKiri'
  import ItemPanelKiri from './ItemPanelKiri.svelte'
  import ItemPanelKiriDiagramKelas from './ItemPanelKiriDiagramKelas.svelte'
  import ItemPanelKiriKelas from './ItemPanelKiriKelas.svelte'
  import ItemPanelKiriSistem from './ItemPanelKiriSistem.svelte'

  interface Properti {
    level: number
    sistem: SistemLangsung
    idAktif: number
    pilih: (id: number) => void
    bukaMenu: (posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref: IsiProyek) => void
    idPrefix: number
    bukaIsiProyek: (isiProyek: IsiProyek, sistem: SistemLangsung | null) => void
    isiProyekAktif: IsiProyek
  }
  const {
    level,
    sistem,
    idAktif,
    pilih,
    bukaMenu,
    idPrefix,
    bukaIsiProyek,
    isiProyekAktif
  }: Properti = $props()

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
  punyaChildren={sistem.dapatkanKoleksiDiagramKelasLangsung().length > 0 ||
    sistem.dapatkanKoleksiSubsistemLangsung().length > 0 ||
    sistem.dapatkanKoleksiKelasLangsung().length > 0}
  buka={(): void => bukaIsiProyek(sistem, null)}
  aktif={isiProyekAktif === sistem}
>
  {#snippet ikon()}
    <IkonSistem class="w-full h-full" />
  {/snippet}

  {#snippet itemChildren(level: number)}
    <!-- Diagram Kelas (2) -->
    {#if sistem.dapatkanKoleksiDiagramKelasLangsung().length > 0}
      <ItemPanelKiri
        id={parseInt(`${id}2`)}
        {level}
        label="Diagram Kelas"
        {idAktif}
        {pilih}
        bukaMenu={(posisiKlik: Koordinat): void =>
          bukaMenu(posisiKlik, JenisMenuPanelKiri.JUDUL_DIAGRAM_KELAS, sistem)}
        punyaChildren={true}
      >
        {#snippet ikon()}
          <IkonKelas class="w-full h-full fill-white stroke-black" />
        {/snippet}
        {#snippet itemChildren(levelDalam: number)}
          {#each sistem.dapatkanKoleksiDiagramKelasLangsung() as diagramKelas, _i (diagramKelas.dapatkanId())}
            <ItemPanelKiriDiagramKelas
              {bukaMenu}
              {idAktif}
              level={levelDalam}
              idPrefix={parseInt(`${id}2`)}
              {diagramKelas}
              {pilih}
              bukaDiagramKelas={(diagramKelas: DiagramKelasLangsung): void =>
                bukaIsiProyek(diagramKelas, sistem)}
              {isiProyekAktif}
            />
          {/each}
        {/snippet}
      </ItemPanelKiri>
    {/if}

    <!-- Kelas (1) -->
    {#if sistem.dapatkanKoleksiKelasLangsung().length > 0}
      <ItemPanelKiri
        id={parseInt(`${id}1`)}
        {level}
        label="Kelas"
        {idAktif}
        {pilih}
        bukaMenu={(posisiKlik: Koordinat): void =>
          bukaMenu(posisiKlik, JenisMenuPanelKiri.JUDUL_KELAS, sistem)}
        punyaChildren={true}
      >
        {#snippet ikon()}
          <div class="font-bold text-blue-500">C</div>
        {/snippet}
        {#snippet itemChildren(levelDalam: number)}
          {#each sistem.dapatkanKoleksiKelasLangsung() as kelas, _i (kelas.dapatkanId())}
            <ItemPanelKiriKelas
              {bukaMenu}
              {idAktif}
              level={levelDalam}
              idPrefix={parseInt(`${id}1`)}
              {kelas}
              {pilih}
              bukaKelas={(kelas: KelasLangsung): void => bukaIsiProyek(kelas, sistem)}
              {isiProyekAktif}
            />
          {/each}
        {/snippet}
      </ItemPanelKiri>
    {/if}

    <!-- Subsistem (0) -->
    {#if sistem.dapatkanKoleksiSubsistemLangsung().length > 0}
      <ItemPanelKiri
        id={parseInt(`${id}0`)}
        {level}
        label="Subsistem"
        {idAktif}
        {pilih}
        bukaMenu={(posisiKlik: Koordinat): void =>
          bukaMenu(posisiKlik, JenisMenuPanelKiri.JUDUL_SISTEM, sistem)}
        punyaChildren={true}
      >
        {#snippet ikon()}
          <IkonSistem class="w-full h-full" />
        {/snippet}
        {#snippet itemChildren(levelDalam: number)}
          {#each sistem.dapatkanKoleksiSubsistemLangsung() as subsistem, _i (subsistem.dapatkanId())}
            <ItemPanelKiriSistem
              {bukaMenu}
              {idAktif}
              level={levelDalam}
              idPrefix={parseInt(`${id}0`)}
              sistem={subsistem}
              {pilih}
              {bukaIsiProyek}
              {isiProyekAktif}
            />
          {/each}
        {/snippet}
      </ItemPanelKiri>
    {/if}
  {/snippet}
</ItemPanelKiri>
