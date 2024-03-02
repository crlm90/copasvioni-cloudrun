<template>
    <div class="absolute -top-2 right-0 my-6 mx-8">
        <div class="flex space-x-4">
            <Search @enter="loadCampaign($event)" />
            <ButtonBase class="flex !w-fit" @click="redirectToCreate">
                <img src="../../assets/icon-create.svg" alt="Create">
                <span class="ml-2">Create</span>
            </ButtonBase>
        </div>
    </div>
    <div>
        <TableExpandComponent class="mb-2" :table-header="tableHeader" :table-body="campaignList" :search-criteria="searchCriteria" :total-row="totalRow" :is-loading="isLoading">
            <template #name="{slotProps}">
                <div class="flex items-center space-x-2 p-2">
                    <svg @click="slotProps.isExpanded = !slotProps.isExpanded" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 transform transition-all cursor-pointer" :class="slotProps.isExpanded ? 'rotate-90' : ''">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    <span>{{ slotProps.campaign_name }}</span>
                </div>
            </template>
            <template #status="{slotProps}">
                <div class="p-2" :class="{'text-amber-500': slotProps.campaign_status === STATUS_PENDING, 'text-green-500': slotProps.campaign_status === STATUS_DONE}">
                    {{ slotProps.campaign_status }}
                </div>
            </template>
            <template #action="{slotProps}">
                <div class="flex items-center space-x-4" v-if="slotProps.is_deleted !== null && slotProps.is_deleted === false">
                    <img src="../../assets/manual-trigger.svg" title="Manual Trigger" alt="Manual Trigger" class="cursor-pointer" @click="manualTriggerCampaign(slotProps.campaign_id)" />
                    <img src="../../assets/update.svg" title="Update" alt="Update" class="cursor-pointer" @click="redirectToUpdateCampaign(slotProps.campaign_id)" />
                    <img src="../../assets/trash.svg" title="Delete" alt="Delete" class="cursor-pointer" @click="deleteCampaign(slotProps.campaign_id)" />
                </div>
            </template>
            <template #campaign_date="{slotProps}">
                <p v-if="slotProps.campaign">{{ slotProps.campaign_date }}</p>
                <p v-else>Not Scheduled</p>
            </template>
            <template #expand="{slotProps}">
                <div class="bg-blue-100 p-2 pl-8 mx-2">
                    <div class="grid grid-cols-6 auto-cols-fr text-sm gap-y-1">
                        <p>Success</p>
                        <p class="col-span-5">{{ slotProps.success_amount }}</p>
                        <p>Failed</p>
                        <p class="col-span-5">{{ slotProps.failed_amount }}</p>
                        <p>Created at</p>
                        <p class="col-span-5">{{ slotProps.created_at }}</p>
                        <p>Delivered(%)</p>
                        <p class="col-span-5">{{ slotProps.success_amount }}/{{ slotProps.total_amount }} ({{ percentageDeliver(slotProps) }})</p>
                    </div>
                </div>
            </template>
        </TableExpandComponent>
    </div>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/button/ButtonBase.vue';
import TableExpandComponent from '@/components/table/TableExpandComponent.vue';
import Search from '@/components/search/Search.vue';
import router from "@/router";
import { inject, onMounted, ref, type Ref } from 'vue';
import { Campaign } from "@/entity/campaign/Campaign";
import { SearchCriteria, TableHeader } from '@/components/ComponentEntity';
import { finalize, Subscription } from 'rxjs';
import { GetCampaignUseCase } from '@/usecase/campaign/GetCampaignUseCase';
import { NotificationManager } from '@/util/NotificationManager';
import { DeleteCampaignUseCase } from '@/usecase/campaign/DeleteCampaignUseCase';

const asyncSubscription: Subscription = new Subscription();

const STATUS_PENDING = "Pending";
const STATUS_DONE = "Done";

function redirectToCreate(): void {
    router.push("/campaign/create");
}

const campaignList: Ref<Campaign[]> = ref([]);

const searchCriteria: Ref<SearchCriteria> = ref({
    page: 1,
    rowPerPage: 10,
    sortKey: "name",
    sortOrder: "asc"
});

const totalRow: Ref<number> = ref(2);
const isLoading = ref(false);

const tableHeader: Ref<TableHeader[]> = ref([
    {
        key: "name",
        name: "Name",
        isSortable: true
    },
    {
        key: "page_name",
        name: "Page Name",
        isSortable: true
    },
    {
        key: "status",
        name: "Status",
        isSortable: true
    },
    {
        key: "campaign_date",
        name: "Scheduled",
        isSortable: false
    },
    {
        key: "action",
        name: "Action",
        isSortable: false
    },
] as TableHeader[]);

const getCampaignUseCase: GetCampaignUseCase = inject("getCampaignUseCase")!;
const deleteCampaignUseCase: DeleteCampaignUseCase = inject("deleteCampaignUseCase")!;

function manualTriggerCampaign(campaignId: string): void {
    console.log("manual trigger campaign", campaignId);
}

function redirectToUpdateCampaign(campaignId: string): void {
    router.push(`/campaign/${campaignId}`);
}

function deleteCampaign(campaign_id: string): void {
    asyncSubscription.add(
        deleteCampaignUseCase.execute({
            campaign_id
        }).subscribe(
            {
                next: (resp) => {
                    if (resp.code === 200) {
                        NotificationManager.showMessage("Success to Delete Data", "");
                        searchCriteria.value.page = 1;
                        loadCampaign("");
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

function percentageDeliver(data: Campaign): string {
    if (data.total_amount > 0) {
        return `${(data.success_amount / data.total_amount) * 100} %`;
    }
    return "0%"
}

onMounted(() => {
    loadCampaign();
})

function loadCampaign(campaign_name="", page_name=""): void {
    isLoading.value = true;

    asyncSubscription.add(
        getCampaignUseCase.execute({
            limit: searchCriteria.value.rowPerPage,
            page: searchCriteria.value.page-1,
            sort_by: searchCriteria.value.sortKey.length > 0 ? `${searchCriteria.value.sortKey},${searchCriteria.value.sortOrder}` : "",
            campaign_name,
            page_name
        }).pipe(
            finalize(() => isLoading.value = false)
        ).subscribe(
            {
                next: (getCampaignResp) => {
                    if (getCampaignResp.code === 200) {
                        campaignList.value = getCampaignResp.result.data.content.campaign_list ?? [];
                        totalRow.value = getCampaignResp.result.data.total_elements ?? 0;
                    } else {
                        const message = getCampaignResp.result?.message ?? getCampaignResp.message;
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
</script>