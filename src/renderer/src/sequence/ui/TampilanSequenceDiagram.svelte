<script lang="ts">
  import { onMount } from 'svelte'
  import { Koordinat } from '../../common/entitas/Koordinat'
  import { Ukuran2D } from '../../common/entitas/Ukuran2D'
  import ItemMenuKonteks from '../../common/ui/ItemMenuKonteks.svelte'
  import JudulMenuKonteks from '../../common/ui/JudulMenuKonteks.svelte'
  import Kanvas from '../../common/ui/Kanvas.svelte'
  import MenuKonteks from '../../common/ui/MenuKonteks.svelte'
  import { SequenceDiagram } from '../entitas/SequenceDiagram'
  import type { Komponen } from '../../common/entitas/Komponen'
  import TampilanObjek from './TampilanObjek.svelte'

  let sequenceDiagram: SequenceDiagram | null = $state(null)
  let kumpulanKomponen: Komponen[] = $state([])
  let ukuranKanvas = $state(new Ukuran2D(800, 600))

  let posisiMenuKonteks: Koordinat | null = $state(null)
  function tanganiKanvasBukaMenuKonteks(e: MouseEvent): void {
    posisiMenuKonteks = new Koordinat(e.clientX, e.clientY - 23)
  }
  function tanganiMenuKonteksSelesai(): void {
    posisiMenuKonteks = null
  }

  function tambahClass(): void {
    kumpulanKomponen = sequenceDiagram.tambahClass()
    tanganiMenuKonteksSelesai()
  }

  onMount(() => {
    sequenceDiagram = new SequenceDiagram()
    kumpulanKomponen = sequenceDiagram.getKumpulanKomponen()
  })
</script>

{#if sequenceDiagram}
  {#if posisiMenuKonteks !== null}
    <MenuKonteks posisi={posisiMenuKonteks} saatSelesai={(): void => tanganiMenuKonteksSelesai()}>
      <JudulMenuKonteks>Tambah Komponen</JudulMenuKonteks>
      <ItemMenuKonteks saatDiklik={(): void => tambahClass()}>Buat class baru</ItemMenuKonteks>
    </MenuKonteks>
  {/if}

  <Kanvas
    ukuran={ukuranKanvas}
    saatBukaMenuKonteks={(e: MouseEvent): void => tanganiKanvasBukaMenuKonteks(e)}
  >
    {#each kumpulanKomponen as komponen, index}
      <TampilanObjek nama={komponen.nama} posisi={new Koordinat(200 * index + 8, 8)} />
    {/each}
  </Kanvas>
{:else}
  Loading...
{/if}
