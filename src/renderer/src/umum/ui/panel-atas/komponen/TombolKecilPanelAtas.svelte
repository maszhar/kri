<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
    icon?: Snippet
    saatDiklik?: () => void
  }
  const { children, icon, saatDiklik }: Properti = $props()
</script>

<button class="flex items-center gap-1 text-sm hover:bg-blue-200 px-2 py-0.5" onclick={saatDiklik}>
  <div class="w-4 h-4 flex items-center justify-center">
    {@render icon?.()}
  </div>
  {@render children?.()}
</button>
