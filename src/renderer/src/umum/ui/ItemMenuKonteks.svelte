<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
    saatDiklik?: (e: MouseEvent) => void
  }
  const { children, saatDiklik }: Properti = $props()
</script>

<button
  type="button"
  class="select-none min-w-52 text-left py-1 px-4 cursor-pointer hover:bg-blue-100 text-sm"
  onclick={saatDiklik}
>
  {@render children?.()}
</button>
