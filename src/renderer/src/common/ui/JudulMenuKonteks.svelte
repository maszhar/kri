<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  const { children }: Properti = $props()
</script>

<div class="select-none min-w-52 px-2 pt-2 text-xs font-medium text-zinc-500">
  {@render children?.()}
</div>
