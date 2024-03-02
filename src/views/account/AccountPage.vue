<template>
    <div class="bg-white flex h-[78vh]">
        <div class="lg:w-96 w-full border-blue-50 border-r-2">
            <div class="p-4 border-blue-50 border-b-2 flex items-center justify-between">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mr-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                        <p class="block font-semibold text-xl"> {{ name }}</p>
                        <p class="block text-sm"> {{ email }}</p>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </div>
            <div class="bg-white text-gray-700 w-full py-4 px-2 space-y-2">
                <ul>
                    <li class="flex items-center py-3 px-4 hover:bg-sky-100 space-x-2 hover:rounded-xl group transition duration-0 font-semibold cursor-pointer" :class="{'text-blue-primary': isSelectedData('profil')}" @click="changeData('profil')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span class="text-lg" :class="isSelectedData('profil') ? 'text-blue-primary font-semibold' : 'group-hover:text-cyan-700 text-gray-700'">Personal Information</span>
                    </li>
                </ul>
                <ul>
                    <li class="flex items-center py-3 px-4 hover:bg-sky-100 space-x-2 hover:rounded-xl group transition duration-0 font-semibold cursor-pointer" :class="{'text-blue-primary': isSelectedData('history')}" @click="changeData('history')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 rotate-180">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span class="text-lg" :class="isSelectedData('history') ? 'text-blue-primary font-semibold' : 'group-hover:text-cyan-700 text-gray-700'">Login History</span>
                    </li>
                </ul>
                <ul>
                    <li class="flex items-center py-3 px-4 hover:bg-sky-100 space-x-2 hover:rounded-xl group transition duration-0 font-semibold cursor-pointer" :class="{'text-blue-primary': isSelectedData('security')}" @click="changeData('security')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        <span class="text-lg" :class="isSelectedData('security') ? 'text-blue-primary font-semibold' : 'group-hover:text-cyan-700 text-gray-700'">Security Setting</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-full">
            <section v-if="selectedData === 'history'" class="p-6 space-y-6">
                <h1 class="font-bold text-2xl leading-4 pb-4 pt-2">Login History</h1>
                
                <TableExpandComponent :table-header="tableHeader" :table-body="historyList" :search-criteria="searchCriteria"
                    class="mb-2" @table-changed="loadHistoryLog" :total-row="totalRow">
                </TableExpandComponent>
            </section>
            <section v-else-if="selectedData === 'security'" class="p-6 space-y-6">
                <h1 class="font-bold text-2xl leading-4 pb-4 pt-2">Security Setting</h1>

                <div class="space-y-2">
                    <p class="text-black font-semibold">Change Password</p>
                    <p class="text-gray-500">Set a unique password to protect your account.</p>
                </div>

                <div class="flex items-center justify-between">
                    <div>
                        <i class="text-gray-500">Last Changed: </i>
                        <i class="text-black">{{ lastChanged }}</i>
                    </div>

                    <ButtonBase class="!w-fit">Change Password</ButtonBase>
                </div>
            </section>
            <section v-else class="p-6 space-y-6">
                <h1 class="font-bold text-2xl leading-4 pb-4 pt-2">Personal Information</h1>
                
                <div>
                    <p class="text-gray-500 text-sm font-medium">Full Name</p>
                    <p class="text-black font-semibold">{{ name }}</p>
                </div>
                <hr />
                <div>
                    <p class="text-gray-500 text-sm font-medium">Email Address</p>
                    <p class="text-black font-semibold">{{ email }}</p>
                </div>
                <hr />
                <div>
                    <p class="text-gray-500 text-sm font-medium">Phone Number</p>
                    <p class="text-black font-semibold">{{ phone }}</p>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SearchCriteria, TableHeader } from '@/components/ComponentEntity';
import { useUserStore } from '@/stores/UserStore';
import { Ref, computed, inject, onUnmounted, ref } from 'vue';
import { LoginHistory } from "@/entity/user/LoginHistory";
import TableExpandComponent from '@/components/table/TableExpandComponent.vue';
import ButtonBase from '@/components/button/ButtonBase.vue';
import { Subscription, finalize } from 'rxjs';
import _default from 'vue-datepicker-next';
import { GetLoginHistoryUseCase } from '@/usecase/user/GetLoginHistoryUseCase';
import { NotificationManager } from '@/util/NotificationManager';

const userStore = useUserStore();
const name = computed(() => userStore.name);
const email = computed(() => userStore.email);
const phone = computed(() => userStore.phone);

const tableHeader: TableHeader[] = [
    {
        key: "date",
        name: "Date",
        isSortable: true
    },
    {
        key: "login_ip",
        name: "Login IP",
        isSortable: true
    },
    {
        key: "browser",
        name: "Browser",
        isSortable: true
    },
];
const historyList: Ref<LoginHistory[]> = ref([]);
const searchCriteria: Ref<SearchCriteria> = ref({
    page: 1,
    rowPerPage: 10,
    sortKey: "",
    sortOrder: ""
});

const asyncSubscription: Subscription = new Subscription();

const isLoading = ref(false);
const totalRow: Ref<number> = ref(0);
const lastChanged = ref("Oct 28, 2022");

const selectedData = ref("profil");

const getLoginHistoryUseCase: GetLoginHistoryUseCase = inject("getLoginHistoryUseCase")!;

function isSelectedData(data: string): boolean {
    return selectedData.value === data;
}

function changeData(data: string): void {
    selectedData.value = data;

    if (selectedData.value === "history") {
        loadHistoryLog();
    } else {
        searchCriteria.value = {
            page: 1,
            rowPerPage: 10,
            sortKey: "",
            sortOrder: ""
        };
    }
}

function loadHistoryLog(): void {
    isLoading.value = true;

    asyncSubscription.add(
        getLoginHistoryUseCase.execute({
            browser: "",
            date: "",
            limit: searchCriteria.value.rowPerPage,
            login_ip: "",
            page: searchCriteria.value.page - 1,
            sort_by: searchCriteria.value.sortKey.length > 0 ? `${searchCriteria.value.sortKey},${searchCriteria.value.sortOrder}` : "",
            user_id: "a28032d0-e17c-4d36-94d1-7b40f7470ae8" // TODO: jangan dihardcode
        }).pipe(
            finalize(() => isLoading.value = false)
        ).subscribe(
            {
                next: (getTemplateResp) => {
                    if (getTemplateResp.code === 200) {
                        historyList.value = getTemplateResp.result.data.content.user_list ?? [];
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
    )
}

onUnmounted(() => {
    asyncSubscription.unsubscribe();
})
</script>