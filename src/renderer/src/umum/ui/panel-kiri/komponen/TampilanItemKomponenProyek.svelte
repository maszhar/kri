<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
    indeks: number
    itemDipilih: number
    level?: number
    aktif?: boolean
    pilih: (indeks: number) => void
    saatMenuKonteks?: (e: MouseEvent) => void
    saatBuka?: () => void
  }
  const {
    children,
    indeks,
    itemDipilih,
    pilih,
    level = 0,
    aktif = false,
    saatMenuKonteks,
    saatBuka
  }: Properti = $props()

  let dipilih = $state(itemDipilih === indeks)
  $effect(() => {
    dipilih = itemDipilih === indeks
  })

  function saatKeyboardTurun(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      saatBuka?.()
    }
  }

  function tanganiMenuKonteks(e: MouseEvent): void {
    pilih(indeks)
    saatMenuKonteks?.(e)
  }
</script>

<button
  class={`flex flex-nowrap justify-start ${dipilih ? 'bg-blue-300' : ''}`}
  tabindex={10000 + indeks}
  onclick={(): void => pilih(indeks)}
  oncontextmenu={tanganiMenuKonteks}
  ondblclick={saatBuka}
  onkeydown={saatKeyboardTurun}
>
  {#if level > 0}
    <svg class="h-4 flex-none" style={`width: ${18 * level}px`}></svg>
  {/if}
  <div class="w-4 h-4 bg-red-500 mt-0.5 flex-none"></div>
  <div class={`text-sm text-left ms-1 text-nowrap ${aktif ? 'font-bold' : ''}`}>
    {@render children?.()}
  </div>
</button>
