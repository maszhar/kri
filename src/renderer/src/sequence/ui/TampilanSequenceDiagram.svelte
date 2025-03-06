<script lang="ts">
  import { Koordinat } from '../../common/entitas/Koordinat'
  import { Ukuran2D } from '../../common/entitas/Ukuran2D'
  import ItemMenuKonteks from '../../common/ui/ItemMenuKonteks.svelte'
  import JudulMenuKonteks from '../../common/ui/JudulMenuKonteks.svelte'
  import Kanvas from '../../common/ui/Kanvas.svelte'
  import MenuKonteks from '../../common/ui/MenuKonteks.svelte'

  let ukuranKanvas = $state(new Ukuran2D(800, 600))

  let posisiMenuKonteks: Koordinat | null = $state(null)
  function tanganiKanvasBukaMenuKonteks(e: MouseEvent): void {
    posisiMenuKonteks = new Koordinat(e.clientX, e.clientY - 23)
  }
  function tanganiMenuKonteksSelesai(): void {
    posisiMenuKonteks = null
  }
</script>

{#if posisiMenuKonteks !== null}
  <MenuKonteks posisi={posisiMenuKonteks} saatSelesai={(): void => tanganiMenuKonteksSelesai()}>
    <JudulMenuKonteks>Tambah Komponen</JudulMenuKonteks>
    <ItemMenuKonteks>Buat class baru</ItemMenuKonteks>
  </MenuKonteks>
{/if}

<Kanvas
  ukuran={ukuranKanvas}
  saatBukaMenuKonteks={(e: MouseEvent): void => tanganiKanvasBukaMenuKonteks(e)}
></Kanvas>
