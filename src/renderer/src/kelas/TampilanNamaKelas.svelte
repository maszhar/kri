<script lang="ts">
  import { GalatNamaSama } from '../../../umum/galat/GalatNamaSama'
  import { TipeElemen } from '../../../umum/tipe/TipeElemen'
  import { Pesan } from '../umum/entitas/Pesan.svelte'

  interface Properti {
    nama: string
    perbaruiNama: (nama: string) => void
  }
  const { nama, perbaruiNama }: Properti = $props()

  let mengedit = $state(false)
  let elemenInput: HTMLInputElement | null = $state(null)
  let namaTerinput = $state('')

  function mulaiEditNama(): void {
    namaTerinput = nama
    mengedit = true
    window.addEventListener('click', tanganiKlikSaatMengedit)
  }

  function tanganiKlikSaatMengedit(e: MouseEvent): void {
    if (e.target !== elemenInput) {
      akhiriEditNama()
    }
  }

  function tanganiKeyboardTurunDiInput(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === 'Tab') {
      akhiriEditNama()
    } else if (e.key === 'Escape') {
      akhiriEditNama(false)
    }
  }

  function akhiriEditNama(terapkan: boolean = true): void {
    window.removeEventListener('click', tanganiKlikSaatMengedit)
    mengedit = false

    if (terapkan && namaTerinput.trim() !== '') {
      try {
        perbaruiNama(namaTerinput.replaceAll(/[^A-Za-z0-9_]/g, ''))
      } catch (e: any) {
        if (e instanceof GalatNamaSama && e.tipe === TipeElemen.KELAS) {
          Pesan.tampilkan(`Nama kelas '${e.nama}' telah digunakan.`)
        } else {
          Pesan.tampilkan(e.message)
        }
      }
    }
  }

  $effect(() => {
    if (elemenInput) {
      elemenInput.focus()
      elemenInput.select()
    }
  })
</script>

<div
  class="relative select-none font-bold py-1 px-4 text-center cursor-move"
  ondblclick={mulaiEditNama}
  role="button"
  tabindex={0}
>
  {#if mengedit}
    <input
      bind:this={elemenInput}
      class="absolute outline-none z-10 px-2 text-center left-1/2 -translate-x-1/2"
      type="text"
      style={`width: ${namaTerinput.length + 3}ch`}
      bind:value={namaTerinput}
      onkeydown={tanganiKeyboardTurunDiInput}
    />
  {/if}
  <span class={mengedit ? 'opacity-0' : ''}>
    {nama}
  </span>
</div>
