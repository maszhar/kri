<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
    aktif?: boolean
    pilih: () => void
  }
  const { children, aktif = false, pilih }: Properti = $props()
</script>

<button
  class={`cursor-pointer px-3 py-1 border-2 border-b-0 text-sm ${aktif ? 'bg-blue-400 text-white border-blue-600' : 'hover:bg-blue-200 border-transparent'}`}
  onclick={pilih}
>
  {@render children?.()}
</button>
