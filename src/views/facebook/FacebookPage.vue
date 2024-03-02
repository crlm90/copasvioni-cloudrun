<template>
    <div class="absolute -top-2 right-0 my-6 mx-8">
        <div class="flex space-x-4">
            <Search />
            <ButtonBase class="flex !w-fit">
                <img src="../../assets/icon-create.svg" alt="Create">
                <span class="ml-2">Add Account</span>
            </ButtonBase>
        </div>
    </div>
    <div>
        <TableExpandComponent class="mb-2" :table-header="tableHeader" :table-body="linkedList" :search-criteria="searchCriteria" :total-row="totalRow">
            <template #name="{slotProps}">
                <div class="p-2">
                    {{ slotProps.facebook_linked_name }}
                </div>
            </template>
            <template #action="{slotProps}">
                <div class="flex items-center space-x-4" v-if="slotProps.is_deleted !== null && slotProps.is_deleted === false">
                    <img src="../../assets/preview.svg" title="Preview" alt="Preview" class="cursor-pointer" @click="previewAccount(slotProps.accountId)" />
                    <img src="../../assets/trash.svg" title="Delete" alt="Delete" class="cursor-pointer" @click="deleteAccount(slotProps.accountId)" />
                    <img src="../../assets/update.svg" title="Update" alt="Update" class="cursor-pointer" @click="redirectToUpdateAccount(slotProps.accountId)" />
                    <div class="w-5 h-5 bg-emerald-400 rounded-full flex justify-center items-center cursor-pointer ">
                        <img src="../../assets/sync.svg" title="Sync" alt="Sync" class="w-3 rotate-90" @click="syncAccount(slotProps.accountId)" />
                    </div>
                </div>
            </template>
        </TableExpandComponent>
    </div>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/button/ButtonBase.vue';
import TableExpandComponent from '@/components/table/TableExpandComponent.vue';
import router from "@/router";
import { inject, onMounted, ref, type Ref } from 'vue';
import { SearchCriteria, TableHeader } from '@/components/ComponentEntity';
import Search from '@/components/search/Search.vue';
import { FacebookLinked } from '@/entity/facebook/FacebookLinked';
import { GetFacebookLinkedUseCase } from '@/usecase/facebook/GetFacebookLinkedUseCase';
import { finalize, Subscription } from 'rxjs';
import { NotificationManager } from '@/util/NotificationManager';

const asyncSubscription: Subscription = new Subscription();

const searchCriteria: Ref<SearchCriteria> = ref({
    page: 1,
    rowPerPage: 10,
    sortKey: "name",
    sortOrder: "asc"
});

const tableHeader: Ref<TableHeader[]> = ref([
    {
        key: "name",
        name: "Account Name",
        isSortable: true
    },
    {
        key: "totalPageConnect",
        name: "Page Connect",
        isSortable: true
    },
    {
        key: "created_at",
        name: "Added",
        isSortable: true
    },
    {
        key: "action",
        name: "Action",
        isSortable: false
    },
] as TableHeader[]);
const linkedList: Ref<FacebookLinked[]> = ref([]);
const totalRow: Ref<number> = ref(2);

const isLoading = ref(false);

const getFacebookLinkedUseCase: GetFacebookLinkedUseCase = inject("getFacebookLinkedUseCase")!;

function loadData(name=""): void {
    isLoading.value = true;

    asyncSubscription.add(
        getFacebookLinkedUseCase.execute({
            facebook_linked_name: name,
            limit: searchCriteria.value.rowPerPage,
            page: searchCriteria.value.page-1,
            sort_by: searchCriteria.value.sortKey.length > 0 ? `${searchCriteria.value.sortKey},${searchCriteria.value.sortOrder}` : "",
        }).pipe(
            finalize(() => isLoading.value = false)
        ).subscribe(
            {
                next: (getFacebookResp) => {
                    if (getFacebookResp.code === 200) {
                        linkedList.value = getFacebookResp.result.data.content.facebook_linked_list ?? [];
                        totalRow.value = getFacebookResp.result.data.total_elements ?? 0;
                    } else {
                        const message = getFacebookResp.result?.message ?? getFacebookResp.message;
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

onMounted(() => {
    loadData();
})

function previewAccount(accId: string): void {
    console.log("preview account", accId);
}

function redirectToUpdateAccount(accId: string): void {
    console.log("update", accId);
}

function deleteAccount(accId: string): void {
    console.log("delete", accId);
}

function syncAccount(accId: string): void {
    console.log("sync", accId);
}
</script>