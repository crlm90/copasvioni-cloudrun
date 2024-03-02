<template>
    <div class="flex items-center justify-between border p-4 rounded-lg">
        <!-- checkbox and content -->
        <div class="flex items-center">
            <label :for="id" class="flex items-center space-x-3">
                <input type="radio" :name="group" :id="id" @change="select" />
                <div class="flex items-center space-x-2">
                    <slot name="image">
                        <img src="https://http.dog/200.jpg" alt="Template" class="w-[50px] h-[50px] rounded-2xl">
                    </slot>
                    <slot name="content" :slot-props="props">
                        <p>{{ text }}</p>
                    </slot>
                </div>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(["id", "text", "imageUrl", "group"]);
const emit = defineEmits(["select"]);

function select(): void {
    emit("select", props.id);
}
</script>