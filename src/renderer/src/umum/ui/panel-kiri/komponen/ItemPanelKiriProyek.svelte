<script lang="ts">
  import type { IsiProyek } from '../../../../../../umum/entitas/IsiProyek'
  import type { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import type { ProyekLangsung } from '../../../entitas/ProyekLangsung.svelte'
  import { JenisMenuPanelKiri } from '../JenisMenuPanelKiri'
  import ItemPanelKiri from './ItemPanelKiri.svelte'
  import ItemPanelKiriSistem from './ItemPanelKiriSistem.svelte'

  interface Properti {
    idAktif: number
    pilih: (id: number) => void
    proyek: ProyekLangsung
    bukaMenu: (posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref?: IsiProyek) => void
  }
  const { proyek, idAktif, pilih, bukaMenu }: Properti = $props()

  const koleksiSistem = proyek.dapatkanKoleksiSistemLangsung()
</script>

<ItemPanelKiri
  label={proyek.dapatkanNamaLangsung()}
  punyaChildren={koleksiSistem.length > 0}
  {idAktif}
  {pilih}
  bukaMenu={(posisi: Koordinat): void => bukaMenu(posisi, JenisMenuPanelKiri.PROYEK)}
>
  {#snippet itemChildren(level: number)}
    {#each koleksiSistem as sistem, _i (sistem.dapatkanId())}
      <ItemPanelKiriSistem {level} {sistem} {idAktif} {pilih} {bukaMenu} />
    {/each}
  {/snippet}
</ItemPanelKiri>
