<script lang="ts">
  import TampilanChatAi from '../../../chat-ai/TampilanChatAi.svelte'
  import type { ProyekLangsung } from '../../entitas/ProyekLangsung'
  import { OpsiMenuKanan } from '../../tipe/OpsiMenuKanan'
  import DaftarItemPanelKanan from './DaftarItemPanelKanan.svelte'

  interface Properti {
    proyek: ProyekLangsung
  }
  const { proyek }: Properti = $props()

  let menuAktif: OpsiMenuKanan | null = $state(null)

  function bukaTutupChatAi(): void {
    if (menuAktif === OpsiMenuKanan.AI_CHAT) {
      menuAktif = null
    } else {
      menuAktif = OpsiMenuKanan.AI_CHAT
    }
  }
</script>

<div class="h-full fixed right-0 pt-32 flex flex-row-reverse">
  <DaftarItemPanelKanan pilihAiChat={bukaTutupChatAi} />

  {#if menuAktif === OpsiMenuKanan.AI_CHAT}
    <TampilanChatAi {proyek} />
  {/if}
</div>
