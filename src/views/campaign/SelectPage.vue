<template>
    <div class="p-4 space-y-4">
        <p class="text-2xl font-bold">Select Page</p>
        <div class="grid grid-cols-2 gap-x-4">
            <div class="space-y-4">
                <div class="space-y-2 max-h-96 overflow-y-auto">
                    <CheckboxGeneral v-for="page in pageOptionList" :id="page.key"
                        :key="page.key" :text="page.value" group="page" @select="setSelectedPage">
                    </CheckboxGeneral>
                </div>
            </div>
            <img src="@/assets/popup-page.png" alt="Select Message Template" class="h-full">
        </div>

        <div class="flex justify-end space-x-2 pt-2">
            <ButtonBase type="error" class="w-40" @click="$emit('cancel')">Cancel</ButtonBase>
            <ButtonBase class="w-40" @click="submitPage">Continue</ButtonBase>
        </div>
    </div>
</template>

<script setup lang="ts">
import { OptionEntity } from '@/components/ComponentEntity';
import ButtonBase from '@/components/button/ButtonBase.vue';
import CheckboxGeneral from '@/components/in-app/CheckboxGeneral.vue';
import { Page } from '@/entity/page/Page';
import { GetPageUseCase } from '@/usecase/page/GetPageUseCase';
import { Subscription, finalize } from 'rxjs';
import { Ref, computed, inject, onMounted, onUnmounted, ref } from 'vue';

const emit = defineEmits(["continue", "cancel"])

const asyncSubscription: Subscription = new Subscription();
const getPageUseCase: GetPageUseCase = inject("getPageUseCase")!;

const selectedPageId = ref("");
const selectedPage = computed(() => {
    const index = pageList.value.findIndex(data => data.page_id === selectedPageId.value);
    if (index > -1)
        return pageList.value[index];
})

const pageList: Ref<Page[]> = ref([]);

const pageOptionList: Ref<OptionEntity[]> = computed(() => {
    return pageList.value.map((data) => {
        return { key: data.page_id, value: data.page_name }
    });
});

onMounted(() => {
    loadPage();
});

const isLoading = ref(false);

onUnmounted(() => {
    asyncSubscription.unsubscribe();
})

function loadPage(): void {
    isLoading.value = true;

    asyncSubscription.add(
        getPageUseCase.execute({
            audience_name: "",
            limit: 0,
            page: 0,
            page_name: "",
            sort_by: ""
        }).pipe(
            finalize(() => isLoading.value = false)
        ).subscribe(
            {
                next: (getPageResp) => {
                    if (getPageResp.code === 200) {
                        pageList.value = getPageResp.result.data.content.page_list ?? [];
                    }
                }
            }
        )
    )
}

function submitPage(): void {
    if (selectedPage.value)
        emit('continue', selectedPage.value)
}

function setSelectedPage(id: string): void {
    selectedPageId.value = id;
}
</script>