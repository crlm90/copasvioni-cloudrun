<template>
    <div class="flex items-center">
        <div class="mx-auto bg-white rounded-2xl p-8 leading-8 w-3/4 max-w-xl space-y-2">
            <img src="@/assets/logo.png" alt="RepliEm" class="mx-auto w-10">
            <h1 class="font-extrabold text-4xl text-center">Welcome to RepliEm</h1>

            <div class="py-8 space-y-4">
                <InputText label-for="email" label-text="Email Address" placeholder="example@mail.com" />
                <InputText label-for="password" label-text="Password" placeholder="********" />
            </div>

            <ButtonBase>Sign Up</ButtonBase>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputText from "@/components/input/InputText.vue";
import ButtonBase from "@/components/button/ButtonBase.vue";
</script>
