<script lang="ts">
  import type { DiagramKlas } from '../../../../../umum/entitas/DiagramKlas'
  import type { Model } from '../../../../../umum/entitas/Model'
  import type { SequenceDiagram } from '../../../../../umum/entitas/SequenceDiagram'
  import { Koordinat } from '../../../../../umum/entitas/Koordinat'
  import ItemMenuKonteks from '../ItemMenuKonteks.svelte'
  import MenuKonteks from '../MenuKonteks.svelte'
  import TampilanItemKomponenProyek from './komponen/TampilanItemKomponenProyek.svelte'

  interface Properti {
    koleksiSequenceDiagram: SequenceDiagram[]
    koleksiDiagramKlas: DiagramKlas[]
    modelAktif: Model | null
    saatBuatSequenceDiagram: () => void
    saatBukaSequenceDiagram: (indeks: number) => void
    saatBuatDiagramKlas: () => void
    saatBukaDiagramKlas: (indeks: number) => void
  }
  const {
    koleksiSequenceDiagram,
    koleksiDiagramKlas,
    modelAktif,
    saatBuatSequenceDiagram,
    saatBukaSequenceDiagram,
    saatBuatDiagramKlas,
    saatBukaDiagramKlas
  }: Properti = $props()

  let itemDipilih = $state(-1)
  let elemenPanel: HTMLDivElement

  const JENIS_MENU_KONTEKS_DIAGRAM_KLAS = 1
  const JENIS_MENU_KONTEKS_SEQUENCE_DIAGRAM = 3
  let dataMenuKonteks: { jenis: number; posisi: Koordinat } | null = $state(null)

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
</script>

<div
  class="w-50 bg-white border-r-2 border-zinc-400 flex flex-col flex-none p-3 overflow-auto"
  role="button"
  tabindex={11}
  onclick={tanganiPanelDiklik}
  onkeydown={tanganiKeyboardTurunDiPanel}
  bind:this={elemenPanel}
>
  <TampilanItemKomponenProyek
    saatDipilih={(): void => pilih(0)}
    indeks={0}
    dipilih={itemDipilih === 0}
  >
    Proyek
  </TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek
    level={1}
    saatDipilih={(): void => pilih(1)}
    indeks={1}
    dipilih={itemDipilih === 1}
    saatMenuKonteks={tampilkanMenuKonteksDiagramKlas}
  >
    Diagram Klas
  </TampilanItemKomponenProyek>

  {#each koleksiDiagramKlas as diagramKlas, indeks}
    <TampilanItemKomponenProyek
      level={2}
      saatDipilih={(): void => pilih(indeks + 2)}
      indeks={indeks + 2}
      dipilih={itemDipilih === indeks + 2}
      aktif={modelAktif === diagramKlas}
      saatBuka={(): void => saatBukaDiagramKlas(indeks)}
    >
      {diagramKlas.nama}
    </TampilanItemKomponenProyek>
  {/each}

  <TampilanItemKomponenProyek
    level={1}
    saatDipilih={(): void => pilih(koleksiDiagramKlas.length + 3)}
    indeks={koleksiDiagramKlas.length + 3}
    dipilih={itemDipilih === koleksiDiagramKlas.length + 3}
    saatMenuKonteks={tampilkanMenuKonteksSequenceDiagram}
  >
    Sequence Diagram
  </TampilanItemKomponenProyek>

  {#each koleksiSequenceDiagram as sequenceDiagram, indeks}
    <TampilanItemKomponenProyek
      level={2}
      saatDipilih={(): void => pilih(koleksiDiagramKlas.length + 4 + indeks)}
      indeks={koleksiDiagramKlas.length + 4 + indeks}
      dipilih={itemDipilih === koleksiDiagramKlas.length + 4 + indeks}
      aktif={modelAktif === sequenceDiagram}
      saatBuka={(): void => saatBukaSequenceDiagram(indeks)}
    >
      {sequenceDiagram.nama}
    </TampilanItemKomponenProyek>
  {/each}
</div>

{#if dataMenuKonteks !== null}
  {#if dataMenuKonteks.jenis === JENIS_MENU_KONTEKS_DIAGRAM_KLAS}
    <MenuKonteks posisi={dataMenuKonteks.posisi}>
      <ItemMenuKonteks saatDiklik={saatBuatDiagramKlas}>Buat Diagram Klas</ItemMenuKonteks>
    </MenuKonteks>
  {:else if dataMenuKonteks.jenis === JENIS_MENU_KONTEKS_SEQUENCE_DIAGRAM}
    <MenuKonteks posisi={dataMenuKonteks.posisi}>
      <ItemMenuKonteks saatDiklik={saatBuatSequenceDiagram}>Buat Sequence Diagram</ItemMenuKonteks>
    </MenuKonteks>
  {/if}
{/if}
