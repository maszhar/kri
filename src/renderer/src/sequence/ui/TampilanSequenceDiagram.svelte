<script lang="ts">
  import { Koordinat } from '../../common/entitas/Koordinat'
  import { Ukuran2D } from '../../common/entitas/Ukuran2D'
  import Kanvas from '../../common/ui/Kanvas.svelte'
  import MenuKonteks from '../../common/ui/MenuKonteks.svelte'

  let ukuranKanvas = $state(new Ukuran2D(800, 600))

  let posisiMenuKonteks: Koordinat | null = $state(null)
  function tanganiKanvasKlikGanda(): void {
    posisiMenuKonteks = new Koordinat(0, 0)
  }
  function tanganiMenuKonteksSelesai(): void {
    posisiMenuKonteks = null
  }
</script>

{#if posisiMenuKonteks !== null}
  <MenuKonteks saatSelesai={(): void => tanganiMenuKonteksSelesai()} />
{/if}

<Kanvas ukuran={ukuranKanvas} saatKlikGanda={(): void => tanganiKanvasKlikGanda()}></Kanvas>
