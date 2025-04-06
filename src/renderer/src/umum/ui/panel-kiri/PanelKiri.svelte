<script lang="ts">
  import type { Model } from '../../../../../umum/entitas/Model'
  import type { SequenceDiagram } from '../../../../../umum/entitas/SequenceDiagram'
  import { Koordinat } from '../../../../../umum/entitas/Koordinat'
  import ItemMenuKonteks from '../ItemMenuKonteks.svelte'
  import MenuKonteks from '../MenuKonteks.svelte'
  import TampilanItemKomponenProyek from './komponen/TampilanItemKomponenProyek.svelte'
  import type { DiagramKlasLangsung } from '../../entitas/DiagramKlasLangsung'
  import type { DiagramKasusGunaLangsung } from '../../entitas/DiagramKasusGunaLangsung'
  import type { CeritaPenggunaLangsung } from '../../entitas/CeritaPenggunaLangsung'
  import TampilanItemModel from './komponen/TampilanItemModel.svelte'
  import IkonCerita from '../ikon/IkonCerita.svelte'
  import IkonKlas from '../ikon/IkonKlas.svelte'
  import IkonKasusGuna from '../ikon/IkonKasusGuna.svelte'
  import IkonDiagramUrutan from '../ikon/IkonDiagramUrutan.svelte'

  interface Properti {
    modelAktif: Model | null
    koleksiCeritaPengguna: CeritaPenggunaLangsung[]
    koleksiDiagramKasusGuna: DiagramKasusGunaLangsung[]
    koleksiSequenceDiagram: SequenceDiagram[]
    koleksiDiagramKlasLangsung: DiagramKlasLangsung[]
    bukaCeritaPengguna: (cerita: CeritaPenggunaLangsung) => void
    buatCeritaPengguna: () => void
    saatBuatSequenceDiagram: () => void
    saatBukaSequenceDiagram: (indeks: number) => void
    saatBuatDiagramKlas: () => void
    saatBukaDiagramKlas: (indeks: number) => void
    buatDiagramKasusGuna: () => void
  }
  const {
    modelAktif,
    koleksiCeritaPengguna,
    koleksiDiagramKasusGuna,
    koleksiSequenceDiagram,
    koleksiDiagramKlasLangsung,
    bukaCeritaPengguna,
    buatCeritaPengguna,
    saatBuatSequenceDiagram,
    saatBukaSequenceDiagram,
    saatBuatDiagramKlas,
    saatBukaDiagramKlas,
    buatDiagramKasusGuna
  }: Properti = $props()

  let itemDipilih = $state(-1)
  let elemenPanel: HTMLDivElement

  // menu konteks
  const JENIS_MENU_KONTEKS_CERITA_PENGGUNA = 1
  const JENIS_MENU_KONTEKS_DIAGRAM_KASUS_GUNA = 2
  const JENIS_MENU_KONTEKS_DIAGRAM_KLAS = 3
  const JENIS_MENU_KONTEKS_SEQUENCE_DIAGRAM = 4
  let dataMenuKonteks: { jenis: number; posisi: Koordinat } | null = $state(null)

  // === OPERASI ===
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

  // cerita pengguna
  function tampilkanMenuKonteksCeritaPengguna(e: MouseEvent): void {
    bukaMenuKonteks(e, JENIS_MENU_KONTEKS_CERITA_PENGGUNA)
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

  <!-- Cerita Pengguna -->
  <TampilanItemKomponenProyek
    level={1}
    {pilih}
    indeks={dapatkanIndeks()}
    {itemDipilih}
    saatMenuKonteks={tampilkanMenuKonteksCeritaPengguna}
  >
    {#snippet ikon()}
      <IkonCerita class="w-full h-full" />
    {/snippet}
    Cerita Pengguna
  </TampilanItemKomponenProyek>

  {#each koleksiCeritaPengguna as ceritaPengguna}
    <TampilanItemModel
      level={2}
      {pilih}
      indeks={dapatkanIndeks()}
      {itemDipilih}
      aktif={modelAktif === ceritaPengguna}
      saatBuka={(): void => bukaCeritaPengguna(ceritaPengguna)}
      model={ceritaPengguna}
    >
      {#snippet ikon()}
        <IkonCerita class="w-full h-full" />
      {/snippet}
    </TampilanItemModel>
  {/each}

  <!-- Diagram Kasus Guna -->
  <TampilanItemKomponenProyek
    level={1}
    {pilih}
    indeks={dapatkanIndeks()}
    {itemDipilih}
    saatMenuKonteks={tampilkanMenuKonteksKasusGuna}
  >
    {#snippet ikon()}
      <IkonKasusGuna class="w-full h-full stroke-black fill-white" />
    {/snippet}
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
      {#snippet ikon()}
        <IkonKasusGuna class="w-full h-full stroke-black fill-white" />
      {/snippet}
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
    {#snippet ikon()}
      <IkonKlas class="w-full h-full fill-white stroke-black" />
    {/snippet}
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
      {#snippet ikon()}
        <IkonKlas class="w-full h-full fill-white stroke-black" />
      {/snippet}
      {diagramKlas.nama}
    </TampilanItemKomponenProyek>
  {/each}

  <!-- Diagram urutan -->
  <TampilanItemKomponenProyek
    level={1}
    {pilih}
    indeks={dapatkanIndeks()}
    {itemDipilih}
    saatMenuKonteks={tampilkanMenuKonteksSequenceDiagram}
  >
    {#snippet ikon()}
      <IkonDiagramUrutan class="w-full h-full fill-white stroke-black" />
    {/snippet}
    Diagram Urutan
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
      {#snippet ikon()}
        <IkonDiagramUrutan class="w-full h-full fill-white stroke-black" />
      {/snippet}
      {sequenceDiagram.nama}
    </TampilanItemKomponenProyek>
  {/each}
</div>

{#if dataMenuKonteks !== null}
  {#if dataMenuKonteks.jenis === JENIS_MENU_KONTEKS_CERITA_PENGGUNA}
    <MenuKonteks posisi={dataMenuKonteks.posisi}>
      <ItemMenuKonteks saatDiklik={buatCeritaPengguna}>Buat cerita pengguna</ItemMenuKonteks>
    </MenuKonteks>
  {:else if dataMenuKonteks.jenis === JENIS_MENU_KONTEKS_DIAGRAM_KASUS_GUNA}
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
