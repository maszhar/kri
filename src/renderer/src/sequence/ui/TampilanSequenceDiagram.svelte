<script lang="ts">
  import { Koordinat } from '../../common/entitas/Koordinat'
  import Kanvas from '../../common/ui/Kanvas.svelte'
  import MenuKonteks from '../../common/ui/MenuKonteks.svelte'

  let posisiMenuKonteks: Koordinat | null = $state(null)
  function tanganiKanvasKlikGanda(): void {
    posisiMenuKonteks = new Koordinat(0, 0)
  }
  function tanganiMenuKonteksDibatalkan(): void {
    posisiMenuKonteks = null
  }
</script>

{#if posisiMenuKonteks !== null}
  <MenuKonteks saatDibatalkan={(): void => tanganiMenuKonteksDibatalkan()} />
{/if}

<Kanvas saatKlikGanda={(): void => tanganiKanvasKlikGanda()}></Kanvas>
