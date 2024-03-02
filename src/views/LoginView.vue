<template>
    <div class="grid lg:grid-cols-2 h-screen">
        <div class="hidden lg:flex bg-sky-100 items-center p-8">
            <img src="@/assets/login-img.png" alt="Login Page">
        </div>
        <div class="bg-gray-200 flex items-center">
            <div class="mx-auto bg-white rounded-2xl p-8 leading-8 w-3/4 max-w-xl space-y-2">
                <img src="@/assets/logo.png" alt="RepliEm" class="mx-auto w-10">
                <h1 class="font-extrabold text-4xl text-center">Welcome to RepliEm</h1>

                <div class="py-8 space-y-4 !pb-2">
                    <InputText label-for="email" label-text="Email Address" placeholder="example@mail.com" />
                    <div>
                        <InputText label-for="password" label-text="Password" placeholder="********" />
                        <p class="text-sm underline cursor-pointer py-1" @click="isPopupForgotPasswordShown = true">
                            Forgot your password?
                        </p>
                    </div>
                </div>

                <div class="flex items-center justify-center pb-2">
                    <vue-recaptcha :sitekey="siteKey" :class="isRecaptchaError ? 'border border-red-500' : ''" class="mx-auto w-[304px] h-[78px]"
                        @verify="recaptchaVerified" @expire="recaptchaExpired" @fail="recaptchaFailed" @error="recaptchaError" ref="recaptcha">
                    </vue-recaptcha>
                </div>

                <div>
                    <ButtonBase @click="signIn">Sign In</ButtonBase>
                    <p class="text-xs text-right py-1 text-neutral-500">Not on RepliEm yet?
                        <b class="underline cursor-pointer" @click="isPopupCreateAccountShown = true">Sign Up</b>
                    </p>
                </div>

                <p class="text-xs text-neutral-500">by continuing, you agree to RepliEm's
                    <b class="underline cursor-pointer" @click="redirectTo('tos')">Terms of Service</b> and acknowledge
                    you've read our <b class="underline cursor-pointer" @click="redirectTo('policy')">Privacy Policy</b>.
                </p>
            </div>
        </div>
    </div>

    <ModalComponent v-if="isPopupCreateAccountShown" @close="isPopupCreateAccountShown = false">
        <CreateAccount></CreateAccount>
    </ModalComponent>
</template>

<script setup lang="ts">
import InputText from "@/components/input/InputText.vue";
import ButtonBase from "@/components/button/ButtonBase.vue";
import { Ref, onMounted, ref } from "vue";
import router from "@/router";
import ModalComponent from "@/components/modal/ModalComponent.vue";
import CreateAccount from "./account/CreateAccount.vue";
import vueRecaptcha from 'vue3-recaptcha2';
import { useUserStore } from "@/stores/UserStore";
import { initFacebook, login, logout } from '@/oauth-fb/FacebookAuth';


const isPopupForgotPasswordShown = ref(false);
const isPopupCreateAccountShown = ref(false);

const recaptcha: Ref<any> = ref(null);
const isRecaptchaError = ref(false);

const siteKey = "6Lc9Z40hAAAAAFRdtS72GNcB76a1ltmdqWQ-6Zd5";

const userStore = useUserStore();

function redirectTo(name: string): void {
    const path = name === "tos" ? "/terms" : "/policy";
    const routeData = router.resolve(path);
    window.open(routeData.href, "_blank");
}

function recaptchaVerified(response: any): void {
    console.log("v", response);
}

function recaptchaExpired(): void {
    recaptcha.value.reset();
}

function recaptchaFailed(): void {
    console.log("f");
}

function recaptchaError(reason: any): void {
    console.log("e", reason);
}

async function signIn(): Promise<void> {
    // googleAuthCodeLogin().then((response) => {
    //     console.log("Handle the response", response)
    //     const userData = decodeCredential(response.code)
    //     console.log("Handle the userData", userData)
    // });
    userStore.setName("John Doe");
    userStore.setEmail("johndoe@gmail.com");
    userStore.setRole("Administrator");
    userStore.setPhone("08113276836");
    userStore.setToken("tokenabcdefg");

    const result = await login();
    if (result) {
        console.log("api", result);
    }

    

    // router.push('/')
}

onMounted(() => {
    initFacebook("252744180318694")
})
</script>