<template>
    <div v-if="isLoading">
        <div class="grid grid-cols-3 gap-x-8 p-2 px-4 rounded-t-lg bg-blue-100">
            <div class="rounded-tl-lg">
                <div class="h-6 w-1/4 bg-gray-300 my-3 rounded animate-pulse"></div>
            </div>
            <div>
                <div class="h-6 w-1/4 bg-gray-300 my-3 rounded animate-pulse"></div>
            </div>
            <div class="rounded-tr-lg">
                <div class="h-6 w-1/4 bg-gray-300 my-3 rounded animate-pulse"></div>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-x-8 p-2 px-4 rounded-b-lg bg-white">
            <div class="rounded-bl-lg">
                <div class="h-4 w-3/5 bg-gray-300 my-3 rounded animate-pulse"></div>
            </div>
            <div>
                <div class="h-4 w-3/5 bg-gray-300 my-3 rounded animate-pulse"></div>
            </div>
            <div class="rounded-br-lg">
                <div class="h-4 w-3/5 bg-gray-300 my-3 rounded animate-pulse"></div>
            </div>
        </div>
    </div>

    <div v-else class="overflow-x-auto">
        <table class="w-full pt-8 items-center justify-center">
            <!-- <div class="overflow-x-auto"> -->
                <thead class="bg-blue-100 w-full">
                    <tr class="text-blue-primary text-left rounded">
                        <!-- <th class="py-3 pl-4 w-3 rounded-tl-lg"><input type="checkbox" name="" id=""></th> -->
                        <th class="p-3" :class="{ 'rounded-tr-lg' : tableHeader.length - 1 === index, 'rounded-tl-lg': index === 0 }" v-for="(head, index) in tableHeader" :key="head.key">
                            <div class="flex justify-between" @click="changeSort(head.key)">
                                <span>{{ head.name }}</span>
                                <template v-if="head.isSortable">
                                    <img v-if="searchCriteria.sortKey === head.key && searchCriteria.sortOrder === 'asc'" src="../../assets/sort-asc.svg" alt="sort_asc">
                                    <img v-else-if="searchCriteria.sortKey === head.key && searchCriteria.sortOrder === 'dsc'" src="../../assets/sort-dsc.svg" alt="sort_dsc">
                                    <img v-else src="../../assets/sort.svg" alt="sort">
                                </template>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-for="(body, index) in tableBody" :key="index" class="bg-white shadow-inner !w-full">
                    <tr class="w-full">
                        <td class="p-2 w-fit" v-for="(head, j) in tableHeader" :key="`${index}-${j}`"
                            :class="{ 'rounded-br-lg': tableHeader.length-1 === j && !body.isExpanded, 'rounded-bl-lg': j === 0 }">
                            <slot :name="head.key" :slot-props="body">{{ body[head.key] }}</slot>
                        </td>
                    </tr>
                    <tr v-if="body.isExpanded" class="w-full">
                        <td :colspan="tableHeader.length + 1" class="p-2 pb-4 rounded-b-lg">
                            <slot name="expand" :slot-props="body" class="bg-blue-100" />
                        </td>
                    </tr>
                </tbody>
            <!-- </div> -->
            <tbody class="bg-white shadow-inner" v-if="tableBody.length < 1">
                <tr>
                    <td :colspan="tableHeader.length + 1" class="p-4 py-12 text-center rounded-b-lg">No data available</td>
                </tr>
            </tbody>
            <tbody class="bg-white shadow-inner" v-else>
                <tr>
                    <td :colspan="tableHeader.length + 1" class="p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex">
                                <button class="rounded-l-lg border px-2 py-1" @click="changePage('prev')">Prev</button>
                                <button v-for="(page, index) in shownPage" class="border-y border-r px-2 py-1" @click="changePage(page)"
                                    :class="{'border-r-0': index === shownPage.length-1, 'cursor-default': page === '...', 'font-bold': page === props.searchCriteria.page.toString()}">{{ page }}</button>
                                <button class="rounded-r-lg border px-2 py-1" @click="changePage('next')">Next</button>
                            </div>
                            <div class="flex items-center space-x-2">
                                <p>Rows per page: </p>
                                <SelectComponent id="row-per-page" :optionList="rowPerPage" :selected="props.searchCriteria.rowPerPage" @change="changeRowPerPage($event)"></SelectComponent>
                                <p>of {{ totalRow }} data</p>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SelectComponent from "../select/SelectComponent.vue";
import { OptionEntity } from '../ComponentEntity';

const emit = defineEmits(["table-changed"])
const props = defineProps(["tableHeader", "tableBody", "searchCriteria", "totalRow", "isLoading"])
const totalPage = computed(() => {
    if (!props.totalRow || props.totalRow < 1) {
        return 1;
    }
    return Math.ceil(props.totalRow / props.searchCriteria.rowPerPage);
});

function changeSort(sortKey: string): void {
    let tempSortOrder = "asc";
    if (sortKey === props.searchCriteria.sortKey) {
        if (props.searchCriteria.sortOrder === "asc") tempSortOrder = "dsc";
        else if (props.searchCriteria.sortOrder === "") tempSortOrder = "asc";
        else {
            tempSortOrder = "";
        }
    }

    props.searchCriteria.sortOrder = tempSortOrder;
    props.searchCriteria.sortKey = tempSortOrder.length > 0 ? sortKey : "";

    emit("table-changed");
}

const rowPerPage: OptionEntity[] = [
    {
        key: "10",
        value: "10"
    },
    {
        key: "25",
        value: "25"
    },
    {
        key: "50",
        value: "50"
    },
    {
        key: "100",
        value: "100"
    }
];

const selectedPage = computed(() => props.searchCriteria.page);

function changePage(page: string): void {
    if (page !== "...") {
        if (page === "prev") {
            if (selectedPage.value - 1 > 0)
                props.searchCriteria.page = props.searchCriteria.page - 1;
        }
        else if (page === "next") {
            if (selectedPage.value + 1 < totalPage.value)
                props.searchCriteria.page = props.searchCriteria.page + 1;
        }
        else
            props.searchCriteria.page = parseInt(page);

        emit("table-changed");
    }
        
}

function changeRowPerPage(op: OptionEntity): void {
    props.searchCriteria.rowPerPage = parseInt(op.key);
    emit("table-changed");
}

const shownPage = computed(() => {
    const list: string[] = [];
    if (totalPage.value > 5) {
        if (props.searchCriteria.page === 1 || props.searchCriteria.page === totalPage.value) {
            list.push("1", "2", "...", (totalPage.value-1).toString(), totalPage.value.toString());
        } else {
            list.push("1");
            if ((props.searchCriteria.page-1) > 2) list.push("...");
            if ((props.searchCriteria.page-1) !== 1) list.push((props.searchCriteria.page-1).toString());
            list.push(props.searchCriteria.page.toString());
            if ((props.searchCriteria.page+1) <= totalPage.value-1) list.push((props.searchCriteria.page+1).toString());
            if ((props.searchCriteria.page+2) < totalPage.value) list.push("...");
            list.push(totalPage.value.toString());
        }
    } else {
        for (let i = 1; i <= totalPage.value; i++) {
            list.push(i.toString());
        }
    }

    return list;
})
</script>