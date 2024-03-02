<template>
    <div class="absolute -top-2 right-0 my-6 mx-8">
        <div class="flex space-x-4">
            <Search @enter="searchAudience" />
        </div>
    </div>
    <div>
        <TableExpandComponent class="mb-2" :table-header="tableHeader" :table-body="audiensList" :search-criteria="searchCriteria" :total-row="totalRow">
            <template #audience_name="{slotProps}">
                <div class="p-2 flex space-x-2 items-center">
                    <img :src="slotProps.audience_photo" :alt="`Picture of ${slotProps.audience_name}`" @error="handleImageError">
                    <p>{{ slotProps.audience_name }}</p>
                </div>
            </template>
        </TableExpandComponent>
    </div>
</template>

<script setup lang="ts">
import TableExpandComponent from '@/components/table/TableExpandComponent.vue';
import { inject, onMounted, onUnmounted, ref, type Ref } from 'vue';
import { Audience } from "@/entity/audience/Audience";
import { SearchCriteria, TableHeader } from '@/components/ComponentEntity';
import Search from '@/components/search/Search.vue';
import { GetAudienceUseCase } from '@/usecase/audience/GetAudienceUseCase';
import { finalize, Subscription } from 'rxjs';
import { NotificationManager } from '@/util/NotificationManager';

const asyncSubscription: Subscription = new Subscription();

const audiensList: Ref<Audience[]> = ref([]);

const searchCriteria: Ref<SearchCriteria> = ref({
    page: 1,
    rowPerPage: 10,
    sortKey: "audience_name",
    sortOrder: "asc"
});

const totalRow: Ref<number> = ref(2);
const tableHeader: Ref<TableHeader[]> = ref([
    {
        key: "audience_name",
        name: "Audience List",
        isSortable: true
    },
    {
        key: "tag",
        name: "Tag",
        isSortable: true
    },
    {
        key: "created_at",
        name: "Created At",
        isSortable: true
    }
] as TableHeader[]);

const isLoading = ref(false);

const getAudienceUseCase: GetAudienceUseCase = inject("getAudienceUseCase")!;

onMounted(() => {
    loadData();
})

function loadData(audience_name=""): void {
    isLoading.value = true;

    asyncSubscription.add(
        getAudienceUseCase.execute({
            audience_name,
            limit: searchCriteria.value.rowPerPage,
            page: searchCriteria.value.page - 1,
            page_id: "",
            page_name: "",
            sort_by: searchCriteria.value.sortKey.length > 0 ? `${searchCriteria.value.sortKey},${searchCriteria.value.sortOrder}` : "",
        }).pipe(
            finalize(() => isLoading.value = false)
        ).subscribe(
            {
                next: (getAudienceResp) => {
                    if (getAudienceResp.code === 200) {
                        audiensList.value = getAudienceResp.result.data.content.audience_list ?? [];
                        totalRow.value = getAudienceResp.result.data.total_elements ?? 0;
                    } else {
                        const message = getAudienceResp.result?.message ?? getAudienceResp.message;
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

function handleImageError(event: Event): void {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = "https://http.cat/images/415.jpg";
    imageElement.width = 100;
    imageElement.height = 100;
}

onUnmounted(() => {
    asyncSubscription.unsubscribe();
})

function searchAudience(audience: string): void {
    loadData(audience);
}
</script>