<script lang="ts">
  import { GalatNamaSama } from '../../../umum/galat/GalatNamaSama'
  import { TipeElemen } from '../../../umum/tipe/TipeElemen'
  import type { OperasiLangsung } from '../umum/entitas/OperasiLangsung.svelte'
  import { Pesan } from '../umum/entitas/Pesan.svelte'

  interface Properti {
    operasi: OperasiLangsung
  }
  let { operasi }: Properti = $props()

  let mengedit = $state(false)
  let elemenInput: HTMLInputElement | null = $state(null)
  let teksOperasiTerinput = $state('')

  function mulaiEditOperasi(): void {
    teksOperasiTerinput = operasi.toString()
    mengedit = true
    window.addEventListener('click', tanganiKlikSaatMengedit)
  }

  function tanganiKlikSaatMengedit(e: MouseEvent): void {
    if (e.target !== elemenInput) {
      akhiriEditOperasi()
    }
  }

  function tanganiKeyboardTurunDiInput(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === 'Tab') {
      akhiriEditOperasi()
    } else if (e.key === 'Escape') {
      akhiriEditOperasi(false)
    }
  }

  function akhiriEditOperasi(terapkan: boolean = true): void {
    window.removeEventListener('click', tanganiKlikSaatMengedit)
    mengedit = false

    if (terapkan && teksOperasiTerinput.trim() !== '') {
      try {
        operasi.aturDariTeks(teksOperasiTerinput)
      } catch (e: any) {
        if (e instanceof GalatNamaSama) {
          Pesan.tampilkan(
            `Nama '${e.nama}' telah digunakan sebagai nama ${e.tipe === TipeElemen.ATRIBUT ? 'operasi lain' : 'operasi'} pada kelas ini.`
          )
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

<div class="relative cursor-move" role="button" tabindex={0} ondblclick={mulaiEditOperasi}>
  {#if operasi}
    <span class={`px-2 select-none ${mengedit ? 'opacity-0' : ''}`}>
      {operasi.toStringLangsung()}
    </span>
  {:else}
    <br />
  {/if}
  {#if mengedit}
    <input
      name="namaOperasi"
      class="absolute outline-none z-10 px-2 top-0 left-0"
      autocomplete="off"
      style={`width: ${teksOperasiTerinput.length + 2}ch`}
      bind:value={teksOperasiTerinput}
      onkeydown={tanganiKeyboardTurunDiInput}
      bind:this={elemenInput}
    />
  {/if}
</div>
