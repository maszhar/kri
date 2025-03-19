<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  const { children }: Properti = $props()
</script>

<div class="flex bg-blue-50 px-2">
  {@render children?.()}
</div>
