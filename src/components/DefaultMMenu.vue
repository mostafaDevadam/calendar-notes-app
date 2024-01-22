<template>

    <v-menu
      v-model="showAddDialog"
      activator="parent"
      :close-on-content-click="close"
      location="end"
    >
      <v-card min-width="200">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            title="John Leider"
            subtitle="Founder of Vuetify"
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                :class="fav ? 'text-red' : ''"
                icon="mdi-heart"
                @click="fav = !fav"
              ></v-btn>
            </template>
          </v-list-item>

          <v-list-item title="add" subtitle="my note"> </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  
</template>

<script setup>
import { ref, toRefs } from "vue";

const props = defineProps(["fav", "showAddDialog", "close"]);
const { fav, showAddDialog, close } = toRefs(props);
</script>

<style lang="scss" scoped>
</style>
