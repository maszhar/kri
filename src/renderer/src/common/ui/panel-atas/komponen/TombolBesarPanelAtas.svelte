<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
    icon?: Snippet
  }
  const { children, icon }: Properti = $props()
</script>

<button class="row-span-3 hover:bg-blue-200 py-2 px-2 flex flex-col text-sm">
  <div class="flex-grow">
    {@render icon?.()}
  </div>
  {@render children?.()}
</button>
