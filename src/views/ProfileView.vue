<template>
    <div class="d-flex ">
        <v-sheet width="400" class="d-flex flex-column" height="500">
                <v-container class="bg-surface-variant ">
                  <v-row
                    class="mb-6"
                    v-show="user"
                  >
                    <v-col >
                       <div  class="d-flex flex-column gap-1 ">
                        <p>name</p>
                        <p v-if="store.userDoc['name']"> Name : {{store.userDoc["name"]}}</p>
                        <p v-if="user['email']"> Email : {{user["email"]}}</p>
                        <p >
                          lorem The simpler of the table components is v-table, a basic wrapper component for the HTML
                           table element. In addition, regular table elements such as thead, tbody, tr, and td work by default.
                        </p>
                        <p>About</p>
                        <p >
                          lorem The simpler of the table components is v-table, a basic wrapper component for the HTML
                           table element. In addition, regular table elements such as thead, tbody, tr, and td work by default.
                        </p>
                        <p >
                          lorem The simpler of the table components is v-table, a basic wrapper component for the HTML
                           table element. In addition, regular table elements such as thead, tbody, tr, and td work by default.
                        </p>
                         <v-btn @click="(e) => show =!show">Edit</v-btn>
                       </div>

                    </v-col>
                  </v-row>
                </v-container>
                <!--<div v-if="show">
                    <ProfileForm :fields="['name','email']" @handleClick="updateProfile" />

                </div>-->

                <ProfileDialog
                :showAddDialog="show"
                @closeModal="closeModal"
                @handleClick="updateProfile"
                :action_type="action_type"
                 />


              </v-sheet>


    </div>
</template>

<script setup>
import { useStore } from "@/stores/pinia/store";
import { toRefs, ref, computed, onMounted } from "vue";
import ProfileForm from '@/components/ProfileForm.vue'
import ProfileDialog from '@/components/ProfileDialog.vue'

const store = useStore()
const {user} = toRefs(store)
const show = ref(false)
const action_type = ref('edit_profile')

//

const closeModal = (val) => {
  if (show.value) {
    show.value = val;
  }
};

const updateProfile = async (val) =>{
    console.log("update profile: ", val)
    //await store.updateUser(val._id, val)

}



</script>

<style lang="scss" scoped>

.block, .v-sheet {
  margin: auto;
}

</style>
