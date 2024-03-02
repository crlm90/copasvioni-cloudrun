<template>
    <div class="p-4 space-y-4">
        <p class="text-2xl font-bold">Detail Message</p>

        <div class="w-full" v-if="messageList.length > 0">
            <p>Template Name</p>
            <div class="w-full pt-2">
                <div class="border border-b-0 p-4 rounded-2xl rounded-b-none">
                    <div class="flex items-center justify-start space-x-8">
                        <p class="cursor-pointer font-semibold" @click="indexActiveMessage = index"
                            :class="{ 'text-blue-primary': indexActiveMessage === index, 'text-gray-700': indexActiveMessage !== index }" v-for="m, index in messageList.length" :key="index">Message {{ m }}</p>
                    </div>
                </div>
                <div class="border p-4 rounded-2xl border-t-0 rounded-t-none bg-gray-100">
                    <textarea disabled class="w-full resize-none bg-gray-100 rounded-2xl outline-none p-4" rows="4" placeholder="Type your message" v-model="messageList[indexActiveMessage].message"></textarea>
                </div>
            </div>
        </div>

        <div class="w-full" v-if="greetingList.length > 0">
            <p>Greetings Name</p>
            <div class="w-full pt-2">
                <div class="border border-b-0 p-4 rounded-2xl rounded-b-none flex items-center justify-between">
                    <div class="flex items-center justify-start space-x-8">
                        <p class="cursor-pointer font-semibold" @click="indexActiveGreeting = index"
                            :class="{ 'text-blue-primary': indexActiveGreeting === index, 'text-gray-700': indexActiveGreeting !== index }" v-for="g, index in greetingList.length" :key="index">Greeting {{ g }}</p>
                    </div>
                </div>
                <div class="border p-4 rounded-2xl border-t-0 rounded-t-none bg-gray-100">
                    <textarea disabled class="w-full resize-none bg-gray-100 rounded-2xl outline-none p-4" rows="4" placeholder="Type your message" v-model="greetingList[indexActiveGreeting].message"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Message } from "@/entity/message/TemplateMessage";
import { GetDetailTemplateUseCase } from "@/usecase/template/GetDetailTemplateUseCase";
import { NotificationManager } from "@/util/NotificationManager";
import { Subscription } from "rxjs";
import { Ref, inject, onMounted, ref } from "vue";

const props = defineProps({
    templateId: {
        type: String,
        default: ""
    }
});
const emit = defineEmits(["close"])

const asyncSubscription: Subscription = new Subscription();
const getDetailTemplateUseCase: GetDetailTemplateUseCase = inject("getDetailTemplateUseCase")!;

const indexActiveMessage = ref(0);
const messageList: Ref<Message[]> = ref([]);
const indexActiveGreeting = ref(0);
const greetingList: Ref<Message[]> = ref([]);

onMounted(() => {
    loadDetailTemplate();
})

function loadDetailTemplate(): void {
    asyncSubscription.add(
        getDetailTemplateUseCase.execute({
            template_id: props.templateId
        }).subscribe(
            {
                next: (templateResp) => {
                    if (templateResp.code === 200) {
                        const list = templateResp.result.data.message_list ?? [];

                        messageList.value = list.filter(m => m.message_type === "Message")
                            .sort((a, b) => {
                                if (a.message_order < b.message_order) return -1;
                                else if (a.message_order > b.message_order) return 1;
                                else return 0;
                            });

                        greetingList.value = list.filter(m => m.message_type === "Greeting")
                            .sort((a, b) => {
                                if (a.message_order < b.message_order) return -1;
                                else if (a.message_order > b.message_order) return 1;
                                else return 0;
                            });
                    } else {
                        const message = templateResp.result?.message ?? templateResp.message;
                        NotificationManager.showMessage("Failed to Load Data", message, "error");
                    }
                },
                error: (error) => {
                    NotificationManager.showMessage("Network Error", error, "error");
                }
            }
        )
    );
}
</script>