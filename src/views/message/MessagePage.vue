<template>
    <div class="absolute -top-2 right-0 my-6 mx-8">
        <div class="flex space-x-4">
            <Search @enter="loadTemplate($event)" />
            <ButtonBase class="flex !w-fit" @click="redirectToCreate">
                <img src="../../assets/icon-create.svg" alt="Create">
                <span class="ml-2">Add Message</span>
            </ButtonBase>
        </div>
    </div>
    <div>
        <TableExpandComponent :is-loading="isLoading" class="mb-2" :table-header="tableHeader" :table-body="templateList" :search-criteria="searchCriteria"
            :total-row="totalRow" @table-changed="loadTemplate">
            <template #name="{slotProps}">
                <div class="p-2">
                    {{ slotProps.template_name }}
                </div>
            </template>
            <template #createdAt="{slotProps}">
                <div class="p-2">
                    {{ convertCreatedAt(slotProps.created_at) }}
                </div>
            </template>
            <template #action="{slotProps}">
                <div class="flex items-center space-x-4" v-if="slotProps.is_deleted !== null && slotProps.is_deleted === false">
                    <img src="../../assets/preview.svg" title="Preview" alt="Preview" class="cursor-pointer" @click="previewMessage(slotProps.template_id)" />
                    <img src="../../assets/update.svg" title="Update" alt="Update" class="cursor-pointer" @click="redirectToUpdate(slotProps.template_id)" />
                    <img src="../../assets/trash.svg" title="Delete" alt="Delete" class="cursor-pointer" @click="deleteTemplate(slotProps.template_id)" />
                </div>
            </template>
        </TableExpandComponent>
    </div>

    <ModalComponent v-if="selectedTemplateId.length > 0" @close="selectedTemplateId=''">
        <DetailMessageTemplate :template-id="selectedTemplateId"></DetailMessageTemplate>
    </ModalComponent>
</template>

<script setup lang="ts">
import DetailMessageTemplate from "./DetailMessageTemplate.vue";
import ButtonBase from '@/components/button/ButtonBase.vue';
import TableExpandComponent from '@/components/table/TableExpandComponent.vue';
import router from "@/router";
import { inject, onMounted, onUnmounted, ref, type Ref } from 'vue';
import { SearchCriteria, TableHeader } from '@/components/ComponentEntity';
import { TemplateMessage } from "@/entity/message/TemplateMessage";
import Search from '@/components/search/Search.vue';
import {finalize, Subscription} from 'rxjs';
import { GetTemplateUseCase } from '@/usecase/template/GetTemplateUseCase';
import { DateConverter } from '@/util/DateConverter';
import ModalComponent from '@/components/modal/ModalComponent.vue';
import { NotificationManager } from "@/util/NotificationManager";
import { DeleteTemplateUseCase } from "@/usecase/template/DeleteTemplateUseCase";

const asyncSubscription: Subscription = new Subscription();
const selectedTemplateId = ref("");

const getTemplateUseCase: GetTemplateUseCase = inject("getTemplateUseCase")!;
const deleteTemplateUseCase: DeleteTemplateUseCase = inject("deleteTemplateUseCase")!;

function redirectToCreate(): void {
    router.push("/message/create");
}

const templateList: Ref<TemplateMessage[]> = ref([]);

const searchCriteria: Ref<SearchCriteria> = ref({
    page: 1,
    rowPerPage: 10,
    sortKey: "",
    sortOrder: "asc"
});

const isLoading = ref(false);
const totalRow: Ref<number> = ref(0);

const tableHeader: Ref<TableHeader[]> = ref([
    {
        key: "name",
        name: "Name",
        isSortable: true
    },
    {
        key: "createdAt",
        name: "Created At",
        isSortable: true
    },
    {
        key: "action",
        name: "Action",
        isSortable: false
    },
] as TableHeader[]);

function previewMessage(messageId: string): void {
    selectedTemplateId.value = messageId;
}

function redirectToUpdate(messageId: string): void {
    router.push(`/message/${messageId}`);
}

function deleteTemplate(messageId: string): void {
    asyncSubscription.add(
        deleteTemplateUseCase.execute({
            template_id: messageId
        }).subscribe(
            {
                next: (resp) => {
                    if (resp.code === 200) {
                        NotificationManager.showMessage("Success to Delete Data", "");
                        searchCriteria.value.page = 1;
                        loadTemplate("");
                    } else {
                        const message = resp.result?.message ?? resp.message;
                        NotificationManager.showMessage("Failed to Delete Data", message, "error");
                    }
                },
                error: (error) => {
                    NotificationManager.showMessage("Network Error", error, "error");
                }
            }
        )
    )
}

function convertCreatedAt(date: string): string {
    return DateConverter.convertDateObjectToDateString(new Date(date));
}

onMounted(() => {
    loadTemplate("");
})

onUnmounted(() => {
    asyncSubscription.unsubscribe();
})

function loadTemplate(template_name = ""): void {
    isLoading.value = true;

    asyncSubscription.add(
        getTemplateUseCase.execute({
            limit: searchCriteria.value.rowPerPage,
            page: searchCriteria.value.page-1,
            sort_by: searchCriteria.value.sortKey.length > 0 ? `${searchCriteria.value.sortKey},${searchCriteria.value.sortOrder}` : "",
            template_name
        }).pipe(
            finalize(() => isLoading.value = false)
        ).subscribe(
            {
                next: (getTemplateResp) => {
                    if (getTemplateResp.code === 200) {
                        templateList.value = getTemplateResp.result.data.content.template_list ?? [];
                        totalRow.value = getTemplateResp.result.data.total_elements ?? 0;
                    } else {
                        const message = getTemplateResp.result?.message ?? getTemplateResp.message;
                        NotificationManager.showMessage("Failed to Load Data", message, "error");
                    }
                },
                error: (error) => {
                    NotificationManager.showMessage("Network Error", error, "error");
                }
            }
        )
    );
}
</script>