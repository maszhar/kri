<script lang="ts">
  import type { ProyekLangsung } from '../../../entitas/ProyekLangsung.svelte'
  import ItemPanelKiri from './ItemPanelKiri.svelte'
  import ItemPanelKiriSistem from './ItemPanelKiriSistem.svelte'

  interface Properti {
    idAktif: number
    pilih: (id: number) => void
    proyek: ProyekLangsung
  }
  const { proyek, idAktif, pilih }: Properti = $props()

  const koleksiSistem = proyek.dapatkanKoleksiSistemLangsung()
</script>

<ItemPanelKiri
  label={proyek.dapatkanNamaLangsung()}
  punyaChildren={koleksiSistem.length > 0}
  {idAktif}
  {pilih}
>
  {#snippet itemChildren(level: number)}
    {#each koleksiSistem as sistem, _i (sistem.dapatkanId())}
      <ItemPanelKiriSistem {level} {sistem} {idAktif} {pilih} />
    {/each}
  {/snippet}
</ItemPanelKiri>
