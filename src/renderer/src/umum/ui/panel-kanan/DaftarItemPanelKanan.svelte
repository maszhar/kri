<script lang="ts">
  import ItemPanelKanan from './ItemPanelKanan.svelte'

  interface Properti {
    pilihAiChat: () => void
  }
  const { pilihAiChat }: Properti = $props()
</script>

<div class="bg-white w-5 border-l">
  <ItemPanelKanan pilih={pilihAiChat} />
</div>
