<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    indeks: number
    children?: Snippet
    level?: number
    dipilih?: boolean
    saatDipilih: () => void
    saatMenuKonteks?: (e: MouseEvent) => void
  }
  const {
    children,
    indeks,
    saatDipilih,
    level = 0,
    dipilih = false,
    saatMenuKonteks
  }: Properti = $props()
</script>

<button
  class={`flex flex-nowrap justify-start ${dipilih ? 'bg-blue-300' : ''}`}
  tabindex={4000 + indeks}
  onclick={saatDipilih}
  oncontextmenu={saatMenuKonteks}
>
  {#if level > 0}
    <svg class="h-4 flex-none" style={`width: ${18 * level}px`}></svg>
  {/if}
  <div class="w-4 h-4 bg-red-500 mt-0.5 flex-none"></div>
  <div class="text-sm text-left ms-1 text-nowrap">
    {@render children?.()}
  </div>
</button>
