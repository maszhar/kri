<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Ukuran2D } from '../entitas/Ukuran2D'

  interface Properti {
    children?: Snippet
    ukuran?: Ukuran2D
    saatBukaMenuKonteks?: (e: MouseEvent) => void
  }
  const { children, ukuran = new Ukuran2D(100, 100), saatBukaMenuKonteks }: Properti = $props()
</script>

<div
  class="m-6 inline-block bg-white"
  style={`width: ${ukuran.lebar}px; height: ${ukuran.tinggi}px;`}
  ondblclick={(e: unknown): void => saatBukaMenuKonteks?.(e as MouseEvent)}
  oncontextmenu={(e: unknown): void => saatBukaMenuKonteks?.(e as MouseEvent)}
  role="button"
  tabindex={0}
>
  {@render children?.()}
</div>
