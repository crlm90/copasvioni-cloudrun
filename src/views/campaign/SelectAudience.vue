<template>
    <div class="relative space-y-2">
        <div class="flex items-center pb-2">
            <label for="audiens" class="flex items-center space-x-3">
                <input type="checkbox" name="audiens" id="audiens" />
                <span class="font-semibold">Select Audience</span>
            </label>
        </div>
        <div class="pb-4 space-y-2">
            <p class="font-semibold">Filter Flag</p>
            <div class="flex space-x-2">
                <div class="w-9 h-9 rounded bg-green-500" title="Filter 1"></div>
                <div class="w-9 h-9 rounded bg-blue-500" title="Filter 2"></div>
                <div class="w-9 h-9 rounded bg-teal-500" title="Filter 3"></div>
                <div class="w-9 h-9 rounded bg-emerald-500" title="Filter 4"></div>
            </div>
        </div>
        <CheckboxAudience v-for="a in audience_list" :key="a.audience_id" :id="a.audience_id"
            :name="a.audience_name" :checked="checkedAudience" @select="onChangeAudience">
        </CheckboxAudience>
    </div>
    <div class="pt-8 flex justify-center space-x-8">
        <ButtonBase type="error" class="w-32" @click="$emit('cancel')">Cancel</ButtonBase>
        <ButtonBase class="w-32" @click="$emit('continue', dataToEmit)">Done</ButtonBase>
    </div>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/button/ButtonBase.vue';
import CheckboxAudience from '@/components/in-app/CheckboxAudience.vue';
import { Page } from '@/entity/page/Page';
import { GetPageUseCase } from '@/usecase/page/GetPageUseCase';
import { Subscription, finalize } from 'rxjs';
import { Ref, computed, inject, onMounted, onUnmounted, ref } from 'vue';

const emit = defineEmits(["continue", "cancel"])
const props = defineProps(["audience_list", "checkedAudience"]);

const dataToEmit: Ref<string[]> = ref([]);

onMounted(() => {
    dataToEmit.value = JSON.parse(JSON.stringify(props.checkedAudience));
})

function onChangeAudience(audienceId: string, check: boolean) {
    if (check) {
        dataToEmit.value.push(audienceId);
    } else {
        const indexToRemove = dataToEmit.value.findIndex(data => data === audienceId);
        dataToEmit.value.splice(indexToRemove, 1);
    }
}
</script>