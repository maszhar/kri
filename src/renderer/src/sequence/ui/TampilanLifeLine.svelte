<script lang="ts">
  interface Properti {
    indeks: number
    saatMouseGerak?: (e: MouseEvent) => void
  }
  const { saatMouseGerak, indeks }: Properti = $props()
</script>

<div onmousemove={saatMouseGerak} role="button" tabindex={3000 + indeks}>
  <svg width="10" height="200" xmlns="http://www.w3.org/2000/svg">
    <line x1="5" y1="0" x2="5" y2="200" stroke-dasharray="6 4" stroke="black" stroke-width="1" />
  </svg>
</div>
