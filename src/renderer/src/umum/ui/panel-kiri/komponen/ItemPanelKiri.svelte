<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import IkonPanahBawah from '../../ikon/IkonPanahBawah.svelte'
  import IkonPanahKanan from '../../ikon/IkonPanahKanan.svelte'

  interface Properti {
    idAktif: number
    pilih: (id: number) => void
    level?: number
    label?: string
    itemChildren?: Snippet<[number]>
    ikon?: Snippet
    punyaChildren?: boolean
    bukaMenu: (posisiKlik: Koordinat) => void
    id: number
    buka?: () => void
    aktif?: boolean
  }
  const {
    level = 0,
    label = '',
    itemChildren,
    punyaChildren = false,
    idAktif,
    ikon,
    pilih,
    bukaMenu,
    id,
    buka,
    aktif = false
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
        <IkonPanahBawah class="w-full h-full" />
      {:else}
        <IkonPanahKanan class="w-full h-full" />
      {/if}
    {/if}
  </button>
  <button
    class="flex items-center gap-1.5 px-1 {idAktif === id ? 'bg-sky-200' : 'hover:bg-sky-100'}"
    onclick={(): void => pilih(id)}
    oncontextmenu={tanganiBukaMenu}
    ondblclick={buka}
  >
    <div class="w-4">
      {@render ikon?.()}
    </div>
    <div class={aktif ? 'font-bold' : ''}>{label}</div>
  </button>
</div>

{#if punyaChildren && childrenTampil}
  {#if itemChildren}
    {@render itemChildren?.(level + 1)}
  {/if}
{/if}
