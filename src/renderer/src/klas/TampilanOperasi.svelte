<script lang="ts">
  import type { Operasi, ParameterBuatOperasi } from '../../../umum/entitas/Operasi'
  import { ParameterOperasi } from '../../../umum/entitas/ParameterOperasi'

  interface Properti {
    indeksKlas: number
    indeksOperasi: number
    operasi?: Operasi
    mulaiMengedit?: () => void
    selesaiMengedit: (operasiBaru: ParameterBuatOperasi) => void
    batalkanMengedit: () => void
  }
  let {
    indeksKlas,
    indeksOperasi: indeksAtribut,
    operasi,
    mulaiMengedit,
    batalkanMengedit,
    selesaiMengedit
  }: Properti = $props()

  let sedangMengedit = $state(false)
  let elemenInputAtribut: HTMLInputElement | null = $state(null)
  let teksAtributTerformatSementara = $state('')

  // pengformat
  function hasilkanTeksAtributTerformat(operasi: Operasi): string {
    let teksTerformat = ''
    teksTerformat += operasi.nama
    teksTerformat += '('
    teksTerformat += operasi.koleksiParameter
      .map((parameter) => {
        let teksParameterTerformat = ''
        teksParameterTerformat += parameter.nama
        if (parameter.tipe) {
          teksParameterTerformat += ` : ${parameter.tipe}`
        }
        return teksParameterTerformat
      })
      .join(', ')
    teksTerformat += ')'
    if (operasi.tipeKeluaran) {
      teksTerformat += ` : ${operasi.tipeKeluaran}`
    }
    return teksTerformat
  }

  function hasilkanParameterBuatOperasiDariTeksTerformat(
    teksTerformat: string
  ): ParameterBuatOperasi {
    const indeksPembukaKoleksiParameter = teksTerformat.lastIndexOf('(')

    let nama = ''
    if (indeksPembukaKoleksiParameter === -1) {
      nama = teksTerformat
      return {
        nama: nama
      }
    }

    nama = teksTerformat.slice(0, indeksPembukaKoleksiParameter).trim()
    if (teksTerformat.length === indeksPembukaKoleksiParameter + 1) {
      return {
        nama: nama
      }
    }

    let teksKoleksiParameter = ''

    const indeksPenutupKoleksiParameter = teksTerformat.lastIndexOf(')')
    if (indeksPenutupKoleksiParameter === -1) {
      teksKoleksiParameter = teksTerformat.slice(
        indeksPembukaKoleksiParameter + 1,
        teksTerformat.length
      )
    } else {
      teksKoleksiParameter = teksTerformat.slice(
        indeksPembukaKoleksiParameter + 1,
        indeksPenutupKoleksiParameter
      )
    }

    let koleksiParameter: ParameterOperasi[] = []

    let koleksiTeksParameter = teksKoleksiParameter.split(',')
    koleksiTeksParameter.forEach((teksParameter) => {
      let nama: string
      let tipe: string | undefined = undefined

      const indeksPemisahNamaDanTipe = teksParameter.lastIndexOf(':')
      if (indeksPemisahNamaDanTipe === -1) {
        nama = teksParameter.trim()
      } else {
        nama = teksParameter.slice(0, indeksPemisahNamaDanTipe).trim()
        if (teksParameter.length > indeksPemisahNamaDanTipe + 1) {
          tipe = teksParameter.slice(indeksPemisahNamaDanTipe + 1, teksParameter.length)
        }
      }

      koleksiParameter.push(
        new ParameterOperasi({
          nama: nama,
          tipe: tipe
        })
      )
    })

    // tipe keluaran
    let tipeKeluaran: string | undefined = undefined

    if (
      indeksPenutupKoleksiParameter !== -1 &&
      teksTerformat.length > indeksPenutupKoleksiParameter + 1
    ) {
      const teksTipeKeluaran = teksTerformat.slice(
        indeksPenutupKoleksiParameter + 1,
        teksTerformat.length
      )
      const potonganTeksTipeKeluaran = teksTipeKeluaran.split(':')

      if (potonganTeksTipeKeluaran.length > 1) {
        tipeKeluaran = potonganTeksTipeKeluaran[1].trim()
      }
    }

    return {
      nama: nama,
      koleksiParameter: koleksiParameter,
      tipeKeluaran: tipeKeluaran
    }
  }

  // edit atribut
  export function mulaiEditOperasi(): void {
    if (operasi) {
      teksAtributTerformatSementara = hasilkanTeksAtributTerformat(operasi)
    } else {
      teksAtributTerformatSementara = ''
    }
    sedangMengedit = true
    window.addEventListener('click', tanganiMouseKlikSaatMengedit)
    mulaiMengedit?.()
  }

  function tanganiSelesaiMengedit(): void {
    sedangMengedit = false

    if (!operasi) {
      if (teksAtributTerformatSementara.trim().length > 0) {
        const parameterAtributBaru = hasilkanParameterBuatOperasiDariTeksTerformat(
          teksAtributTerformatSementara
        )
        selesaiMengedit(parameterAtributBaru)
      } else {
        batalkanMengedit()
      }
    } else {
      if (teksAtributTerformatSementara.trim().length === 0) {
        batalkanMengedit()
        return
      }

      const parameterAtributBaru = hasilkanParameterBuatOperasiDariTeksTerformat(
        teksAtributTerformatSementara
      )
      selesaiMengedit(parameterAtributBaru)
    }
  }

  function tanganiKeyboardTurunDiInput(e: KeyboardEvent): void {
    if (e.key == 'Enter' || e.key == 'Tab') {
      tanganiSelesaiMengedit()
      sedangMengedit = false
    } else if (e.key == 'Escape') {
      batalkanMengedit()
      sedangMengedit = false
    }
  }

  function tanganiMouseKlikSaatMengedit(e: MouseEvent): void {
    if (sedangMengedit && e.target != elemenInputAtribut) {
      window.removeEventListener('click', tanganiMouseKlikSaatMengedit)

      // baru
      tanganiSelesaiMengedit()
    }
  }

  $effect(() => {
    if (sedangMengedit && elemenInputAtribut) {
      elemenInputAtribut.focus()
      elemenInputAtribut.select()
    }
  })
</script>

<div
  class="relative"
  role="button"
  tabindex={(40000 + indeksKlas) * 100000 + 10000 + indeksAtribut}
  ondblclick={mulaiEditOperasi}
>
  {#if operasi}
    <span class={`px-2 select-none ${sedangMengedit ? 'opacity-0' : ''}`}>
      {hasilkanTeksAtributTerformat(operasi)}
    </span>
  {:else}
    <br />
  {/if}
  {#if sedangMengedit}
    <input
      name="namaAtribut"
      class="absolute outline-none z-10 px-2 top-0 left-0"
      autocomplete="off"
      style={`width: ${teksAtributTerformatSementara.length + 2}ch`}
      bind:value={teksAtributTerformatSementara}
      onkeydown={tanganiKeyboardTurunDiInput}
      bind:this={elemenInputAtribut}
    />
  {/if}
</div>
