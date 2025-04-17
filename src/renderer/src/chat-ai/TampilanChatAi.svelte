<script lang="ts">
  import type { ProyekLangsungLama } from '../umum/entitas/ProyekLangsungLama'
  import IsiPanelKanan from '../umum/ui/panel-kanan/IsiPanelKanan.svelte'
  import { ManajerChatAi } from './ManajerChatAi'

  interface Properti {
    proyek: ProyekLangsungLama
  }
  const { proyek }: Properti = $props()

  const manajerChatAi = ManajerChatAi.getInstance((): ProyekLangsungLama => {
    return proyek
  })

  let pesanBalasan = $state('')

  let pesan: string = $state('')

  function kirimPesan(): void {
    manajerChatAi.kirimPesan(pesanBalasan, (potonganPesan: string) => {
      pesan += potonganPesan
    })
  }
</script>

<IsiPanelKanan>
  <div class="flex flex-col h-full gap-2">
    <!-- Judul -->
    <div class="flex flex-none">
      <div>Judul Chat</div>
      <button>+</button>
    </div>

    <!-- Chat -->
    <div class="border flex-grow break-words">
      {pesan}
    </div>

    <!-- Reply -->
    <div class="flex flex-none gap-2">
      <textarea class="flex-grow flex-none border p-0.5" cols="1" bind:value={pesanBalasan}
      ></textarea>
      <button class="bg-sky-400 text-white py-1 px-2" onclick={kirimPesan}>Kirim</button>
    </div>
  </div>
</IsiPanelKanan>
