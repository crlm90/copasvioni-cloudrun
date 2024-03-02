<template>
    <div class="flex items-center justify-between">
        <!-- checkbox and profile -->
        <div class="flex items-center">
            <label :for="id" class="flex items-center space-x-3">
                <input type="checkbox" name="audiens" :id="id" @change="selectAudiens" :checked="isChecked" />
                <div class="flex items-center space-x-2">
                    <img src="https://http.dog/200.jpg" alt="Audience" class="w-[50px] h-[50px] rounded-2xl">
                    <div>
                        <p class="font-semibold">{{ name }}</p>
                        <p class="text-sm text-gray-800">Message</p>
                    </div>
                </div>
            </label>
        </div>
        <div class="flex flex-col text-right space-y-2">
            <p class="text-sm text-gray-500">October 28, 2022</p>
            <div>
                <span class="bg-blue-600 py-1 px-2 rounded-lg flex-1 text-sm text-white font-semibold">2</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(["id", "imageUrl", "name", "message", "lastUpdate", "unreadMessage", "checked"]);
const emit = defineEmits(["select"]);

function selectAudiens(event: Event): void {
    const check = (event.target as HTMLInputElement).checked;
    emit("select", props.id, check);
}

const isChecked = computed(() => {
    if (props.checked) {
        const index = (props.checked as string[]).findIndex(data => data === props.id);
        return index > -1;
    }

    return false;
})
</script>