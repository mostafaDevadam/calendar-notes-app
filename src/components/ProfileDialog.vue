<template>
<div>

    <v-dialog v-model="showAddDialog" activator="parent" width="400" height="650">
           <v-card >
            <ProfileForm :fields="['name','email','avatar']" @handleClick="submit" />
 <v-card-actions>
              <v-btn block @click="close">Close Dialog</v-btn>
            </v-card-actions>
            </v-card>

    </v-dialog>

</div>
</template>

<script setup>
import { toRefs, ref, computed, onMounted, defineEmits } from "vue";
import { useStore } from "@/stores/pinia/store";
import ProfileForm from '@/components/ProfileForm.vue'

const store = useStore()
const {user} = toRefs(store)

const props = defineProps(["showAddDialog","action_type","fields", "data"])
const { showAddDialog, selectedEvent, data, action_type, fields, } = toRefs(props);
const emits = defineEmits(["closeModal", "handleClick"]);

const toggle = ref(false);
const width = ref(600)
const height = ref(200)

const doc = ref(store.userDoc) //({_id: user.value.id ,name: '', email: user.value.email})

const close = () => {
  emits("closeModal", false);
};
const submit = async (val) => {
    //doc.value._id = user.value._id
    emits("handleClick", val)
}


</script>
