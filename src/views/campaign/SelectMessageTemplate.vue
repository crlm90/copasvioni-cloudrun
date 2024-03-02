<template>
    <div class="p-4 space-y-4">
        <p class="text-2xl font-bold">Select Template</p> 
        <div class="grid grid-cols-2 gap-x-4">
            <div class="space-y-4">
                <div class="space-y-2 max-h-96 overflow-y-auto">
                    <CheckboxGeneral v-for="t in templateOptionList" :id="t.key"
                        :key="t.key" :text="t.value" group="page" @select="setSelectedTemplate">
                    </CheckboxGeneral>
                </div>
            </div>
            <img src="@/assets/cuate.png" alt="Select Message Template" class="h-full">
        </div>

        <div class="flex justify-end space-x-2 pt-2">
            <ButtonBase type="error" class="w-40" @click="$emit('cancel')">Cancel</ButtonBase>
            <ButtonBase class="w-40" @click="selectTemplate">Continue</ButtonBase>
        </div>
    </div>
</template>

<script setup lang="ts">
import { OptionEntity } from '@/components/ComponentEntity';
import ButtonBase from '@/components/button/ButtonBase.vue';
import CheckboxGeneral from '@/components/in-app/CheckboxGeneral.vue';
import { TemplateMessage } from '@/entity/message/TemplateMessage';
import { GetTemplateUseCase } from '@/usecase/template/GetTemplateUseCase';
import { Subscription, finalize } from 'rxjs';
import { Ref, computed, inject, onMounted, ref } from 'vue';

const emit = defineEmits(["selected", "cancel"]);

const asyncSubscription: Subscription = new Subscription();
const getTemplateUseCase: GetTemplateUseCase = inject("getTemplateUseCase")!;
const isLoading = ref(false);

const templateList: Ref<TemplateMessage[]> = ref([]);
const templateOptionList: Ref<OptionEntity[]> = computed(() => {
    return templateList.value.map((data) => {
        return { key: data.template_id, value: data.template_name };
    })
})

const selectedTemplateId = ref("");
const selectedTemplate = computed(() => {
    const index = templateList.value.findIndex(data => data.template_id === selectedTemplateId.value);
    if (index > -1)
        return templateList.value[index];
})

onMounted(() => {
    loadTemplate();
})

function loadTemplate(): void {
    isLoading.value = true;

    asyncSubscription.add(
        getTemplateUseCase.execute({
            limit: 100,
            page: 0,
            sort_by: "",
            template_name: ""
        }).pipe(
            finalize(() => isLoading.value = false)
        ).subscribe(
            {
                next: (getTemplateResp) => {
                    if (getTemplateResp.code === 200) {
                        templateList.value = getTemplateResp.result.data.content.template_list ?? [];
                    }
                }
            }
        )
    )
}

function setSelectedTemplate(id: string): void {
    selectedTemplateId.value = id;
}

function selectTemplate(): void {
    if (selectedTemplateId.value)
        emit("selected", selectedTemplate.value);
}
</script>