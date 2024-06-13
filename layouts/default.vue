<template>
    <a-layout class="w-full h-screen">
        <a-layout-sider style="background-color: white;" width="550">
            <Sider />
        </a-layout-sider>
        <slot />
        <a-layout >
            <a-layout-content>
                <MapPoint />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
