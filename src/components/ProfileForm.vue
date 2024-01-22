<template>
<div>
    <div v-if="user && fields">
        <!--<div v-for="item_, index in fields" :key="index">
            <p > {{item_}} {{user[item_] ? user[item_] : 'placeholder' }} {{index}}</p>
        </div>-->
        <v-sheet width="300" class="mx-auto" height="500">
                            <v-form @submit.prevent="submit" class="my-4">
                                <div v-for="field, k in fields" :key="k">
                                    <v-text-field v-show="field != 'avatar' " v-model="doc[field]"
                                    :name="field" :id="field" :placeholder="doc[field] ? doc[field] : field "  :label="field" ></v-text-field>
                                    <v-file-input
                                        v-if="field == 'avatar' "
                                        v-model="doc[field]"
                                        placeholder="Pick an avatar"
                                        prepend-icon="mdi-camera"
                                        label="Avatar"
                                        @change="onFileChange"
                                    >
                                            <template v-slot:selection="{ fileNames }">
                                                <template v-for="fileName in fileNames" :key="fileName">
                                                    <v-chip
                                                    size="small"
                                                    label
                                                    color="primary"
                                                    class="me-2"
                                                    >
                                                    {{ fileName }}
                                                    </v-chip>
                                                    <div>
                                                        <img v-show="url" :src="url" width="50" height="50" />
                                                    </div>
                                                </template>
                                            </template>
                                    </v-file-input>


                                </div>


                                <v-btn type="submit" class="mt-2">Submit</v-btn>
                            </v-form>
        </v-sheet>
    </div>
</div>
</template>

<script setup>
import { toRefs, ref, computed, onMounted, defineEmits } from "vue";
import { useStore } from "@/stores/pinia/store";

const store = useStore()
const {user} = toRefs(store)

const props = defineProps(["fields", "data"])
const emits = defineEmits(["handleClick"])
const {fields, data} = toRefs(props)
const doc = ref(store.userDoc) //({_id: user.value.id ,name: '', email: user.value.email})
const url = ref()
const submit = async (e) => {
    //doc.value._id = user.value._id
    emits("handleClick", doc.value)
}

const onFileChange = async (e) => {
    const file = e.target.files[0]
    url.value = URL.createObjectURL(file)
}


</script>


<style lang="scss" scoped>

.block, .v-sheet {
  margin: auto;

}
form {
    margin-top: 20px;
}

</style>
