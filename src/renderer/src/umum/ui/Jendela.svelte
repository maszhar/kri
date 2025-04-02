<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  const { children }: Properti = $props()
</script>

<div class="pt-32 pl-52">
  {@render children?.()}
</div>
