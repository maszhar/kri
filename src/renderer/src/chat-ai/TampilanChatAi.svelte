<script lang="ts">
  import IsiPanelKanan from '../umum/ui/panel-kanan/IsiPanelKanan.svelte'
</script>

<IsiPanelKanan>
  <div class="flex flex-col h-full gap-2">
    <!-- Judul -->
    <div class="flex flex-none">
      <div>Judul Chat</div>
      <button>+</button>
    </div>

    <!-- Chat -->
    <div class="border flex-grow"></div>

    <!-- Reply -->
    <div class="flex flex-none gap-2">
      <textarea class="flex-grow flex-none border p-0.5" cols="1"></textarea>
      <button class="bg-sky-400 text-white py-1 px-2">Kirim</button>
    </div>
  </div>
</IsiPanelKanan>
