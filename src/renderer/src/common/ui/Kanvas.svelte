<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Ukuran2D } from '../entitas/Ukuran2D'

  interface Properti {
    children?: Snippet
    ukuran?: Ukuran2D
    saatKlikGanda?: () => void
  }
  const { children, ukuran = new Ukuran2D(100, 100), saatKlikGanda }: Properti = $props()
</script>

<div
  class="m-6 inline-block bg-white"
  style={`width: ${ukuran.lebar}px; height: ${ukuran.tinggi}px;`}
  ondblclick={(): void => saatKlikGanda?.()}
  role="button"
  tabindex={0}
>
  {@render children?.()}
</div>
