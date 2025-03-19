<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Koordinat } from '../../../../umum/entitas/Koordinat'
  import InputNamaObjek from './InputNamaObjek.svelte'
  import TampilanLifeLine from './TampilanLifeLine.svelte'
  import TampilanSpesifikasiEksekusi from './TampilanSpesifikasiEksekusi.svelte'
  import type { Objek } from '../../../../umum/entitas/Objek'

  interface Properti {
    objek: Objek
    indeks: number
    posisi?: Koordinat
    diseleksi?: boolean
    adaYangMengedit?: boolean
    pertama?: boolean
    sedangMembuatPesan?: boolean
    saatMintaSeleksi?: () => void
    saatNamaObjekDiedit?: (nama: string) => void
    saatMulaiMengedit?: () => void
    saatSelesaiMengedit?: () => void
    saatMulaiMembuatPesan?: (titikAwal: Koordinat) => void
  }
  const {
    objek,
    indeks,
    posisi = new Koordinat(),
    diseleksi = false,
    adaYangMengedit = false,
    pertama = false,
    sedangMembuatPesan = false,
    saatMintaSeleksi,
    saatNamaObjekDiedit,
    saatMulaiMengedit,
    saatSelesaiMengedit,
    saatMulaiMembuatPesan
  }: Properti = $props()

  let sedangMengedit = $state(false)
  let elemenInputNamaObjek: InputNamaObjek | undefined = $state(undefined)
  let namaObjekSementara: string = $state('')

  const idInputNamaObjek = `${new Date().getTime()}${Math.floor(Math.random() * 1000)}`
  let posisiPratinjauSpesifikasiEksekusi: Koordinat | null = $state(null)

  function tanganiKlik(e: MouseEvent): void {
    if (!sedangMengedit) {
      if (!adaYangMengedit) {
        e.stopPropagation()
      }
      saatMintaSeleksi?.()
    }
  }

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
    namaObjekSementara = ''
    window.addEventListener('click', tanganiKlikSaatMengedit)
    window.addEventListener('keydown', tanganiKeyboardTurunSaatMengedit)
    saatMulaiMengedit?.()
    sedangMengedit = true
  }

  function akhiriMengedit(): void {
    window.removeEventListener('click', tanganiKlikSaatMengedit)
    window.removeEventListener('keydown', tanganiKeyboardTurunSaatMengedit)
    saatNamaObjekDiedit?.(namaObjekSementara)
    namaObjekSementara = ''
    saatSelesaiMengedit?.()
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

  function tanganiMouseGerakSaatMembuatPesan(e: MouseEvent): void {
    if (sedangMembuatPesan) {
      e.stopPropagation()
      posisiPratinjauSpesifikasiEksekusi = new Koordinat(0, 0)
    }
  }

  $effect((): void => {
    if (sedangMembuatPesan === false) {
      posisiPratinjauSpesifikasiEksekusi = null
    }
  })

  onDestroy(() => {
    if (typeof window !== 'undefined' && sedangMengedit) {
      akhiriMengedit()
    }
  })
</script>

<div class="flex flex-col items-center" style={`left: ${posisi.x}px; top: ${posisi.y}px`}>
  <div
    class={`border py-1 px-4 select-none  ${adaYangMengedit ? 'cursor-default' : 'cursor-move'} ${diseleksi ? 'border-blue-600 ring-2 ring-blue-600' : 'border-black'}`}
    onclick={(e: unknown): void => tanganiKlik(e as MouseEvent)}
    ondblclick={(e: unknown): void => tanganiKlikGanda(e as MouseEvent)}
    role="button"
    tabindex={1000 + indeks}
    onkeydown={(e: unknown): void => tanganiKeyboardTurun(e as KeyboardEvent)}
  >
    {#if sedangMengedit}
      <InputNamaObjek
        bind:nilai={namaObjekSementara}
        bind:this={elemenInputNamaObjek}
        id={idInputNamaObjek}
      />
    {:else}
      {objek.hasilkanTeksTampilan()}
    {/if}
  </div>

  <div class="relative">
    <TampilanLifeLine
      saatMouseGerak={(e: MouseEvent): void => tanganiMouseGerakSaatMembuatPesan(e)}
      {indeks}
    />
    {#if pertama}
      <TampilanSpesifikasiEksekusi {indeks} {saatMulaiMembuatPesan} />
    {/if}
    {#if posisiPratinjauSpesifikasiEksekusi}
      <TampilanSpesifikasiEksekusi {indeks} pratinjau />
    {/if}
  </div>
</div>
