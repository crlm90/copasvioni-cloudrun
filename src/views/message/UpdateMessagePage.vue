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
    <div class="bg-white w-full rounded-2xl p-6 space-y-6">
        <InputText label-for="message-name" label-text="Message Name" placeholder="Type your message name" :value="templateName"
            @type="setTemplateName" :validation="templateValidation" :maxlength="100" />

        <div class="w-full" id="greeting">
            <div class="border p-4 rounded-2xl rounded-b-none flex items-center justify-between" :class="{ 'border-b-0' : filteredGreetingList.length > 0 }">
                <div class="flex items-center justify-start space-x-8">
                    <p class="cursor-pointer font-semibold" @click="indexActiveGreeting = index" v-for="(g, index) in filteredGreetingList.length"
                        :class="{ 'text-blue-primary': indexActiveGreeting === index, 'text-gray-700': indexActiveGreeting !== index }" :key="index">
                        Greeting {{ g }}
                    </p>
                </div>
                <ButtonBase v-if="filteredGreetingList.length < 10" type="secondary" class="!w-36 !py-2 !px-4" @click="addGreeting">Add Greeting</ButtonBase>
            </div>
            <div class="border p-4 rounded-2xl border-t-0 rounded-t-none bg-gray-100" v-if="filteredGreetingList.length > 0">
                <textarea class="w-full border rounded-2xl outline-none p-4" rows="4" placeholder="Type your message" :value="filteredGreetingList[indexActiveGreeting].message" @input="updateGreetingListFromFilteredData($event)"></textarea>
                <p v-if="filteredGreetingList.length > 1" class="text-right underline pt-2 px-1 text-red-500 font-semibold cursor-pointer" @click="deleteGreeting">Delete</p>
            </div>
        </div>

        <div class="w-full" id="message">
            <div class="border p-4 rounded-2xl rounded-b-none flex items-center justify-between" :class="{ 'border-b-0' : filteredMessageList.length > 0 }">
                <div class="flex items-center justify-start space-x-8">
                    <p class="cursor-pointer font-semibold" @click="indexActiveMessage = index" v-for="(m, index) in filteredMessageList.length"
                        :class="{ 'text-blue-primary': indexActiveMessage === index, 'text-gray-700': indexActiveMessage !== index }" :key="index">
                        Message {{ m }}
                    </p>
                </div>
                <ButtonBase v-if="filteredMessageList.length < 10" type="secondary" class="!w-36 !py-2 !px-4" @click="addMessage">Add Message</ButtonBase>
            </div>
            <div class="border p-4 rounded-2xl border-t-0 rounded-t-none bg-gray-100" v-if="filteredMessageList.length > 0">
                <textarea class="w-full border rounded-2xl outline-none p-4" rows="4" placeholder="Type your message" :value="filteredMessageList[indexActiveMessage].message" @input="updateMessageListFromFilteredData($event)"></textarea>
                <p v-if="filteredMessageList.length > 1" class="text-right underline pt-2 px-1 text-red-500 font-semibold cursor-pointer" @click="deleteMessage">Delete</p>
            </div>
        </div>

        <div class="w-full" id="upload-attachment">
            <div class="border border-b-0 p-4 rounded-2xl rounded-b-none flex items-center justify-between">
                <div class="flex-col">
                    <p class="font-medium">Upload PDF</p>
                    <p class="font-light text-sm text-gray-700">You can only upload one file</p>
                </div>
                <div>
                    <label v-if="attachmentList.length < 1" for="upload-file" class="flex items-center cursor-pointer border bg-white hover:bg-gray-100 border-blue-primary text-blue-primary p-2 px-4 rounded-lg font-semibold">Browse PDF</label>
                    <input @change="uploadFile($event)" type="file" name="image" id="upload-file" class="hidden" ref="upload" accept="application/pdf">
                </div>
            </div>
            <div class="border p-4 rounded-2xl border-t-0 rounded-t-none bg-gray-100">
                <div v-if="attachmentList.length < 1">
                    <label for="upload-file" class="flex text-center items-center flex-col space-y-4 p-8">
                        <img src="@/assets/upload.svg" alt="Upload">
                        <p class="text-stone-500">Select File to Upload</p>
                    </label>
                </div>
                <div v-else class="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div class="border flex items-center bg-white rounded-lg" v-for="(attachment, index) in attachmentList" :key="index">
                        <div class="p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                            </svg>
                        </div>
                        <div class="flex items-center w-full h-full pl-4 border-l">
                            <div class="flex-col w-full">
                                <p class="truncate max-w-[calc(100%-3.5rem)]">
                                    {{ attachment.filename }}
                                </p>
                                <p class="text-xs text-red-500 cursor-pointer hover:underline" @click="removeAttachment(index)">
                                    Remove
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <hr />
        <div class="w-full flex justify-end items-center space-x-4">
            <ButtonBase type="error" class="!w-32" @click="backToList">Cancel</ButtonBase>
            <ButtonBase class="!w-32" @click="updateTemplate">Save</ButtonBase>
        </div>
    </div>

    <LoadingScreen v-if="isLoading"></LoadingScreen>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/button/ButtonBase.vue';
import InputText from '@/components/input/InputText.vue';
import LoadingScreen from '@/components/loading/LoadingScreen.vue';
import { FieldError } from '@/entity/BaseResp';
import { Message, MessageAttachment } from '@/entity/message/TemplateMessage';
import { UpdateTemplateReq } from '@/entity/message/UpdateTemplateReq';
import router from '@/router';
import { GetDetailTemplateUseCase } from '@/usecase/template/GetDetailTemplateUseCase';
import { UpdateTemplateUseCase } from '@/usecase/template/UpdateTemplateUseCase';
import { NotificationManager } from '@/util/NotificationManager';
import { TextFormatter } from '@/util/TextFormatter';
import { finalize } from 'rxjs';
import { computed, inject, onMounted, ref, type Ref } from 'vue';
import { useRoute } from "vue-router";

const templateId: string = useRoute().params["templateId"] as string;
const templateName = ref("");
const isLoading = ref(false);
const templateValidation = ref("");
const upload: Ref<HTMLFormElement | null> = ref(null);

const updateTemplateUseCase: UpdateTemplateUseCase = inject("updateTemplateUseCase")!;
const getDetailTemplateUseCase: GetDetailTemplateUseCase = inject("getDetailTemplateUseCase")!;

const indexActiveMessage = ref(0);
const messageList: Ref<Message[]> = ref([{
    flag_delete: false,
    message: "",
    message_id: "",
    message_order: "1",
    message_type: "Message"
}]);
const indexActiveGreeting = ref(0);
const greetingList: Ref<Message[]> = ref([{
    flag_delete: false,
    message: "",
    message_id: "",
    message_order: "1",
    message_type: "Greeting"
}]);

const filteredMessageList = computed(() => {
    return messageList.value.map((data, index) => {
        return { ...data, flag_delete: data.flag_delete ?? false, index }
    }).filter(data => data.flag_delete === false);
});

const filteredGreetingList = computed(() => {
    return greetingList.value.map((data, index) => {
        return { ...data, flag_delete: data.flag_delete ?? false, index }
    }).filter(data => data.flag_delete === false);
});

const attachmentList: Ref<MessageAttachment[]> = ref([]);

function backToList(): void {
    router.push("/message");
}

function addMessage(): void {
    messageList.value.push({
        message_id: "",
        message: "",
        message_order: (messageList.value.length + 1).toString(),
        message_type: "Message",
        flag_delete: false,
    });
}

function addGreeting(): void {
    greetingList.value.push({
        message_id: "",
        message: "",
        message_order: (greetingList.value.length + 1).toString(),
        message_type: "Greeting",
        flag_delete: false,
    });
}

function uploadFile(event: Event): void {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
            // Validate type
            if ("application/pdf" !== fileList[i].type.trim()) {
                NotificationManager.showMessage("Failed to Upload PDF", "Invalid file type", "error");
                (upload.value as HTMLFormElement).value = null;
            } else {
                TextFormatter.generateFileChecksum(fileList[0])
                    .pipe(
                        finalize(() => (upload.value as HTMLFormElement).value = null)
                    )
                    .subscribe({
                        next: (checksum) => {
                            attachmentList.value = [];
                            attachmentList.value.push({
                                filename: fileList[i].name,
                                checksum,
                                message_attachment: fileList[i]
                            });
                        },
                        error: (e) => {
                            NotificationManager.showMessage("Failed to Upload PDF", e, "error");
                        }
                    });
            }
        }
    }
}

function removeAttachment(index: number): void {
    attachmentList.value.splice(index, 1);
}

function setTemplateName(name: string): void {
    templateName.value = name;
}

onMounted(() => {
    loadData();
})

function loadData(): void {
    getDetailTemplateUseCase.execute({
        template_id: templateId
    }).subscribe(
        {
            next: (templateResp) => {
                if (templateResp.code === 200) {
                    templateName.value = templateResp.result.data.template_name ?? "";
                    const list = templateResp.result.data.message_list ?? [];
                    messageList.value = list.filter(h => h.message_type === "Message");
                    greetingList.value = list.filter(h => h.message_type === "Greeting");
                } else {
                    const message = templateResp.result?.message ?? templateResp.message;
                    NotificationManager.showMessage("Failed to Load Data", message, "error");
                }
            },
            error: (error) => {
                NotificationManager.showMessage("Failed to Load Data", error, "error");
            }
        }
    )
}

function updateTemplate(): void {
    const updateReq: UpdateTemplateReq = {
        template_id: templateId,
        template_name: templateName.value,
        message_list: messageList.value.concat(greetingList.value)
            .map(v => {
                return {
                    message_id: v.message_id,
                    message_order: v.message_order,
                    message: v.message,
                    message_type: v.message_type,
                    flag_delete: v.flag_delete ?? false,
                }
            })
    };

    const errorList = updateTemplateUseCase.validate(updateReq);
    if (errorList.length < 1) {
        isLoading.value = true;

        updateTemplateUseCase.execute(updateReq).pipe(
            finalize(() => isLoading.value = false)
        ).subscribe(
            {
                next: (resp) => {
                    if (resp.code === 200) {
                        backToList();
                    } else {
                        const message = resp.result?.message ?? resp.message;
                        NotificationManager.showMessage("Failed to Update Data", message, "error");
                    }
                },
                error: (error) => {
                    NotificationManager.showMessage("Failed to Update Data", error, "error");
                }
            }
        )
    } else {
        validateTemplate(errorList);
    }
}

function deleteMessage(): void {
    const indexToUpdate = filteredMessageList.value[indexActiveMessage.value].index;
    messageList.value[indexToUpdate].flag_delete = true;

    if (indexActiveMessage.value >= filteredMessageList.value.length) {
        indexActiveMessage.value = filteredMessageList.value.length - 1;
    }
}

function deleteGreeting(): void {
    const indexToUpdate = filteredGreetingList.value[indexActiveGreeting.value].index;
    greetingList.value[indexToUpdate].flag_delete = true;

    if (indexActiveGreeting.value >= filteredGreetingList.value.length) {
        indexActiveGreeting.value = filteredGreetingList.value.length - 1;
    }
}

function updateMessageListFromFilteredData(event: Event): void {
    // Get new value
    const value = (event.target as HTMLTextAreaElement).value;

    // Get index from message list
    const trueIndex = filteredMessageList.value[indexActiveMessage.value].index;

    // Set data to message list
    messageList.value[trueIndex].message = value;
}

function updateGreetingListFromFilteredData(event: Event): void {
    // Get new value
    const value = (event.target as HTMLTextAreaElement).value;

    // Get index from message list
    const trueIndex = filteredGreetingList.value[indexActiveGreeting.value].index;

    // Set data to message list
    greetingList.value[trueIndex].message = value;
}

function validateTemplate(error: FieldError[]): void {
    const filteredError = error.filter(data => data.field === "template_name");
    templateValidation.value = filteredError.length > 0 ?
        filteredError[0].message[0] : "";
}
</script>