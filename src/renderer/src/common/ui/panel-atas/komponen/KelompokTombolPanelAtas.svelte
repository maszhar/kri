<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  const { children }: Properti = $props()
</script>

<div class="grid grid-flow-col grid-rows-3 gap-0.5 border border-zinc-500 p-1">
  {@render children?.()}
</div>
