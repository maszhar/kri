<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  const { children }: Properti = $props()
</script>

<div class="bg-white w-64 p-2 border-l">
  {@render children?.()}
</div>
