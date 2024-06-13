<script setup lang="ts">
import { usePointsStore } from "@/store/points";

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
                <LWmsTileLayer
                    url="https://maps.heigit.org/osm-wms/service"
                    attribution="HeiGIT <a href='https://osm-wms.de'>OSM WMS</a>"
                    layer-type="base"
                    name="osm-wms.de"
                    :max-zoom="10"
                    version="1.3.0"
                    format="image/png"
                    :transparent="true"
                    layers="osm_auto:all"
                />
                <div>
                    <LMarker
                        v-for="point in points"
                        :key="point.id"
                        :lat-lng="point.latLng"
                    >
                        <LTooltip>
                            <div class="flex items-center">
                                <img src="/svg/point.svg" alt="" />
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
