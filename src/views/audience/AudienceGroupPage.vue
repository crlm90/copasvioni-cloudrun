<template>
    <div class="absolute -top-2 right-0 my-6 mx-8">
        <div class="flex space-x-4">
            <Search @enter="loadData($event)" />
            <ButtonBase class="flex !w-fit" @click="redirectToCreate">
                <img src="../../assets/icon-create.svg" alt="Create">
                <span class="ml-2">Add Category</span>
            </ButtonBase>
        </div>
    </div>
    <div>
        <TableExpandComponent class="mb-2" :table-header="tableHeader" :table-body="groupList" :search-criteria="searchCriteria" :total-row="totalRow">
            <template #group_name="{slotProps}">
                <div class="p-2">
                    {{ slotProps.group_name }}
                </div>
            </template>
            <template #action="{slotProps}">
                <div class="flex items-center space-x-4">
                    <img src="../../assets/preview.svg" title="Preview" alt="Preview" class="cursor-pointer" @click="previewGroup(slotProps.group_id)" />
                    <img src="../../assets/trash.svg" title="Delete" alt="Delete" class="cursor-pointer" @click="deleteGroup(slotProps.group_id)" />
                    <img src="../../assets/update.svg" title="Update" alt="Update" class="cursor-pointer" @click="redirectToUpdateGroup(slotProps.group_id)" />
                </div>
            </template>
        </TableExpandComponent>
    </div>

    <ModalComponent v-if="isPopupGroupOpen" @close="isPopupGroupOpen=false" :custom-class="'!max-w-xl'">
        <PopupAudienceGroup @cancel="isPopupGroupOpen=false" @success="onSuccessAddGroup" :type="typePopup" :group_id="group_id">
        </PopupAudienceGroup>
    </ModalComponent>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/button/ButtonBase.vue';
import TableExpandComponent from '@/components/table/TableExpandComponent.vue';
import { inject, onMounted, onUnmounted, ref, type Ref } from 'vue';
import { SearchCriteria, TableHeader } from '@/components/ComponentEntity';
import Search from '@/components/search/Search.vue';
import { Group } from '@/entity/audience/Group';
import { GetGroupUseCase } from '@/usecase/audience/GetGroupUseCase';
import { finalize, Subscription } from 'rxjs';
import { NotificationManager } from '@/util/NotificationManager';
import PopupAudienceGroup from './PopupAudienceGroup.vue';
import ModalComponent from '@/components/modal/ModalComponent.vue';
import { DeleteGroupUseCase } from '@/usecase/audience/DeleteGroupUseCase';

const asyncSubscription: Subscription = new Subscription();

function redirectToCreate(): void {
    group_id.value = "";
    typePopup.value = "create";

    isPopupGroupOpen.value = true;
}

const groupList: Ref<Group[]> = ref([]);

const searchCriteria: Ref<SearchCriteria> = ref({
    page: 1,
    rowPerPage: 10,
    sortKey: "group_name",
    sortOrder: "asc"
});

const totalRow: Ref<number> = ref(2);
const tableHeader: Ref<TableHeader[]> = ref([
    {
        key: "group_name",
        name: "Category",
        isSortable: true
    },
    {
        key: "group_color_hex",
        name: "Tag Color",
        isSortable: true
    },
    {
        key: "created_at",
        name: "Created At",
        isSortable: true
    },
    {
        key: "action",
        name: "Action",
        isSortable: false
    },
] as TableHeader[]);

function previewGroup(accId: string): void {
    group_id.value = accId;
    typePopup.value = "display";

    isPopupGroupOpen.value = true;
}

function redirectToUpdateGroup(accId: string): void {
    group_id.value = accId;
    typePopup.value = "update";

    isPopupGroupOpen.value = true;
}

function deleteGroup(groupId: string): void {
    isLoading.value = true;

    asyncSubscription.add(
        deleteGroupUseCase.execute({ groupId })
            .subscribe(
                {
                    next: (baseResp) => {
                        if (baseResp.code === 200) {
                            loadData();
                        } else {
                            const message = baseResp.result?.message ?? baseResp.message;
                            NotificationManager.showMessage("Failed to Load Data", message, "error");

                            isLoading.value = false;
                        }
                    },
                    error: (error) => {
                        NotificationManager.showMessage("Network Error", error, "error");
                        isLoading.value = false;
                    }
                }
            )
    )
}

const group_id = ref("");
const typePopup = ref("");

const isLoading = ref(false);
const isPopupGroupOpen = ref(false);

const getGroupUseCase: GetGroupUseCase = inject("getGroupUseCase")!;
const deleteGroupUseCase: DeleteGroupUseCase = inject("deleteGroupUseCase")!;

onMounted(() => {
    loadData();
})

function loadData(group_name=""): void {
    isLoading.value = true;

    asyncSubscription.add(
        getGroupUseCase.execute({
            group_name,
            limit: searchCriteria.value.rowPerPage,
            page: searchCriteria.value.page - 1,
            page_id: "",
            page_name: "",
            sort_by: searchCriteria.value.sortKey.length > 0 ? `${searchCriteria.value.sortKey},${searchCriteria.value.sortOrder}` : "",
        }).pipe(
            finalize(() => isLoading.value = false)
        ).subscribe(
            {
                next: (getGroupResp) => {
                    if (getGroupResp.code === 200) {
                        groupList.value = getGroupResp.result.data.content.group_list ?? [];
                        totalRow.value = getGroupResp.result.data.total_elements ?? 0;
                    } else {
                        const message = getGroupResp.result?.message ?? getGroupResp.message;
                        NotificationManager.showMessage("Failed to Load Data", message, "error");
                    }
                },
                error: (error) => {
                    NotificationManager.showMessage("Network Error", error, "error");
                }
            }
        )
    )
}

onUnmounted(() => {
    asyncSubscription.unsubscribe();
})

function onSuccessAddGroup(): void {
    group_id.value = "";
    typePopup.value = "";

    isPopupGroupOpen.value = false;
    
    loadData();
}
</script>