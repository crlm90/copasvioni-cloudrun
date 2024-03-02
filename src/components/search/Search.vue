<template>
    <div class="bg-white rounded-lg px-4 w-80 h-12 flex items-center justify-between">
        <input type="text" v-model="searchValue" class="outline-none w-64"
            :placeholder="placeholder" @keyup.enter="onEnter" @keypress="onType" />
        <img src="../../assets/search.svg" alt="Search">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    placeholder: {
        default: "Search"
    }
})

const searchValue = ref("");

const emit = defineEmits(["enter", "type"])

function onEnter(): void {
    emit("enter", searchValue.value)
}

function onType(): void {
    emit("type", searchValue.value);
}
</script>