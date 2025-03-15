<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  const { children }: Properti = $props()
</script>

<div class="relative border min-h-40">
  <div class="absolute">
    <svg
      class="absolute w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 20"
      preserveAspectRatio="xMaxYMid slice"
    >
      <path d="M300 0 l 0 15 l -5 5 l -295 0" stroke="black" stroke-width="2" fill="none" />
    </svg>
    <div class="text-sm pt-1 pb-1.5 px-3"><strong>sd</strong> Nama Interaksi</div>
  </div>
  {@render children?.()}
</div>
