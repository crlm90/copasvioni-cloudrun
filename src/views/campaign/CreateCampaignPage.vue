<template>
    <div class="absolute -top-2 right-0 my-6 mx-8 flex space-x-4">
        <ButtonBase class="flex" @click="backToList">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span class="ml-2">Back</span>
        </ButtonBase>
    </div>
    <div class="bg-white w-full rounded-2xl p-6 space-y-6" id="section-form">
        <InputText :value="page.page_name" disabled="true" label-for="page-name" label-text="Page Name" placeholder="Page Name Goes Here"></InputText>
        <InputText label-for="campaign-name" placeholder="Type your campaign name" :value="createCampaignReq.campaign_name"
            label-text="Campaign Name" @type="setCampaignName($event)" :validation="campaignNameValidation">
        </InputText>
        <div>
            <p class="font-semibold text-lg">Scheduler</p>
            <div class="flex justify-between items-center">
                <p>Turning on to set schedule to your campaign</p>
                
                <label for="scheduler" tabindex="0" :aria-checked="createCampaignReq.is_scheduled" class="peer relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 rounded-full" :class="{'bg-blue-primary': createCampaignReq.is_scheduled, 'bg-gray-100': !createCampaignReq.is_scheduled}">
                    <input type="checkbox" name="scheduler" id="scheduler" class="hidden" v-model="createCampaignReq.is_scheduled" />
                    <span aria-hidden="true" class="rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs"></span>
                    <span aria-hidden="true" class="rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs"></span>
                    <span aria-hidden="true" class="absolute transform transition ease-in-out duration-200 h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-xs" :class="{'translate-x-full text-blue-primary': createCampaignReq.is_scheduled, 'translate-x-0 text-gray-400': !createCampaignReq.is_scheduled}"></span>
                </label>
            </div>
            <div class="flex justify-between space-x-4 my-2 transform transition ease-in-out duration-200 overflow-hidden" :class="{ 'h-full': createCampaignReq.is_scheduled, 'h-0': !createCampaignReq.is_scheduled }">
                <div class="w-full">
                    <div class="bg-gray-100 flex items-center rounded-lg border w-full" :class="dateValidation.length > 0 ? 'border-red-500' : ''">
                        <span class="mx-4">Date</span>
                        <DatePicker class="!w-full !border-none" v-model:value="selectedDate" :editable="false" value-type="YYYY-MM-DD" format="DD MMM YYYY" placeholder="Select date"></DatePicker>
                    </div>
                    <p v-if="dateValidation.length > 0" class="my-1 text-sm text-red-500">{{ dateValidation }}</p>
                </div>
                <div class="w-full">
                    <div class="bg-gray-100 flex items-center rounded-lg border w-full" :class="timeValidation.length > 0 ? 'border-red-500' : ''">
                        <span class="mx-4">Time</span>
                        <DatePicker class="!w-full !border-none" type="time" v-model:value="selectedTime" :editable="false" value-type="format" format="hh:mm:ss" placeholder="Select time">
                            <template #icon-calendar>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.665 1.5C3.135 1.5 1.5 3.233 1.5 5.916V14.084C1.5 16.767 3.135 18.5 5.665 18.5H14.333C16.864 18.5 18.5 16.767 18.5 14.084V5.916C18.5 3.233 16.865 1.5 14.334 1.5H5.665ZM14.333 20H5.665C2.276 20 0 17.622 0 14.084V5.916C0 2.378 2.276 0 5.665 0H14.334C17.723 0 20 2.378 20 5.916V14.084C20 17.622 17.723 20 14.333 20Z" fill="currentColor"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.39 12.7675C13.259 12.7675 13.127 12.7335 13.006 12.6625L9.61502 10.6395C9.38902 10.5035 9.24902 10.2585 9.24902 9.99554V5.63354C9.24902 5.21954 9.58502 4.88354 9.99902 4.88354C10.413 4.88354 10.749 5.21954 10.749 5.63354V9.56954L13.775 11.3725C14.13 11.5855 14.247 12.0455 14.035 12.4015C13.894 12.6365 13.645 12.7675 13.39 12.7675Z" fill="currentColor"/>
                                </svg>
                            </template>
                        </DatePicker>
                    </div>
                    <p v-if="timeValidation.length > 0" class="my-1 text-sm text-red-500">{{ timeValidation }}</p>
                </div>
            </div>
        </div>
        <div id="section-interval">
            <p class="font-semibold text-lg">Interval</p>
            <div class="flex justify-between space-x-4 my-2">
                <div class="w-full">
                    <div class="bg-gray-100 flex items-center rounded-lg border w-full" :class="intervalMinValidation.length > 0 ? 'border-red-500' : ''">
                        <label for="min" class="mx-4">Minimal</label>
                        <input type="number" class="relative inline-block w-full rounded-lg h-12 rounded-l-none outline-none py-[6px] px-[30px] pl-[10px]"
                            @input="filterNumber($event)" @keypress="checkNumber($event)" v-model.number="createCampaignReq.interval_min" name="min"
                            id="min" placeholder="Set minimal interval" min="0" />
                    </div>
                    <p v-if="intervalMinValidation.length > 0" class="my-1 text-sm text-red-500">{{ intervalMinValidation }}</p>
                </div>
                <div class="w-full">
                    <div class="bg-gray-100 flex items-center rounded-lg border w-full" :class="intervalMaxValidation.length > 0 ? 'border-red-500' : ''">
                        <label for="max" class="mx-4">Maximal</label>
                        <input type="number" class="relative inline-block w-full rounded-lg h-12 rounded-l-none outline-none py-[6px] px-[30px] pl-[10px]"
                            @input="filterNumber($event)" @keypress="checkNumber($event)" v-model.number="createCampaignReq.interval_max" name="max"
                            id="max" placeholder="Set maximal interval" min="0">
                    </div>
                    <p v-if="intervalMaxValidation.length > 0" class="my-1 text-sm text-red-500">{{ intervalMaxValidation }}</p>
                </div>
            </div>
        </div>
        <div class="w-full space-y-2" id="section-audience">
            <span for="labelFor" class="font-semibold text-lg">Audience</span>
            <div class="flex items-center justify-between bg-gray-100 p-3 w-full rounded-lg text-lg" :class="audienceValidation.length > 0 ? 'border border-red-500' : ''">
                <div class="flex flex-none w-[95%] max-w-[95%] flex-wrap">
                    <div class="text-lg text-gray-400" v-if="createCampaignReq.audience_list.length < 1">Select audiens</div>
                    <div v-else class="text-base bg-blue-primary p-1 rounded-lg text-gray-50 px-2 flex flex-none my-1 mx-1" v-for="(a, index) in createCampaignReq.audience_list" :key=index>
                        <p class="pr-2 border-r inline-block">{{ getAudienceNameFromId(a) }}</p>
                        <p class="ml-2 cursor-pointer text-white inline-block" @click="removeAudience(index)">&#x2715;</p>
                    </div>
                </div>
                <button @click="isPopupAudiensOpen=true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <p v-if="audienceValidation.length > 0" class="my-1 text-sm text-red-500">{{ audienceValidation }}</p>
        </div>
        <div id="section-message">
            <div class="flex justify-between">
                <p class="font-semibold text-lg">Message</p>
                <p class="font-semibold text-blue-primary underline cursor-pointer" @click="isPopupTemplateOpen=true" v-if="!isMessageBodyNew">Use Template</p>
            </div>
            <div class="relative" v-if="!isMessageBodyNew">
                <InputText :value="templateName" disabled="true" label-for="template-name" label-text="Template Name"
                    placeholder="Template Name Goes Here" class="py-4" :validation="templateValidation" />
                <button @click="removeTemplate" class="absolute right-4 top-16 transform rotate-45" v-if="createCampaignReq.template_id.length > 0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <div v-if="!isMessageTemplateSelected">
                <div class="w-full border rounded-lg p-4 my-2 space-y-2">
                    <InputDropdown :placeholder="'Select message type'" :selected="createCampaignReq.message_list[0].message_type"
                        :id="'type-0'" @change="createCampaignReq.message_list[0].message_type = $event.key" :option-list="messageTypeList">
                    </InputDropdown>
                    <textarea rows="5" class="w-full outline-none border rounded-lg p-4" placeholder="Type your message" v-model="createCampaignReq.message_list[0].message"></textarea>
                </div>
                <div class="w-full border rounded-lg p-4 my-2 flex items-start space-x-2" v-for="m, i in createCampaignReq.message_list.filter((_v, i) => i > 0)">
                    <div class="w-full space-y-1">
                        <InputDropdown :placeholder="'Select message type'" :selected="createCampaignReq.message_list[i+1].message_type"
                            :id="`type-${i+1}`" @change="createCampaignReq.message_list[i+1].message_type = $event.key" :option-list="messageTypeList"> 
                        </InputDropdown>
                        <textarea rows="5" class="w-full outline-none border rounded-lg p-4" placeholder="Type your message" v-model="createCampaignReq.message_list[i+1].message"></textarea>
                    </div>
                    <button class="flex-1 pt-3" @click="removeMessage(i+1)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#d93517" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
                <ButtonBase class="my-2 !w-auto" @click="addMessage">Add Message</ButtonBase>
            </div>
        </div>
        <hr />
        <div class="w-full flex justify-end items-center space-x-4">
            <ButtonBase type="error" class="!w-32" @click="backToList">Cancel</ButtonBase>
            <ButtonBase class="!w-32" @click="saveCampaign">Save</ButtonBase>
        </div>
    </div>

    <ModalComponent v-if="isPopupAudiensOpen" @close="isPopupAudiensOpen=false" :custom-class="'!max-w-xl'">
        <SelectAudience :audience_list="page.audience_list" :checked-audience="createCampaignReq.audience_list"
            @cancel="isPopupAudiensOpen = false" @continue="setCheckedAudience">
        </SelectAudience>
    </ModalComponent>

    <ModalComponent v-if="isPopupTemplateOpen" @close="isPopupTemplateOpen=false">
        <SelectMessageTemplate @cancel="isPopupTemplateOpen=false" @selected="onSelectedTemplate"></SelectMessageTemplate>
    </ModalComponent>

    <ModalComponent v-if="isPopupCreateOpen" @close="backToList">
        <SelectPage @continue="continueCreateCampaign" @cancel="backToList"></SelectPage>
    </ModalComponent>

    <LoadingScreen v-if="isLoading"></LoadingScreen>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/button/ButtonBase.vue';
import InputText from '@/components/input/InputText.vue';
import ModalComponent from '@/components/modal/ModalComponent.vue';
import LoadingScreen from '@/components/loading/LoadingScreen.vue';
import SelectMessageTemplate from '@/views/campaign/SelectMessageTemplate.vue';
import router from '@/router';
import { computed, inject, ref, type Ref } from 'vue';
import DatePicker from 'vue-datepicker-next';
import SelectPage from './SelectPage.vue';
import { Page } from '@/entity/page/Page';
import SelectAudience from './SelectAudience.vue';
import { CreateCampaignReq } from '@/entity/campaign/CreateCampaignReq';
import { OptionEntity } from '@/components/ComponentEntity';
import { TemplateMessage } from '@/entity/message/TemplateMessage';
import InputDropdown from '@/components/input/InputDropdown.vue';
import { CreateCampaignUseCase } from '@/usecase/campaign/CreateCampaignUseCase';
import { finalize } from 'rxjs';
import { NotificationManager } from '@/util/NotificationManager';
import { FieldError } from '@/entity/BaseResp';

const createCampaignUseCase: CreateCampaignUseCase = inject("createCampaignUseCase")!;

const isPopupAudiensOpen = ref(false);
const isPopupTemplateOpen = ref(false);
const isPopupCreateOpen = ref(true);
const isLoading = ref(false);

const selectedDate: Ref<string | null> = ref(null);
const selectedTime: Ref<string | null> = ref(null);

const campaignNameValidation = ref("");
const dateValidation = ref("");
const timeValidation = ref("");
const intervalMinValidation = ref("");
const intervalMaxValidation = ref("");
const audienceValidation = ref("");
const templateValidation = ref("");

const messageTypeList: OptionEntity[] = [
    {
        key: "Message",
        value: "Message",
    },
    {
        key: "Greeting",
        value: "Greeting",
    },
]

const page: Ref<Page> = ref({
    page_id: "",
    page_name: "",
    created_at: "",
    audience_list: [],
});
const templateName = ref("");

const createCampaignReq: Ref<CreateCampaignReq> = ref({
    page_id: "",
    campaign_name: "",
    is_scheduled: false,
    scheduled_date: "",
    message_list: [{
        message: "",
        message_type: "Message",
        message_order: "1",
    }],
    template_id: "",
    interval_min: 0,
    interval_max: 0,
    audience_list: [],
})

const isMessageTemplateSelected = computed(() => createCampaignReq.value.template_id.length > 0);
const isMessageBodyNew = computed(() => createCampaignReq.value.message_list.length > 1 || createCampaignReq.value.message_list[0].message.trim().length > 0);

function backToList(): void {
    router.push("/campaign");
}

function addMessage(): void {
    createCampaignReq.value.message_list.push({
        message: "",
        message_type: "",
        message_order: (createCampaignReq.value.message_list.length + 1).toString(),
    });
}

function removeMessage(index: number): void {
    createCampaignReq.value.message_list.splice(index, 1);
}

function continueCreateCampaign(data: Page): void {
    // Set to page data
    page.value = data;
    // Set page id to req
    createCampaignReq.value.page_id = data.page_id;
    // Close popup
    isPopupCreateOpen.value = false;
}

function setCheckedAudience(data: string[]): void {
    createCampaignReq.value.audience_list = data;
    isPopupAudiensOpen.value = false;
}

function getAudienceNameFromId(id: string): string {
    return page.value.audience_list.filter(data => data.audience_id === id)[0].audience_name;
}

function removeAudience(index: number): void {
    createCampaignReq.value.audience_list.splice(index, 1);
}

function saveCampaign(): void {
    setMessageOrder();

    // Reset message list if template id
    if (createCampaignReq.value.template_id.trim().length > 0) {
        createCampaignReq.value.message_list = [];
    }

    // Set scheduled time
    createCampaignReq.value.scheduled_date = createCampaignReq.value.is_scheduled && selectedDate.value && selectedTime.value ?
        `${selectedDate.value} ${selectedTime.value}` : "";

    const errorList = createCampaignUseCase.validate(createCampaignReq.value);
    if (errorList.length < 1) {
        isLoading.value = true;
        createCampaignUseCase.execute(createCampaignReq.value)
            .pipe(
                finalize(() => isLoading.value = false)
            )
            .subscribe(
                {
                    next: (resp) => {
                        if (resp.code === 200) {
                            backToList();
                        } else {
                            const message = resp.result?.message ?? resp.message;
                            NotificationManager.showMessage("Failed to Create Data", message, "error");
                        }
                    },
                    error: (error) => {
                        NotificationManager.showMessage("Failed to Create Data", error, "error");
                    }
                }
            );
    } else {
        validateCampaignName(errorList);
        validateScheduler(errorList);
        validateInterval(errorList);
        validateAudience(errorList);
        validateTemplate(errorList);
    }
}

function setMessageOrder(): void {
    const messageList = createCampaignReq.value.message_list.filter(data => data.message_type === "Message")
        .map((data, index) => {
            return { ...data, message_order: (index+1).toString() }
        });
    const greetingList = createCampaignReq.value.message_list.filter(data => data.message_type === "Greeting")
        .map((data, index) => {
            return { ...data, message_order: (index+1).toString() }
        });
    createCampaignReq.value.message_list = messageList.concat(greetingList);
}

function setCampaignName(name: string): void {
    createCampaignReq.value.campaign_name = name;
}

function checkNumber(evt: KeyboardEvent): void {
    const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const keyPressed: string = evt.key;
    
    if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault()
    } else {
        return;
    }
}

function filterNumber(evt: Event): void {
    (evt.target as HTMLInputElement).value = (evt.target as HTMLInputElement).value.replace(/[^0-9]+/g, '');
}

function onSelectedTemplate(template: TemplateMessage): void {
    createCampaignReq.value.template_id = template.template_id;
    templateName.value = template.template_name;

    isPopupTemplateOpen.value = false;
}

function removeTemplate(): void {
    createCampaignReq.value.template_id = "";
    templateName.value = "";
}

function validateCampaignName(error: FieldError[]): void {
    const filteredError = error.filter(data => data.field === "campaign_name");
    campaignNameValidation.value = filteredError.length > 0 ?
        filteredError[0].message[0] : "";
}

function validateScheduler(error: FieldError[]): void {
    const filteredDateError = error.filter(data => data.field === "scheduled_date");
    dateValidation.value = filteredDateError.length > 0 ?
        filteredDateError[0].message[0] : "";
    const filteredTimeError = error.filter(data => data.field === "scheduled_time");
    timeValidation.value = filteredTimeError.length > 0 ?
        filteredTimeError[0].message[0] : "";
}

function validateInterval(error: FieldError[]): void {
    const filteredIntervalMinError = error.filter(data => data.field === "interval_min");
    intervalMinValidation.value = filteredIntervalMinError.length > 0 ?
        filteredIntervalMinError[0].message[0] : "";
    const filteredIntervalMaxError = error.filter(data => data.field === "interval_max");
    intervalMaxValidation.value = filteredIntervalMaxError.length > 0 ?
        filteredIntervalMaxError[0].message[0] : "";
}

function validateAudience(error: FieldError[]): void {
    const filteredError = error.filter(data => data.field === "audience_list");
    audienceValidation.value = filteredError.length > 0 ?
        filteredError[0].message[0] : "";
}

function validateTemplate(error: FieldError[]): void {
    const filteredError = error.filter(data => data.field === "template_id");
    templateValidation.value = filteredError.length > 0 ?
        filteredError[0].message[0] : "";
}
</script>

<style>
.mx-input {
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem/* 16px */;
    line-height: 1.5rem/* 24px */;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    box-shadow: none;
    height: 3rem/* 48px */;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>