<script lang="ts">
  import type { Model } from '../../../../../umum/entitas/Model'
  import type { SequenceDiagram } from '../../../../../umum/entitas/SequenceDiagram'
  import { Koordinat } from '../../../../../umum/entitas/Koordinat'
  import ItemMenuKonteks from '../ItemMenuKonteks.svelte'
  import MenuKonteks from '../MenuKonteks.svelte'
  import TampilanItemKomponenProyek from './komponen/TampilanItemKomponenProyek.svelte'
  import type { DiagramKlasLangsung } from '../../entitas/DiagramKlasLangsung'
  import type { DiagramKasusGunaLangsung } from '../../entitas/DiagramKasusGunaLangsung'

  interface Properti {
    koleksiDiagramKasusGuna: DiagramKasusGunaLangsung[]
    koleksiSequenceDiagram: SequenceDiagram[]
    koleksiDiagramKlasLangsung: DiagramKlasLangsung[]
    modelAktif: Model | null
    saatBuatSequenceDiagram: () => void
    saatBukaSequenceDiagram: (indeks: number) => void
    saatBuatDiagramKlas: () => void
    saatBukaDiagramKlas: (indeks: number) => void
    buatDiagramKasusGuna: () => void
  }
  const {
    koleksiDiagramKasusGuna,
    koleksiSequenceDiagram,
    koleksiDiagramKlasLangsung,
    modelAktif,
    saatBuatSequenceDiagram,
    saatBukaSequenceDiagram,
    saatBuatDiagramKlas,
    saatBukaDiagramKlas,
    buatDiagramKasusGuna
  }: Properti = $props()

  let itemDipilih = $state(-1)
  let elemenPanel: HTMLDivElement

  const JENIS_MENU_KONTEKS_DIAGRAM_KASUS_GUNA = 1
  const JENIS_MENU_KONTEKS_DIAGRAM_KLAS = 2
  const JENIS_MENU_KONTEKS_SEQUENCE_DIAGRAM = 3
  let dataMenuKonteks: { jenis: number; posisi: Koordinat } | null = $state(null)

  // indeks
  let indeksTerakhir = -1

  function tanganiPanelDiklik(e: MouseEvent): void {
    if (elemenPanel === e.target && dataMenuKonteks === null) {
      hilangkanPilihan()
    }
  }

  function tanganiKeyboardTurunDiPanel(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      hilangkanPilihan()
    }
  }

  function hilangkanPilihan(): void {
    itemDipilih = -1
  }

  function pilih(indeks: number): void {
    itemDipilih = indeks
  }

  function tampilkanMenuKonteksSequenceDiagram(e: MouseEvent): void {
    bukaMenuKonteks(e, JENIS_MENU_KONTEKS_SEQUENCE_DIAGRAM)
  }

  function tampilkanMenuKonteksDiagramKlas(e: MouseEvent): void {
    bukaMenuKonteks(e, JENIS_MENU_KONTEKS_DIAGRAM_KLAS)
  }

  function tampilkanMenuKonteksKasusGuna(e: MouseEvent): void {
    bukaMenuKonteks(e, JENIS_MENU_KONTEKS_DIAGRAM_KASUS_GUNA)
  }

  function bukaMenuKonteks(e: MouseEvent, jenis: number): void {
    dataMenuKonteks = {
      jenis: jenis,
      posisi: new Koordinat(e.clientX, e.clientY)
    }
    window.addEventListener('click', tutupMenuKonteks)
  }

  function tutupMenuKonteks(): void {
    dataMenuKonteks = null
    window.removeEventListener('click', tutupMenuKonteks)
  }

  // indeks
  function dapatkanIndeks(): number {
    return ++indeksTerakhir
  }
</script>

<div
  class="w-52 h-full fixed bg-white border-r-2 border-zinc-400 flex flex-col flex-none pt-36 p-3 overflow-auto z-30"
  role="button"
  tabindex={10000 + dapatkanIndeks()}
  onclick={tanganiPanelDiklik}
  onkeydown={tanganiKeyboardTurunDiPanel}
  bind:this={elemenPanel}
>
  <TampilanItemKomponenProyek {pilih} indeks={dapatkanIndeks()} {itemDipilih}>
    Proyek
  </TampilanItemKomponenProyek>

  <!-- Diagram Kasus Guna -->
  <TampilanItemKomponenProyek
    level={1}
    {pilih}
    indeks={dapatkanIndeks()}
    {itemDipilih}
    saatMenuKonteks={tampilkanMenuKonteksKasusGuna}
  >
    Diagram Kasus Guna
  </TampilanItemKomponenProyek>

  {#each koleksiDiagramKasusGuna as diagramKasusGuna, indeks}
    <TampilanItemKomponenProyek
      level={2}
      {pilih}
      indeks={dapatkanIndeks()}
      {itemDipilih}
      aktif={modelAktif === diagramKasusGuna}
      saatBuka={(): void => saatBukaSequenceDiagram(indeks)}
    >
      {diagramKasusGuna.nama}
    </TampilanItemKomponenProyek>
  {/each}

  <!-- Diagram Klas -->
  <TampilanItemKomponenProyek
    level={1}
    {pilih}
    indeks={dapatkanIndeks()}
    {itemDipilih}
    saatMenuKonteks={tampilkanMenuKonteksDiagramKlas}
  >
    Diagram Klas
  </TampilanItemKomponenProyek>

  {#each koleksiDiagramKlasLangsung as diagramKlas, indeks}
    <TampilanItemKomponenProyek
      level={2}
      {pilih}
      indeks={dapatkanIndeks()}
      {itemDipilih}
      aktif={modelAktif === diagramKlas}
      saatBuka={(): void => saatBukaDiagramKlas(indeks)}
    >
      {diagramKlas.nama}
    </TampilanItemKomponenProyek>
  {/each}

  <TampilanItemKomponenProyek
    level={1}
    {pilih}
    indeks={dapatkanIndeks()}
    {itemDipilih}
    saatMenuKonteks={tampilkanMenuKonteksSequenceDiagram}
  >
    Sequence Diagram
  </TampilanItemKomponenProyek>

  {#each koleksiSequenceDiagram as sequenceDiagram, indeks}
    <TampilanItemKomponenProyek
      level={2}
      {pilih}
      indeks={dapatkanIndeks()}
      {itemDipilih}
      aktif={modelAktif === sequenceDiagram}
      saatBuka={(): void => saatBukaSequenceDiagram(indeks)}
    >
      {sequenceDiagram.nama}
    </TampilanItemKomponenProyek>
  {/each}
</div>

{#if dataMenuKonteks !== null}
  {#if dataMenuKonteks.jenis === JENIS_MENU_KONTEKS_DIAGRAM_KASUS_GUNA}
    <MenuKonteks posisi={dataMenuKonteks.posisi}>
      <ItemMenuKonteks saatDiklik={buatDiagramKasusGuna}>Buat Diagram Kasus Guna</ItemMenuKonteks>
    </MenuKonteks>
  {:else if dataMenuKonteks.jenis === JENIS_MENU_KONTEKS_DIAGRAM_KLAS}
    <MenuKonteks posisi={dataMenuKonteks.posisi}>
      <ItemMenuKonteks saatDiklik={saatBuatDiagramKlas}>Buat Diagram Klas</ItemMenuKonteks>
    </MenuKonteks>
  {:else if dataMenuKonteks.jenis === JENIS_MENU_KONTEKS_SEQUENCE_DIAGRAM}
    <MenuKonteks posisi={dataMenuKonteks.posisi}>
      <ItemMenuKonteks saatDiklik={saatBuatSequenceDiagram}>Buat Sequence Diagram</ItemMenuKonteks>
    </MenuKonteks>
  {/if}
{/if}
