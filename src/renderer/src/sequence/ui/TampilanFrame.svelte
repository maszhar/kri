<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    namaInteraksi: string
    adaYangMengedit: boolean
    children?: Snippet
    saatMulaiMengedit: () => void
    saatSelesaiMengedit: () => void
    saatNamaInteraksiDiedit: (namaBaru: string) => void
  }
  const {
    children,
    saatMulaiMengedit,
    saatSelesaiMengedit,
    saatNamaInteraksiDiedit,
    adaYangMengedit,
    namaInteraksi
  }: Properti = $props()

  let sedangMengedit = $state(false)
  let elemenInputNamaInteraksi: HTMLInputElement | null = $state(null)
  let namaInteraksiSementara = $state('')

  let panjangNamaInteraksiSementara = $state(0)
  $effect(() => {
    panjangNamaInteraksiSementara = namaInteraksiSementara.length
  })

  function mulaiMengeditNamaInteraksi(e: MouseEvent): void {
    e.stopPropagation()
    namaInteraksiSementara = namaInteraksi
    sedangMengedit = true
    saatMulaiMengedit()

    window.addEventListener('click', tanganiKlikSaatMengeditNamaInteraksi)
  }

  function tanganiKlikSaatMengeditNamaInteraksi(e: MouseEvent): void {
    if (!elemenInputNamaInteraksi.contains(e.target as Node)) {
      selesaikanMengeditNamaInteraksi()
    }
  }

  function selesaikanMengeditNamaInteraksi(dibatalkan: boolean = false): void {
    sedangMengedit = false
    window.removeEventListener('click', tanganiKlikSaatMengeditNamaInteraksi)
    saatSelesaiMengedit()
    if (!dibatalkan) {
      saatNamaInteraksiDiedit(namaInteraksiSementara)
    }
  }

  function tanganiKeyboardTurunDiInputNamaInteraksi(e: KeyboardEvent): void {
    if (e.key == 'Enter' || e.key == 'Tab') {
      e.preventDefault()
      selesaikanMengeditNamaInteraksi()
    } else if (e.key == 'Escape') {
      e.preventDefault()
      selesaikanMengeditNamaInteraksi(true)
    }
  }

  $effect(() => {
    if (elemenInputNamaInteraksi != null) {
      elemenInputNamaInteraksi?.focus()
      elemenInputNamaInteraksi?.select()
    }
  })
</script>

<div class="relative border min-h-30 flex gap-4 p-4 pt-12">
  <div
    class={`absolute top-0 left-0 ${adaYangMengedit ? 'cursor-default' : 'cursor-move'}`}
    role="button"
    tabindex={150}
    ondblclick={mulaiMengeditNamaInteraksi}
  >
    <svg
      class="absolute w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 20"
      preserveAspectRatio="xMaxYMid slice"
    >
      <line
        x1="0"
        y1="20"
        x2="295"
        y2="20"
        vector-effect="non-scaling-stroke"
        stroke-width="1.5"
        shape-rendering="crispEdges"
        stroke="black"
      />
      <line
        x1="300"
        y1="0"
        x2="300"
        y2="15"
        vector-effect="non-scaling-stroke"
        stroke-width="1.5"
        shape-rendering="crispEdges"
        stroke="black"
      />
      <line
        x1="300"
        y1="15"
        x2="295"
        y2="20"
        vector-effect="non-scaling-stroke"
        stroke-width="1"
        shape-rendering="crispEdges"
        stroke="black"
      />
    </svg>
    <div class="text-sm pt-1 pb-1.5 px-3 z-10 select-none">
      <strong>sd</strong>
      {#if sedangMengedit}
        <input
          bind:this={elemenInputNamaInteraksi}
          type="text"
          bind:value={namaInteraksiSementara}
          class="absolute z-10 outline-none"
          style={`width: ${panjangNamaInteraksiSementara + 5}ch;`}
          onkeydown={tanganiKeyboardTurunDiInputNamaInteraksi}
        />
      {/if}
      <span class={sedangMengedit ? 'opacity-0' : ''}>{namaInteraksi}</span>
    </div>
  </div>
  {@render children?.()}
</div>
