<script lang="ts">
  import type { DiagramKlas } from '../../../umum/entitas/DiagramKlas'
  import type { Klas } from '../../../umum/entitas/Klas'
  import { Koordinat } from '../../../umum/entitas/Koordinat'
  import { Ukuran2D } from '../umum/entitas/Ukuran2D'
  import ItemMenuKonteks from '../umum/ui/ItemMenuKonteks.svelte'
  import Kanvas from '../umum/ui/Kanvas.svelte'
  import MenuKonteks from '../umum/ui/MenuKonteks.svelte'

  interface Properti {
    diagramKlas: DiagramKlas
    tambahKlasBaru: () => Klas
  }
  const { diagramKlas, tambahKlasBaru }: Properti = $props()

  let ukuranKanvas = $state(new Ukuran2D(800, 600))

  let posisiMenuDiagramKlas: Koordinat | null = $state(null)

  function bukaMenuDiagramKlas(e: MouseEvent): void {
    posisiMenuDiagramKlas = new Koordinat(e.clientX, e.clientY)
  }

  function tutupMenuDiagramKlas(): void {
    posisiMenuDiagramKlas = null
  }

  function tambahElemenKlasBaru(): void {
    const klasBaru = tambahKlasBaru()
    diagramKlas.tambahElemenKlasBaru(klasBaru)
    console.log(klasBaru)
  }

  function tanganiTambahElemenKlasBaru(): void {
    tambahElemenKlasBaru()
    tutupMenuDiagramKlas()
  }
</script>

{#if posisiMenuDiagramKlas !== null}
  <MenuKonteks posisi={posisiMenuDiagramKlas} saatSelesai={tutupMenuDiagramKlas}>
    <ItemMenuKonteks saatDiklik={tanganiTambahElemenKlasBaru}>Buat klas baru</ItemMenuKonteks>
  </MenuKonteks>
{/if}

<Kanvas ukuran={ukuranKanvas} saatBukaMenuKonteks={bukaMenuDiagramKlas}></Kanvas>
