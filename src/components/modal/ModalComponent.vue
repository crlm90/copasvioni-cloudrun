<template>
    <div tabindex="0" @keydown.esc="$emit('close')">
        <div class="fixed inset-0 z-50 flex justify-center items-center">
            <div class="relative flex flex-col w-1/2 max-w-3xl rounded-lg shadow-lg bg-white p-4 slide-in-bottom" :class="[open ? 'slide-in-bottom' : 'slide-out-bottom', customClass]">
                <div class="absolute -right-3 -top-3">
                    <svg xmlns="http://www.w3.org/2000/svg" @click="$emit('close')" fill="white" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="red" class="w-8 h-8 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div class="max-h-[90vh] overflow-y-auto">
                    <slot />
                </div>
            </div>
        </div>
        <div class="opacity-25 bg-black h-screen fixed inset-0 z-40"></div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps(["customClass"]);
const open = ref(true);

onMounted(() => {
    document.body.classList.add("overflow-hidden");
})

onBeforeUnmount(() => {
    open.value = false;
})

onUnmounted(() => {
    document.body.classList.remove("overflow-hidden");
})
</script>

<style>
.slide-in-bottom {
    -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-out-bottom {
    -webkit-animation: slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
    animation: slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes slide-in-bottom {
    0% {
        -webkit-transform: translateY(1000px);
        transform: translateY(1000px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slide-in-bottom {
    0% {
        -webkit-transform: translateY(1000px);
        transform: translateY(1000px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
    }
}

@-webkit-keyframes slide-out-bottom {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
    }

    100% {
        -webkit-transform: translateY(1000px);
        transform: translateY(1000px);
        opacity: 0;
    }
}

@keyframes slide-out-bottom {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
    }

    100% {
        -webkit-transform: translateY(1000px);
        transform: translateY(1000px);
        opacity: 0;
    }
}
</style>