<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  const { children }: Properti = $props()
</script>

<div class="bg-blue-50 px-2 py-0.5 flex gap-1">
  {@render children?.()}
</div>
