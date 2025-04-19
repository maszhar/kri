<script lang="ts">
  import { Koordinat } from '../../../../../umum/entitas/Koordinat'
  import ItemMenuKonteks from '../ItemMenuKonteks.svelte'
  import MenuKonteks from '../MenuKonteks.svelte'
  import type { ProyekLangsung } from '../../entitas/ProyekLangsung.svelte'
  import ItemPanelKiriProyek from './komponen/ItemPanelKiriProyek.svelte'
  import { JenisMenuPanelKiri } from './JenisMenuPanelKiri'
  import type { IsiProyek } from '../../../../../umum/entitas/IsiProyek'
  import { SistemLangsung } from '../../entitas/SistemLangsung.svelte'
  import { Kelas } from '../../../../../umum/entitas/Kelas'

  interface Properti {
    proyek: ProyekLangsung
    isiProyekAktif: IsiProyek | null
    bukaIsiProyek: (isiProyek: IsiProyek, sistem: SistemLangsung | null) => void
    waktuLoad: number
  }
  const { proyek, isiProyekAktif, bukaIsiProyek, waktuLoad }: Properti = $props()

  let idItemAktif = $state(-1)

  let elemenPanel: HTMLDivElement

  // menu
  let refMenu: IsiProyek | null = null
  let posisiMenu: Koordinat | null = $state(null)
  let menuAktif: ItemMenu[] | null = $state(null)

  // === OPERASI ===
  function pilih(idPilihan: number): void {
    idItemAktif = idPilihan
  }

  // indeks
  let indeksTerakhir = -1

  function tanganiPanelDiklik(e: MouseEvent): void {
    if (elemenPanel === e.target && menuAktif === null) {
      hilangkanPilihan()
    }
  }

  function tanganiKeyboardTurunDiPanel(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      hilangkanPilihan()
    }
  }

  function hilangkanPilihan(): void {
    idItemAktif = -1
  }

  // menu
  interface ItemMenu {
    label: string
    aksi: () => void
  }

  const petaItemMenu: Map<JenisMenuPanelKiri, ItemMenu[]> = new Map()

  petaItemMenu.set(JenisMenuPanelKiri.PROYEK, [
    {
      label: 'Buat sistem',
      aksi: (): void => {
        proyek.buatSistem()
      }
    }
  ])

  const menuBuatSubsistem = {
    label: 'Buat subsistem',
    aksi: (): void => {
      if (refMenu instanceof SistemLangsung) {
        refMenu.buatSubsistem()
      }
    }
  }
  petaItemMenu.set(JenisMenuPanelKiri.JUDUL_SISTEM, [menuBuatSubsistem])

  const menuBuatKelas = {
    label: 'Buat kelas',
    aksi: (): void => {
      if (refMenu instanceof SistemLangsung) {
        refMenu.buatKelas()
      }
    }
  }
  petaItemMenu.set(JenisMenuPanelKiri.SISTEM, [menuBuatKelas, menuBuatSubsistem])

  petaItemMenu.set(JenisMenuPanelKiri.JUDUL_KELAS, [menuBuatKelas])

  const menuBuatAtribut = {
    label: 'Buat atribut',
    aksi: (): void => {
      if (refMenu instanceof Kelas) {
        refMenu.buatAtribut()
      }
    }
  }
  petaItemMenu.set(JenisMenuPanelKiri.KELAS, [menuBuatAtribut])

  petaItemMenu.set(JenisMenuPanelKiri.JUDUL_ATRIBUT, [menuBuatAtribut])

  function bukaMenu(posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref?: IsiProyek): void {
    if (petaItemMenu.has(jenis)) {
      menuAktif = petaItemMenu.get(jenis)!
      refMenu = ref ?? null
      posisiMenu = posisiKlik

      window.addEventListener('click', tutupMenu)
    }
  }

  function tutupMenu(): void {
    window.removeEventListener('click', tutupMenu)
    menuAktif = null
    refMenu = null
    posisiMenu = null
  }

  // indeks
  function dapatkanIndeks(): number {
    return ++indeksTerakhir
  }
</script>

<div
  class="w-52 h-full fixed bg-white border-r-2 border-zinc-400 flex flex-col flex-none pt-36 p-3 overflow-auto z-30"
  role="button"
  tabindex={10000 + dapatkanIndeks()}
  onclick={tanganiPanelDiklik}
  onkeydown={tanganiKeyboardTurunDiPanel}
  bind:this={elemenPanel}
>
  <!-- Proyek -->
  <ItemPanelKiriProyek
    {isiProyekAktif}
    {proyek}
    idAktif={idItemAktif}
    {pilih}
    {bukaMenu}
    {bukaIsiProyek}
    {waktuLoad}
  />
</div>

{#if menuAktif && posisiMenu}
  <MenuKonteks posisi={posisiMenu}>
    {#each menuAktif as itemMenuAktif}
      <ItemMenuKonteks saatDiklik={itemMenuAktif.aksi}>{itemMenuAktif.label}</ItemMenuKonteks>
    {/each}
  </MenuKonteks>
{/if}
