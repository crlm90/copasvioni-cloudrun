<template>
    <select class="outline-none" @change="setData($event)" :name="id">
        <option v-for="op in optionList" :value="op.key" :selected="op.key === selected">{{ op.value }}</option>
    </select>
</template>

<script setup lang="ts">
import { OptionEntity } from '../ComponentEntity';

const props = defineProps(["selected", "optionList", "id"])
const emit = defineEmits(["change"])

function setData(event: Event): void {
    const selectedOption = props.optionList.find((op: OptionEntity) => op.key === (event.target as HTMLSelectElement).value);
    emit("change", selectedOption);
}
</script>