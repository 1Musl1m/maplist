<script setup lang="ts">
import { usePointsStore } from '@/store/points';

const pointsStore = usePointsStore();
const { points } = storeToRefs(pointsStore);
</script>

<template>
    <div>
        <h1>Карта</h1>
        <div>
            <LMap
                style="height: 650px"
                :zoom="2"
                :center="[41.8329, -87.7327]"
                :use-global-leaflet="false"
            >
                <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    layer-type="base"
                    name="OpenStreetMap"
                />
                <div>
                    <LMarker
                        v-for="point in points"
                        :key="point.id"
                        :lat-lng="point.latLng"
                    >
                        <LTooltip>
                            <div class="flex items-center">
                                <img src="/svg/point.svg" alt="">
                            <h2>Точка № {{ point.number }}</h2>
                            </div>
                            Hi! I'm staying here on this location!
                        </LTooltip>
                    </LMarker>
                </div>
            </LMap>
        </div>
    </div>
</template>
