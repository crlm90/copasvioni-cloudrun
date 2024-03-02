<template>
    <div class="fixed top-0 w-full h-[8vh] p-4 pr-0 flex items-center justify-between bg-blue-300 bg-opacity-5">
        <div class="flex items-center">
            <button class="block md:hidden" @click="showSidebar = !showSidebar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <div class="space-x-4 flex items-center">
                <img src="../assets/logo.png" alt="Logo" class="h-16 py-4">
                <h1 class="text-xl font-bold">RepliEm</h1>
            </div>
        </div>
        <button v-if="!showSidebar" class="max-w-[276px] hover:bg-white hover:bg-opacity-25 p-2 px-4 hover:rounded-l-lg hover:cursor-pointer" @click="showOption=!showOption" @blur="onLeaveShowOption">
            <div class="flex items-center justify-between text-left">
                <div>
                    <h2 class="font-medium text-base max-w-[180px] truncate">{{ name }}</h2>
                    <h3 class="text-sm text-gray-500">{{ role }}</h3>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 ml-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
        </button>
    </div>
    <ul class="bg-white right-0 absolute z-50 shadow-2xl rounded-l-lg w-[276px] transition duration-200 ease-in-out" v-show="showOption">
        <div class="h-[8vh] bg-blue-darkest bg-opacity-85 rounded-tl-lg p-4 text-gray-50 flex items-center justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mr-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div class="">
                <h2 class="font-medium text-base max-w-[180px] truncate">{{ name }}</h2>
                <h3 class="text-sm text-gray-50">{{ email }}</h3>
            </div>
        </div>
        <div class="p-1 m-1">
            <router-link to="/account">
                <li class="font-semibold text-sm text-gray-700 flex items-center p-2 hover:cursor-pointer hover:bg-slate-300 hover:rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span class="ml-4">View Profile</span>
                </li>
            </router-link>
            <hr class="my-2" />
            <li class="font-semibold text-sm text-gray-700 flex items-center p-2 hover:cursor-pointer hover:bg-slate-300 hover:rounded-lg" @click="signOut">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span class="ml-4">Sign Out</span>
            </li>
        </div>
    </ul>
    <div class="relative flex min-h-[92vh] top-[8vh]">
        <div class="bg-white text-gray-700 w-full md:w-64 py-4 px-2 space-y-6 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out md:relative md:-translate-x-0" :class="{ 'relative -translate-x-0': showSidebar, '-translate-x-full': !showSidebar }">
            <nav>
                <router-link to="/" class="flex items-center py-3 px-4 hover:bg-sky-100 space-x-2 hover:rounded-xl group transition duration-0 font-semibold" exact-active-class="text-blue-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span class="text-lg" :class="isActiveLink('/') ? 'text-blue-primary font-semibold' : 'group-hover:text-cyan-700 text-gray-700'">Dashboard</span>
                </router-link>
            </nav>
            <section class="space-y-2">
                <p class="px-4 text-gray-400">Apps</p>
                <nav>
                    <router-link to="/campaign" class="flex items-center py-3 px-4 hover:bg-sky-100 space-x-2 hover:rounded-xl group transition duration-0 font-semibold" exact-active-class="text-blue-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                        </svg>
                        <span class="text-lg" :class="isActiveLink('/campaign') ? 'text-blue-primary font-semibold' : 'group-hover:text-cyan-700 text-gray-700'">Campaign</span>
                    </router-link>
                </nav>
                <nav>
                    <router-link to="/audience" class="flex items-center justify-between py-3 px-4 hover:bg-sky-100 space-x-2 hover:rounded-xl group transition duration-0 font-semibold" exact-active-class="text-blue-primary">
                        <div class="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            <span class="text-lg" :class="isActiveLink('/audience') ? 'text-blue-primary font-semibold' : 'group-hover:text-cyan-700 text-gray-700'">Audience</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" :class="isMenuAudienceOpen ? 'transform rotate-180' : ''">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </router-link>
                    <router-link to="/audience-group" v-if="isMenuAudienceOpen" class="flex items-center py-3 pl-8 hover:bg-sky-100 space-x-2 hover:rounded-xl group transition duration-0 font-semibold" exact-active-class="text-blue-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        <span class="text-lg" :class="isActiveLink('/audience-group') ? 'text-blue-primary font-semibold' : 'group-hover:text-cyan-700 text-gray-700'">Group</span>
                    </router-link>
                </nav>
                <nav>
                    <router-link to="/message" class="flex items-center py-3 px-4 hover:bg-sky-100 space-x-2 hover:rounded-xl group transition duration-0 font-semibold" exact-active-class="text-blue-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                        <span class="text-lg" :class="isActiveLink('/message') ? 'text-blue-primary font-semibold' : 'group-hover:text-cyan-700 text-gray-700'">Message</span>
                    </router-link>
                </nav>
                <nav>
                    <router-link to="/facebook" class="flex items-center py-3 px-4 hover:bg-sky-100 space-x-2 hover:rounded-xl group transition duration-0 font-semibold" exact-active-class="text-blue-primary">
                        <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                            <path d="M12 1.5C12 1.22386 11.7761 1 11.5 1H9C7.67392 1 6.40215 1.52678 5.46447 2.46447C4.52678 3.40215 4 4.67392 4 6V8.5C4 8.77614 3.77614 9 3.5 9H1.5C1.22386 9 1 9.22386 1 9.5V12.5C1 12.7761 1.22386 13 1.5 13H3.5C3.77614 13 4 13.2239 4 13.5V20.5C4 20.7761 4.22386 21 4.5 21H7.5C7.77614 21 8 20.7761 8 20.5V13.5C8 13.2239 8.22386 13 8.5 13H10.6096C10.839 13 11.039 12.8439 11.0947 12.6213L11.8447 9.62127C11.9236 9.30569 11.6849 9 11.3596 9H8.5C8.22386 9 8 8.77614 8 8.5V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H11.5C11.7761 5 12 4.77614 12 4.5V1.5Z" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="text-lg" :class="isActiveLink('/facebook') ? 'text-blue-primary font-semibold' : 'group-hover:text-cyan-700 text-gray-700'">Facebook</span>
                    </router-link>
                </nav>

            </section>
            <section class="space-y-2">
                <p class="px-4 text-gray-400">Settings</p>
                <nav>
                    <router-link to="/account" class="flex items-center py-3 px-4 hover:bg-sky-100 space-x-2 hover:rounded-xl group transition duration-0 font-semibold" exact-active-class="text-blue-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span class="text-lg" :class="isActiveLink('/account') ? 'text-blue-primary font-semibold' : 'group-hover:text-cyan-700 text-gray-700'">Account</span>
                    </router-link>
                </nav>
            </section>
        </div>
        <div class="bg-blue-50 w-full md:w-[calc(100%-16rem)] py-6 px-8" :class="{ 'hidden md:block': showSidebar }">
            <p class="text-2xl font-bold pt-2 pb-4">{{ $route.name }}</p>
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { timer } from "rxjs";
import router from "@/router";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

const route = useRoute();
const store = useUserStore();

const name = computed(() => store.name);
const email = computed(() => store.email);
const role = computed(() => store.role);
const token = computed(() => store.token);

const showSidebar = ref(false);
const showOption = ref(false);

function onLeaveShowOption(): void {
    timer(300).subscribe(() => showOption.value = false);
}

onMounted(() => {
    if (token.value.trim().length < 1) {
        signOut();
    }
})

function signOut(): void {
    store.removeData();
    router.push("/sign-in");
}

function isActiveLink(path: string): boolean {
    return route.path === path;
}

const isMenuAudienceOpen = computed(() => route.path.includes("/audience"));

watch(route, () => {
    showSidebar.value = false;
})
</script>