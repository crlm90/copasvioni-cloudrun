<template>
    <h1 class="font-bold text-3xl pt-2 pb-4 px-4">
        {{ title }}
    </h1>
    <hr class="w-full" />
    <div class="pt-4 pb-2 space-y-4 px-4">
        <InputText :disabled="props.type === 'display'" :value="groupName" label-for="group-name" label-text="Group Name"
            placeholder="Group Name Goes Here" @type="setGroupName" :validation="groupNameValidation" />
        <div class="space-y-1">
            <label for="page" class="font-semibold text-base">Page</label>
            <InputDropdown :placeholder="'Select page'" :selected="selectedPage" :disabled="props.type === 'display'"
                :id="'page'" @change="onChangePage($event.key)" :option-list="pageOptionList" :validation="pageValidation">
            </InputDropdown>
        </div>
        <div class="space-y-1">
            <label for="audience" class="font-semibold text-base">Audience</label>
            <Multiselect :options="audienceList" mode="tags" v-model="selectedAudience" placeholder="Select audience" :disabled="selectedPage.length < 1 || props.type === 'display'"
                :class="[selectedPage.length < 1 || props.type === 'display' ? '!cursor-not-allowed' : '!cursor-pointer', audienceValidation.length > 0 ? 'border-red-500' : '']"
                :classes="{
                    container: 'relative mx-auto w-full flex items-center justify-end box-border border border-gray-300 rounded-lg bg-white text-base leading-snug outline-none py-1',
                    containerDisabled: 'cursor-not-allowed bg-gray-100 opacity-50',
                    containerOpen: 'rounded-b-none',
                    containerOpenTop: 'rounded-t-none',
                    wrapper: 'relative mx-auto w-full flex items-center justify-end box-border outline-none',
                    singleLabel: 'flex items-center h-full max-w-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 pr-16 box-border rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
                    singleLabelText: 'overflow-ellipsis overflow-hidden block whitespace-nowrap max-w-full',
                    multipleLabel: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
                    search: 'w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 text-base font-sans bg-white rounded pl-3.5 rtl:pl-0 rtl:pr-3.5',
                    tags: 'flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 min-w-0 rtl:pl-0 rtl:pr-2',
                    tag: 'bg-blue-500 text-white text-sm font-semibold py-1 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
                    tagDisabled: 'pr-2 opacity-50 rtl:pl-2',
                    tagWrapper: 'whitespace-nowrap overflow-hidden overflow-ellipsis',
                    tagWrapperBreak: 'whitespace-normal break-all',
                    tagRemove: 'flex items-center justify-center p-1 mx-0.5 rounded-sm hover:bg-black hover:bg-opacity-10 group',
                    tagRemoveIcon: 'bg-multiselect-remove bg-center bg-no-repeat opacity-30 inline-block w-3 h-3 group-hover:opacity-60',
                    tagsSearchWrapper: 'inline-block relative mx-1 mb-1 flex-grow flex-shrink h-full',
                    tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full',
                    tagsSearchCopy: 'invisible whitespace-pre-wrap inline-block h-px',
                    placeholder: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
                    caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative z-10 opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
                    caretOpen: 'rotate-180 pointer-events-auto',
                    clear: 'pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80 rtl:pr-0 rtl:pl-3.5',
                    clearIcon: 'bg-multiselect-remove bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block',
                    spinner: 'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 mr-3.5 animate-spin flex-shrink-0 flex-grow-0 rtl:mr-0 rtl:ml-3.5',
                    infinite: 'flex items-center justify-center w-full',
                    infiniteSpinner: 'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 animate-spin flex-shrink-0 flex-grow-0 m-3.5',
                    dropdown: 'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                    options: 'flex flex-col p-0 m-0 list-none',
                    optionsTop: '',
                    group: 'p-0 m-0',
                    groupLabel: 'flex text-sm box-border items-center justify-start text-left py-1 px-3 font-semibold bg-gray-200 cursor-default leading-normal',
                    groupLabelPointable: 'cursor-pointer',
                    groupLabelPointed: 'bg-gray-300 text-gray-700',
                    groupLabelSelected: 'bg-green-600 text-white',
                    groupLabelDisabled: 'bg-gray-100 text-gray-300 cursor-not-allowed',
                    groupLabelSelectedPointed: 'bg-green-600 text-white opacity-90',
                    groupLabelSelectedDisabled: 'text-green-100 bg-green-600 bg-opacity-50 cursor-not-allowed',
                    groupOptions: 'p-0 m-0',
                    option: 'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3',
                    optionPointed: 'text-gray-800 bg-gray-100',
                    optionSelected: 'text-white bg-green-500',
                    optionDisabled: 'text-gray-300 cursor-not-allowed',
                    optionSelectedPointed: 'text-white bg-green-500 opacity-90',
                    optionSelectedDisabled: 'text-green-100 bg-green-500 bg-opacity-50 cursor-not-allowed',
                    noOptions: 'py-2 px-3 text-gray-600 bg-white text-left rtl:text-right',
                    noResults: 'py-2 px-3 text-gray-600 bg-white text-left rtl:text-right',
                    fakeInput: 'bg-transparent absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none text-transparent',
                    assist: 'absolute -m-px w-px h-px overflow-hidden',
                    spacer: 'h-9 py-px box-content'
                }"
            ></Multiselect>
            <p class="text-sm text-red-500" v-if="audienceValidation.length > 0">{{ audienceValidation }}</p>
            <!-- <InputDropdown :placeholder="'Select audience'" :selected="selectedAudience" :
                :id="'audience'" @change="onChangeAudience" :option-list="audienceList">
            </InputDropdown> -->
        </div>
        <div class="space-y-1 flex flex-col pb-2">
            <label for="color" class="font-semibold text-base">Color</label>
            <input type="color" id="color" name="color" class="h-12" v-model="selectedColor" :title="selectedColor" :disabled="props.type === 'display'" />
        </div>
        <!-- <div class="flex space-x-2 items-center py-2">
            <label for="publish" tabindex="0" :aria-checked="isPublish" class="peer relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 rounded-full" :class="{'bg-blue-primary': isPublish, 'bg-gray-100': !isPublish}">
                <input type="checkbox" name="publish" id="publish" class="hidden" v-model="isPublish" />
                <span aria-hidden="true" class="rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs"></span>
                <span aria-hidden="true" class="rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs"></span>
                <span aria-hidden="true" class="absolute transform transition ease-in-out duration-200 h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-xs" :class="{'translate-x-full text-blue-primary': isPublish, 'translate-x-0 text-gray-400': !isPublish}"></span>
            </label>
            <span>Publish</span>
        </div> -->
    </div>
    <hr class="pt-2" v-if="props.type !== 'display'" />
    <div class="w-full flex justify-end items-center space-x-4 pt-6 pb-3 pr-4" v-if="props.type !== 'display'">
        <ButtonBase type="error" class="!w-32" @click="backToList">Back</ButtonBase>
        <ButtonBase class="!w-32" @click="submitGroup">Save</ButtonBase>
    </div>
</template>

<script setup lang="ts">
import { MultiselectEntity, OptionEntity } from '@/components/ComponentEntity';
import ButtonBase from '@/components/button/ButtonBase.vue';
import InputDropdown from '@/components/input/InputDropdown.vue';
import InputText from '@/components/input/InputText.vue';
import { Page } from '@/entity/page/Page';
import { AddGroupUseCase } from '@/usecase/audience/AddGroupUseCase';
import { GetPageUseCase } from '@/usecase/page/GetPageUseCase';
import { finalize } from 'rxjs';
import { Ref, computed, inject, onMounted, ref } from 'vue';
import Multiselect from '@vueform/multiselect';
import { AddGroupReq } from '@/entity/audience/AddGroupReq';
import { FieldError } from '@/entity/BaseResp';

const props = defineProps({
    type: {
        type: String,
        default: "create",
    },
    group_id: {
        type: String,
        default: "",
    }
})

const title = computed(() => {
    let result = "Category Audiens";

    if (props.type === "create") {
        result = `Add ${result}`;
    } else if (props.type === "update") {
        result = `Update ${result}`;
    }
    
    return result;
})

const getPageUseCase: GetPageUseCase = inject("getPageUseCase")!;
const addGroupUseCase: AddGroupUseCase = inject("addGroupUseCase")!;

const pageList: Ref<Page[]> = ref([]);

const pageOptionList: Ref<OptionEntity[]> = computed(() => {
    return pageList.value.map((data) => {
        return { key: data.page_id, value: data.page_name }
    })
});
const audienceList: Ref<MultiselectEntity[]> = computed(() => {
    if (selectedPage.value.length > 0) {
        const index = pageList.value.findIndex(data => data.page_id === selectedPage.value);
        return pageList.value[index].audience_list.map((data) => {
            return { value: data.audience_id, label: data.audience_name }
        })
    } 

    return [];
});

const isPublish = ref(false);
const isLoading = ref(false);

const groupName = ref("");
const selectedPage = ref("");
const selectedAudience: Ref<string[]> = ref([]);
const selectedColor = ref("#000000");

const groupNameValidation = ref("");
const pageValidation = ref("");
const audienceValidation = ref("");

const emit = defineEmits(["cancel", "success", "error"]);

function onChangePage(pageId: string): void {
    selectedPage.value = pageId;
    selectedAudience.value = [];
}

function createGroup(): void {
    const addGroupReq: AddGroupReq = {
        audience_list: selectedAudience.value,
        group_color_hex: selectedColor.value,
        group_name: groupName.value,
        page_id: selectedPage.value
    };

    const errorList = addGroupUseCase.validate(addGroupReq);

    if (errorList.length < 1) {
        isLoading.value = true;
        
        addGroupUseCase.execute(addGroupReq).subscribe(
            {
                next: (baseResp) => {
                    if (baseResp.code === 200) {
                        emit("success");
                    } else {
                        emit("error", baseResp);
                    }
                }, 
                error: (e) => {
                    emit("error", e);
                }
            }
        );
    } else {
        validateGroupName(errorList);
        validatePage(errorList);
        validateAudience(errorList);
    }
}

function validateGroupName(error: FieldError[]): void {
    const filteredError = error.filter(data => data.field === "group_name");
    groupNameValidation.value = filteredError.length > 0 ?
        filteredError[0].message[0] : "";
}

function validatePage(error: FieldError[]): void {
    const filteredError = error.filter(data => data.field === "page_id");
    pageValidation.value = filteredError.length > 0 ?
        filteredError[0].message[0] : "";
}

function validateAudience(error: FieldError[]): void {
    const filteredError = error.filter(data => data.field === "audience_list");
    audienceValidation.value = filteredError.length > 0 ?
        filteredError[0].message[0] : "";
}

function updateGroup(): void {
    console.log("update");
    emit("success");
}

function submitGroup(): void {
    if (props.type === "create") {
        createGroup();
    } else {
        updateGroup();
    }
}

function backToList(): void {
    emit("cancel");
}

onMounted(() => {
    loadPage();

    if ((props.type === "update" || props.type === "display") && props.group_id.length > 0) {
        loadDetailGroup();
    }
});

function loadDetailGroup(): void {
    console.log("load detail group");
}

function loadPage(): void {
    isLoading.value = true;

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
}

function setGroupName(group: string): void {
    groupName.value = group;
}
</script>