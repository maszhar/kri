<script lang="ts">
  import type { IsiProyek } from '../../../../../../umum/entitas/IsiProyek'
  import type { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import type { KelasLangsung } from '../../../entitas/KelasLangsung.svelte'
  import { JenisMenuPanelKiri } from '../JenisMenuPanelKiri'
  import ItemPanelKiri from './ItemPanelKiri.svelte'
  import ItemPanelKiriAtribut from './ItemPanelKiriAtribut.svelte'
  import ItemPanelKiriMetode from './ItemPanelKiriMetode.svelte'

  interface Properti {
    level: number
    kelas: KelasLangsung
    idAktif: number
    pilih: (id: number) => void
    bukaMenu: (posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref: IsiProyek) => void
    idPrefix: number
    bukaKelas: (kelas: KelasLangsung) => void
    isiProyekAktif: IsiProyek
  }
  const { level, kelas, idAktif, pilih, bukaMenu, idPrefix, bukaKelas, isiProyekAktif }: Properti =
    $props()

  const id = parseInt(`${idPrefix}${kelas.dapatkanId()}`)
</script>

<ItemPanelKiri
  {level}
  label={kelas.dapatkanNamaLangsung()}
  {idAktif}
  {pilih}
  bukaMenu={(posisiKlik: Koordinat): void => bukaMenu(posisiKlik, JenisMenuPanelKiri.KELAS, kelas)}
  {id}
  punyaChildren={kelas.dapatkanKoleksiAtributLangsung().length > 0 ||
    kelas.dapatkanKoleksiMetodeLangsung().length > 0}
  buka={(): void => bukaKelas(kelas)}
  aktif={isiProyekAktif === kelas}
>
  {#snippet ikon()}
    <div class="font-bold text-blue-500">C</div>
  {/snippet}
  {#snippet itemChildren(level: number)}
    <!-- Atribut (0) -->
    {#if kelas.dapatkanKoleksiAtributLangsung().length > 0}
      <ItemPanelKiri
        {level}
        label="Atribut"
        {idAktif}
        {pilih}
        bukaMenu={(posisiKlik: Koordinat): void =>
          bukaMenu(posisiKlik, JenisMenuPanelKiri.JUDUL_ATRIBUT, kelas)}
        id={parseInt(`${id}0`)}
        punyaChildren={true}
      >
        {#snippet ikon()}
          <div class="font-bold text-red-400">A</div>
        {/snippet}
        {#snippet itemChildren(level: number)}
          {#each kelas.dapatkanKoleksiAtributLangsung() as atribut, _id (atribut.dapatkanId())}
            <ItemPanelKiriAtribut
              {level}
              {atribut}
              {idAktif}
              {pilih}
              idPrefix={parseInt(`${id}0`)}
              {bukaMenu}
              buka={(): void => bukaKelas(kelas)}
            />
          {/each}
        {/snippet}
      </ItemPanelKiri>
    {/if}

    <!-- Metode (1) -->
    {#if kelas.dapatkanKoleksiMetodeLangsung().length > 0}
      <ItemPanelKiri
        {level}
        label="Metode"
        {idAktif}
        {pilih}
        bukaMenu={(posisiKlik: Koordinat): void =>
          bukaMenu(posisiKlik, JenisMenuPanelKiri.JUDUL_OPERASI, kelas)}
        id={parseInt(`${id}1`)}
        punyaChildren={true}
      >
        {#snippet ikon()}
          <div class="font-bold text-green-400">O</div>
        {/snippet}
        {#snippet itemChildren(level: number)}
          {#each kelas.dapatkanKoleksiMetodeLangsung() as metode, _id (metode.dapatkanId())}
            <ItemPanelKiriMetode
              {level}
              {metode}
              {idAktif}
              {pilih}
              idPrefix={parseInt(`${id}1`)}
              {bukaMenu}
              buka={(): void => bukaKelas(kelas)}
            />
          {/each}
        {/snippet}
      </ItemPanelKiri>
    {/if}
  {/snippet}
</ItemPanelKiri>
