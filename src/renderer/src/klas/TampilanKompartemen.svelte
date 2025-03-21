<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  let { children }: Properti = $props()
</script>

<div class="font-normal border-t">
  {@render children?.()}
</div>
