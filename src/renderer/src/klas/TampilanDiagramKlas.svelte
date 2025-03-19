<script lang="ts">
  import type { DiagramKlas } from '../../../umum/entitas/DiagramKlas'
  import type { ElemenKlas } from '../../../umum/entitas/ElemenKlas'
  import type { Klas } from '../../../umum/entitas/Klas'
  import { Koordinat } from '../../../umum/entitas/Koordinat'
  import { Ukuran2D } from '../umum/entitas/Ukuran2D'
  import ItemMenuKonteks from '../umum/ui/ItemMenuKonteks.svelte'
  import JudulMenuKonteks from '../umum/ui/JudulMenuKonteks.svelte'
  import Kanvas from '../umum/ui/Kanvas.svelte'
  import MenuKonteks from '../umum/ui/MenuKonteks.svelte'
  import TampilanElemenKlas from './TampilanElemenKlas.svelte'

  interface Properti {
    diagramKlas: DiagramKlas
    tambahKlasBaru: () => Klas
  }
  const { diagramKlas, tambahKlasBaru }: Properti = $props()

  let elemenKanvas: Kanvas
  let ukuranKanvas = $state(new Ukuran2D(800, 600))
  let koleksiElemenKlas: ElemenKlas[] = $state([])

  let posisiMenuDiagramKlas: Koordinat | null = $state(null)

  let elemenKlasDipilih = $state(-1)

  function bukaMenuDiagramKlas(e: MouseEvent): void {
    posisiMenuDiagramKlas = new Koordinat(e.clientX, e.clientY)
  }

  function tutupMenuDiagramKlas(): void {
    posisiMenuDiagramKlas = null
  }

  function tambahElemenKlasBaru(): void {
    const klasBaru = tambahKlasBaru()
    diagramKlas.tambahElemenKlasBaru(klasBaru)
    koleksiElemenKlas = diagramKlas.koleksiElemenKlas
  }

  function tanganiTambahElemenKlasBaru(): void {
    tambahElemenKlasBaru()
    tutupMenuDiagramKlas()
  }

  function pilihElemenKlas(indeks: number): void {
    elemenKlasDipilih = indeks
  }

  function tanganiKanvasDiklik(e: MouseEvent): void {
    if (e.target === elemenKanvas.dapatkanElemen()) {
      elemenKlasDipilih = -1
    }
  }

  function dapatkanKoordinatPojokKiriAtasKanvas(): Koordinat {
    return new Koordinat(elemenKanvas.getXAbsolut(), elemenKanvas.getYAbsolut())
  }

  $effect(() => {
    koleksiElemenKlas = diagramKlas.koleksiElemenKlas
  })
</script>

{#if posisiMenuDiagramKlas !== null}
  <MenuKonteks posisi={posisiMenuDiagramKlas} saatSelesai={tutupMenuDiagramKlas}>
    <JudulMenuKonteks>Tambah Klas</JudulMenuKonteks>
    <ItemMenuKonteks saatDiklik={tanganiTambahElemenKlasBaru}>Buat klas baru</ItemMenuKonteks>
  </MenuKonteks>
{/if}

<Kanvas
  bind:this={elemenKanvas}
  ukuran={ukuranKanvas}
  saatBukaMenuKonteks={bukaMenuDiagramKlas}
  saatDiklik={tanganiKanvasDiklik}
>
  {#each koleksiElemenKlas as elemenKlas, indeks}
    <TampilanElemenKlas
      {elemenKlas}
      {indeks}
      adaYangMengedit={false}
      mintaDipilih={(): void => pilihElemenKlas(indeks)}
      dipilih={elemenKlasDipilih === indeks}
      {dapatkanKoordinatPojokKiriAtasKanvas}
    />
  {/each}
</Kanvas>
