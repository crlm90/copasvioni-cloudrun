<template>
    <button class="w-full border rounded-lg font-semibold text-base p-3 transition duration-300"
        :class="{
            'border-red-500 bg-white text-red-500 hover:bg-gray-100': type === 'error',
            'border-blue-600 bg-blue-600 text-white hover:bg-blue-800': type === 'primary',
            'border-blue-600 bg-white text-blue-600 hover:bg-gray-100': type === 'secondary',
        }"
        @click="click"> 
        <slot />
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    type: {
        default: "primary"
    }
});

const emit = defineEmits(["click"]);

function click(): void {
    emit("click");
}
</script>