<script lang="ts">
  import TampilanItemKomponenProyek from './komponen/TampilanItemKomponenProyek.svelte'

  let itemDipilih = $state(-1)
  let elemenPanel: HTMLDivElement

  function tanganiPanelDiklik(e: MouseEvent): void {
    if (elemenPanel === e.target) {
      hilangkanPilihan()
    }
  }

  function tanganiKeyboardTurunDiPanel(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      hilangkanPilihan()
    }
  }

  function hilangkanPilihan(): void {
    itemDipilih = -1
  }

  function pilih(indeks: number): void {
    itemDipilih = indeks
  }
</script>

<div
  class="w-50 bg-white border-r-2 border-zinc-400 flex flex-col flex-none p-3 overflow-auto"
  role="button"
  tabindex={11}
  onclick={tanganiPanelDiklik}
  onkeydown={tanganiKeyboardTurunDiPanel}
  bind:this={elemenPanel}
>
  <TampilanItemKomponenProyek
    saatDipilih={(): void => pilih(0)}
    indeks={0}
    dipilih={itemDipilih === 0}
  >
    Proyek
  </TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek
    level={1}
    saatDipilih={(): void => pilih(1)}
    indeks={1}
    dipilih={itemDipilih === 1}
  >
    Class Diagram
  </TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek
    level={2}
    saatDipilih={(): void => pilih(2)}
    indeks={2}
    dipilih={itemDipilih === 2}
  >
    Class Diagram 1
  </TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek
    level={2}
    saatDipilih={(): void => pilih(3)}
    indeks={3}
    dipilih={itemDipilih === 3}
  >
    Class Diagram 2
  </TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek
    level={1}
    saatDipilih={(): void => pilih(4)}
    indeks={4}
    dipilih={itemDipilih === 4}
  >
    Sequence Diagram
  </TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek
    level={2}
    saatDipilih={(): void => pilih(5)}
    indeks={5}
    dipilih={itemDipilih === 5}
  >
    Sequence Diagram 1
  </TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek
    level={2}
    saatDipilih={(): void => pilih(6)}
    indeks={6}
    dipilih={itemDipilih === 6}
  >
    Sequence Diagram 2
  </TampilanItemKomponenProyek>
</div>
