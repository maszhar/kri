<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
    icon?: Snippet
    saatDiklik?: () => void
  }
  const { children, icon, saatDiklik }: Properti = $props()
</script>

<button
  class="row-span-3 hover:bg-blue-200 py-2 px-2 flex flex-col items-stretch text-sm"
  onclick={saatDiklik}
>
  <div class="flex-grow flex items-center justify-center">
    {@render icon?.()}
  </div>
  {@render children?.()}
</button>
