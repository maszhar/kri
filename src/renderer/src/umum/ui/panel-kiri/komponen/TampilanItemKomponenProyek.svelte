<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
    level?: number
  }
  const { children, level = 0 }: Properti = $props()
</script>

<button class="flex justify-start">
  {#if level > 0}
    <svg class="h-4 flex-none" style={`width: ${18 * level}px`}></svg>
  {/if}
  <div class="w-4 h-4 bg-red-500 mt-0.5"></div>
  <div class="text-sm text-left ms-1">
    {@render children?.()}
  </div>
</button>
