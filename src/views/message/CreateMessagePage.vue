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
        <InputText label-for="message-name" label-text="Message" placeholder="Type your message name" @type="setTemplateName"
            :validation="templateValidation" :value="templateName" :maxlength="100" />
        
        <div class="w-full" id="greeting">
            <div class="border p-4 rounded-2xl rounded-b-none flex items-center justify-between" :class="messageList.length > 0 ? 'border-b-0' : ''">
                <div class="flex items-center justify-start space-x-8">
                    <p class="cursor-pointer font-semibold" @click="indexActiveGreeting = index"
                        :class="{ 'text-blue-primary': indexActiveGreeting === index, 'text-gray-700': indexActiveGreeting !== index }"
                        v-for="(g, index) in greetingList.length" :key="index">
                        Greeting {{ g }}
                    </p>
                </div>
                <ButtonBase type="secondary" class="!w-36 !py-2 !px-4" @click="addGreeting" v-if="greetingList.length < 10">Add Greeting</ButtonBase>
            </div>
            <div class="border p-4 rounded-2xl border-t-0 rounded-t-none bg-gray-100" v-if="greetingList.length > 0">
                <textarea class="w-full border rounded-2xl outline-none p-4" rows="4" placeholder="Type your message" v-model="greetingList[indexActiveGreeting].message"></textarea>
                <p v-if="greetingList.length > 1" class="text-right underline pt-2 px-1 text-red-500 font-semibold cursor-pointer" @click="deleteGreeting">Delete</p>
            </div>
        </div>

        <div class="w-full" id="message">
            <div class="border p-4 rounded-2xl rounded-b-none flex items-center justify-between" :class="messageList.length > 0 ? 'border-b-0' : ''">
                <div class="flex items-center justify-start space-x-8">
                    <p class="cursor-pointer font-semibold" @click="indexActiveMessage = index"
                        :class="{ 'text-blue-primary': indexActiveMessage === index, 'text-gray-700': indexActiveMessage !== index }"
                        v-for="(m, index) in messageList.length" :key="index">
                        Message {{ m }}
                    </p>
                </div>
                <ButtonBase type="secondary" class="!w-36 !py-2 !px-4" @click="addMessage" v-if="messageList.length < 10">Add Message</ButtonBase>
            </div>
            <div class="border p-4 rounded-2xl border-t-0 rounded-t-none bg-gray-100" v-if="messageList.length > 0">
                <textarea class="w-full border rounded-2xl outline-none p-4" rows="4" placeholder="Type your message" v-model="messageList[indexActiveMessage].message"></textarea>
                <p v-if="messageList.length > 1" class="text-right underline pt-2 px-1 text-red-500 font-semibold cursor-pointer" @click="deleteMessage">Delete</p>
            </div>
        </div>

        <div class="w-full" id="upload-attachment">
            <div class="border border-b-0 p-4 rounded-2xl rounded-b-none flex items-center justify-between">
                <div class="flex-col">
                    <p class="font-medium">Upload PDF</p>
                    <p class="font-light text-sm text-gray-700">You can only upload one file</p>
                </div>
                <div>
                    <label v-if="attachmentList.length < 1" for="upload-file" class="flex items-center cursor-pointer border bg-white hover:bg-gray-100 border-blue-primary text-blue-primary p-2 px-4 rounded-lg font-semibold">
                        Browse PDF
                    </label>
                    <input @change="uploadFile($event)" type="file" name="image" id="upload-file" class="hidden" accept="application/pdf" ref="upload">
                </div>
            </div>
            <div class="border p-4 rounded-2xl border-t-0 rounded-t-none bg-gray-100">
                <div v-if="attachmentList.length < 1">
                    <label for="upload-file" class="flex text-center items-center flex-col space-y-4 p-8">
                        <img src="@/assets/upload.svg" alt="Upload">
                        <span class="text-stone-500">Select File to Upload</span>
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
            <ButtonBase class="!w-32" @click="createTemplate">Save</ButtonBase>
        </div>
    </div>

    <LoadingScreen v-if="isLoading"></LoadingScreen>
</template>

<script setup lang="ts">
import ButtonBase from '@/components/button/ButtonBase.vue';
import InputText from '@/components/input/InputText.vue';
import LoadingScreen from '@/components/loading/LoadingScreen.vue';
import { FieldError } from '@/entity/BaseResp';
import { CreateTemplateReq } from '@/entity/message/CreateTemplateReq';
import { Message, MessageAttachment } from '@/entity/message/TemplateMessage';
import router from '@/router';
import { CreateTemplateUseCase } from '@/usecase/template/CreateTemplateUseCase';
import { NotificationManager } from '@/util/NotificationManager';
import { TextFormatter } from '@/util/TextFormatter';
import { finalize } from 'rxjs';
import { inject, ref, type Ref } from 'vue';

const createTemplateUseCase: CreateTemplateUseCase = inject("createTemplateUseCase")!;

const templateName = ref("");
const indexActiveMessage = ref(0);
const messageList: Ref<Message[]> = ref([
    {
        message_id: "",
        message_order: "",
        message_type: "Message",
        message: "",
        flag_delete: false,
    }
]);
const indexActiveGreeting = ref(0);
const greetingList: Ref<Message[]> = ref([
    {
        message_id: "",
        message_order: "",
        message_type: "Greeting",
        message: "",
        flag_delete: false,
    }
]);

const attachmentList: Ref<MessageAttachment[]> = ref([]);
const isLoading = ref(false);
const upload: Ref<HTMLFormElement | null> = ref(null);

const templateValidation = ref("");

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

function setTemplateName(name: string): void {
    templateName.value = name;
}

function removeAttachment(index: number): void {
    attachmentList.value.splice(index, 1);
}

function createTemplate(): void {
    const createReq: CreateTemplateReq = {
        message_list: messageList.value.filter(h => h.message.trim().length > 0)
        .concat(greetingList.value.filter(h => h.message.trim().length > 0))
        .map(v => {
            return {
                message: v.message,
                message_order: v.message_order,
                message_type: v.message_type
            }
        }),
        template_name: templateName.value
    };

    const errorList = createTemplateUseCase.validate(createReq);
    if (errorList.length < 1) {
        isLoading.value = true;
    
        createTemplateUseCase.execute(createReq)
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
            )
    } else {
        validateTemplate(errorList);
    }
}

function deleteMessage(): void {
    messageList.value.splice(indexActiveMessage.value, 1);
    if (indexActiveMessage.value >= messageList.value.length) {
        indexActiveMessage.value = messageList.value.length - 1;
    }
}

function deleteGreeting(): void {
    greetingList.value.splice(indexActiveGreeting.value, 1);

    if (indexActiveGreeting.value >= greetingList.value.length) {
        indexActiveGreeting.value = greetingList.value.length - 1;
    }
}

function validateTemplate(error: FieldError[]): void {
    const filteredError = error.filter(data => data.field === "template_name");
    templateValidation.value = filteredError.length > 0 ?
        filteredError[0].message[0] : "";
}
</script>