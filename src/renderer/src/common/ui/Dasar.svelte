<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  const { children }: Properti = $props()
</script>

<main class="bg-zinc-300 min-h-screen">
  {@render children?.()}
</main>
