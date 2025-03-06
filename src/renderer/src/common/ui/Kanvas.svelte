<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
    lebar?: number
    tinggi?: number
    saatKlikGanda?: () => void
  }
  const { children, lebar = 100, tinggi = 100, saatKlikGanda }: Properti = $props()
</script>

<div
  class="m-6 inline-block bg-white"
  style={`width: ${lebar}px; height: ${tinggi}px;`}
  ondblclick={(): void => saatKlikGanda?.()}
  role="button"
  tabindex={0}
>
  {@render children?.()}
</div>
