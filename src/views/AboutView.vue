<template>
  <div class="about">
    about

  <v-theme-provider :theme="theme" with-background class="">
    <v-card title="Title" subtitle="Subtitle">ddd</v-card>
  </v-theme-provider>

  <v-btn @click="toggleTheme">theme</v-btn>

  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useDate } from "vuetify";
import VCalendar from '@/components/VCalendar.vue'
//import { useTheme } from 'vuestify'

//const theme = useTheme()

const theme = ref('dark')

const toggleTheme = () => {
 // theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
 theme.value == 'dark' ? theme.value = 'light' : theme.value = 'dark'

}


</script>
