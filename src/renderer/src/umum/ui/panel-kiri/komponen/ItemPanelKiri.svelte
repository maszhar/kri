<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Koordinat } from '../../../../../../umum/entitas/Koordinat'

  interface Properti {
    idAktif: number
    pilih: (id: number) => void
    level?: number
    label?: string
    itemChildren?: Snippet<[number]>
    punyaChildren?: boolean
    bukaMenu: (posisiKlik: Koordinat) => void
    id: number
  }
  const {
    level = 0,
    label = '',
    itemChildren,
    punyaChildren = false,
    idAktif,
    pilih,
    bukaMenu,
    id
  }: Properti = $props()

  let childrenTampil = $state(false)

  function tanganiBukaMenu(e: MouseEvent): void {
    bukaMenu(new Koordinat(e.clientX, e.clientY))
  }

  function aturKebalikanChildrenTampil(): void {
    if (punyaChildren) {
      childrenTampil = !childrenTampil
    }
  }
</script>

<div class="flex text-sm" style="padding-left: {level * 10}px;">
  <button class="w-4" onclick={aturKebalikanChildrenTampil}>
    {#if punyaChildren}
      {#if childrenTampil}
        &downarrow;
      {:else}
        &rightarrow;
      {/if}
    {/if}
  </button>
  <button
    class="flex px-1 {idAktif === id ? 'bg-sky-200' : 'hover:bg-sky-100'}"
    onclick={(): void => pilih(id)}
    oncontextmenu={tanganiBukaMenu}
  >
    <div class="w-6">L</div>
    <div>{label}</div>
  </button>
</div>

{#if punyaChildren && childrenTampil}
  {#if itemChildren}
    {@render itemChildren?.(level + 1)}
  {/if}
{/if}
