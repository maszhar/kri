<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  const { children }: Properti = $props()
</script>

<button class="text-sm hover:bg-blue-200 px-2 py-0.5">
  {@render children?.()}
</button>
