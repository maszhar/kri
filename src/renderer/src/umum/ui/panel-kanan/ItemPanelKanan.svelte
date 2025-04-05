<script lang="ts">
  interface Properti {
    pilih: () => void
  }
  const { pilih }: Properti = $props()
</script>

<button style="writing-mode: vertical-rl;" onclick={pilih}>AI Chat</button>
