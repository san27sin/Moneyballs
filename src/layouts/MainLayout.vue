<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="currency_bitcoin" />
            Денег мало — выиграй с умом
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      width="250"
      breakpoint="767"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          class="text-white"
          header
        >
          Навигация
        </q-item-label>

        <Navlinks
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import Navlinks from 'components/Nav/NavLink.vue'

const navLinks = [
  {
    title: 'Entries',
    icon: 'savings',
    link: '/'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
