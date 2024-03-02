<template>
    <select :id="id" @change="setData($event)" :name="id" :disabled="disabled"
        class="bg-white focus:text-black border-gray-300 focus:border-blue-500 outline-none block w-full pl-3 pr-10 py-2 transition duration-100 ease-in-out h-12
            border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="{ 'text-gray-400': !selected || selected.length < 1, 'text-black': selected.length > 0, 'border-red-500': validation && validation.length > 0 }">
        <option value="" disabled selected class="hidden text-gray-400">{{ placeholder }}</option>
        <option v-for="op in optionList" :value="op.key" :selected="op.key === selected">{{ op.value }}</option>
    </select>
    <p class="text-sm text-red-500" v-if="validation && validation.length > 0">{{ validation }}</p>
</template>

<script setup lang="ts">
import { OptionEntity } from '../ComponentEntity';

const props = defineProps(["selected", "optionList", "id", "disabled", "placeholder", "name", "validation"])
const emit = defineEmits(["change"])

function setData(event: Event): void {
    const selectedOption = props.optionList.find((op: OptionEntity) => op.key === (event.target as HTMLSelectElement).value);
    emit("change", selectedOption);
}
</script>