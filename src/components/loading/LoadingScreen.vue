<template>
    <div>
        <div class="fixed inset-0 z-50 flex justify-center items-center">
            <div class="relative flex flex-col w-96 h-96 max-w-lg rounded-lg shadow-lg bg-white p-4">
                <slot>
                    <div class="flex flex-col space-y-2 items-center justify-center w-full h-full">
                        <div class="animate-pulse rounded-full bg-slate-300 h-14 w-14"></div>
                        <p class="!animate-none">Loading...</p>
                    </div>
                </slot>
            </div>
        </div>
        <div class="opacity-50 bg-black h-screen fixed inset-0 z-40"></div>
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