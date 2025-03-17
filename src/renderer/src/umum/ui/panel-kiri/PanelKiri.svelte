<script lang="ts">
  import TampilanItemKomponenProyek from './komponen/TampilanItemKomponenProyek.svelte'
</script>

<div class="w-50 bg-white border-r-2 border-zinc-400 flex flex-col flex-none p-3 overflow-auto">
  <TampilanItemKomponenProyek>Proyek</TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek level={1}>Class Diagram</TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek level={2}>Class Diagram 1</TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek level={2}>Class Diagram 2</TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek level={1}>Sequence Diagram</TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek level={2}>Sequence Diagram 1</TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek level={2}>Sequence Diagram 2</TampilanItemKomponenProyek>
</div>
