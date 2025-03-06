<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Koordinat } from '../../common/entitas/Koordinat'
  import InputNamaObjek from './InputNamaObjek.svelte'
  import TampilanLifeLine from './TampilanLifeLine.svelte'

  interface Properti {
    nama: string
    indeks: number
    posisi?: Koordinat
    diseleksi?: boolean
    saatMintaSeleksi?: () => void
    saatNamaObjekDiedit?: (nama: string) => void
  }
  const {
    nama,
    indeks,
    posisi = new Koordinat(),
    diseleksi = false,
    saatMintaSeleksi,
    saatNamaObjekDiedit
  }: Properti = $props()

  let sedangMengedit = $state(false)
  let elemenNamaObjek: Node
  let elemenInputNamaObjek: InputNamaObjek | undefined = $state(undefined)
  let namaObjekSementara: string = $state('')

  function tanganiKlikSaatMengedit(e: MouseEvent): void {
    if (typeof elemenInputNamaObjek !== 'undefined') {
      if (!elemenInputNamaObjek.contains(e.target as Node)) {
        akhiriMengedit()
      }
    }
  }

  function tanganiKeyboardTurunSaatMengedit(e: KeyboardEvent): void {
    if (e.key === 'Escape' || e.key === 'Enter') {
      akhiriMengedit()
    }
  }

  function mulaiMengedit(): void {
    namaObjekSementara = nama
    window.addEventListener('click', tanganiKlikSaatMengedit)
    window.addEventListener('keydown', tanganiKeyboardTurunSaatMengedit)
    sedangMengedit = true
  }

  function akhiriMengedit(): void {
    window.removeEventListener('click', tanganiKlikSaatMengedit)
    window.removeEventListener('keydown', tanganiKeyboardTurunSaatMengedit)
    saatNamaObjekDiedit?.(namaObjekSementara)
    namaObjekSementara = ''
    sedangMengedit = false
  }

  function tanganiKeyboardTurun(e: KeyboardEvent): void {
    if (!sedangMengedit && e.key == 'F2') {
      mulaiMengedit()
    }
  }

  function tanganiKlikGanda(e: MouseEvent): void {
    e.stopPropagation()
    mulaiMengedit()
  }

  onDestroy(() => {
    if (typeof window !== 'undefined' && sedangMengedit) {
      akhiriMengedit()
    }
  })
</script>

<div
  class={`absolute flex flex-col items-center ${diseleksi ? 'cursor-move' : 'cursor-default'}`}
  style={`left: ${posisi.x}px; top: ${posisi.y}px`}
  onclick={(): void => saatMintaSeleksi?.()}
  onkeydown={(e: unknown): void => tanganiKeyboardTurun(e as KeyboardEvent)}
  role="button"
  tabindex={1 + indeks}
>
  <div
    class={`border py-1 px-4 select-none ${diseleksi ? 'border-blue-600 ring-2 ring-blue-600' : 'border-black'}`}
    ondblclick={(e: unknown): void => tanganiKlikGanda(e as MouseEvent)}
    role="button"
    tabindex={1000 + indeks}
    bind:this={elemenNamaObjek}
  >
    {#if sedangMengedit}
      <InputNamaObjek bind:nilai={namaObjekSementara} bind:this={elemenInputNamaObjek} />
    {:else}
      {nama}
    {/if}
  </div>
  <TampilanLifeLine />
</div>
