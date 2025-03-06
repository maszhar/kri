<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
    lebar?: number
    tinggi?: number
  }
  const { children, lebar = 100, tinggi = 100 }: Properti = $props()
</script>

<div class="m-6 inline-block bg-white" style={`width: ${lebar}px; height: ${tinggi}px;`}>
  {@render children?.()}
</div>
