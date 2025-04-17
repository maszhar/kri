<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    idAktif: number
    pilih: (id: number) => void
    level?: number
    label?: string
    itemChildren?: Snippet<[number]>
    punyaChildren?: boolean
  }
  const {
    level = 0,
    label = '',
    itemChildren,
    punyaChildren = false,
    idAktif,
    pilih
  }: Properti = $props()

  const id = parseInt(`${new Date().getTime()}${Math.floor(Math.random() * 4)}`)

  let childrenTampil = $state(false)
</script>

<div class="flex text-sm">
  <button class="w-4">
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
