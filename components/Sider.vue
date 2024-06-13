<script setup lang="ts">
import { usePointsStore } from "@/store/points";

const { points } = storeToRefs(usePointsStore());

const pointsNumber = 6;
const currentPage = ref<number>(1);

const paginatedPoints = computed(() => {
    const start = (currentPage.value - 1) * pointsNumber;
    const end = start + pointsNumber;
    return points.value.slice(start, end);
});

const pageView = (page: number) => {
    currentPage.value = page;
};

const state = reactive({
    indeterminate: true,
    checkAll: false,
    checkedList: [] as number[],
});

const onCheckAllChange = (e: any) => {
    const plainOptions = paginatedPoints.value.map((point) => point.number);
    state.checkedList = e.target.checked ? plainOptions : [];
    state.indeterminate = false;
    state.checkAll = e.target.checked;
};

watch(
    () => paginatedPoints.value,
    (newVal) => {
        const plainOptions = newVal.map((point) => point.number);
        state.indeterminate =
            !!state.checkedList.length &&
            state.checkedList.length < plainOptions.length;
        state.checkAll = state.checkedList.length === plainOptions.length;
    },
    { immediate: true }
);

watch(
    () => state.checkedList,
    (val) => {
        const plainOptions = paginatedPoints.value.map((point) => point.number);
        state.indeterminate = !!val.length && val.length < plainOptions.length;
        state.checkAll = val.length === plainOptions.length;
    }
);
</script>

<template>
    <div class="w-full p-3">
        <div class="flex flex-col gap-4">
            <div class="flex justify-between">
                <h1 class="text-xl font-bold">Точки</h1>
                <img src="/svg/list-search.svg" alt="search" />
            </div>
            <div class="flex justify-between">
                <a-checkbox
                    v-model:checked="state.checkAll"
                    :indeterminate="state.indeterminate"
                    @change="onCheckAllChange"
                >
                    Выбрать все ({{ points.length }})
                </a-checkbox>
                <div class="flex">
                    <img src="/svg/brush.svg" alt="" />
                    <img src="/svg/location.svg" alt="" />
                </div>
            </div>
            <div>
                <ul>
                    <li
                        v-for="point in paginatedPoints"
                        :key="point.id"
                        class="mb-2"
                    >
                        <div class="border rounded p-4 flex flex-col gap-3">
                            <div class="flex justify-between">
                                <div class="flex items-center">
                                    <a-checkbox-group
                                        v-model:value="state.checkedList"
                                    >
                                        <a-checkbox :value="point.number">
                                            Точка № {{ point.number }}
                                        </a-checkbox>
                                    </a-checkbox-group>
                                    <p class="text-xs">
                                        код {{ Math.random() + 2 }}
                                    </p>
                                </div>
                                <img src="/svg/burger.svg" alt="" />
                            </div>
                            <div class="flex gap-2">
                                <img
                                    src="/svg/location.svg"
                                    width="15"
                                    alt=""
                                />
                                <span>ул. 5-я Парковаяя 33-489</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <a-pagination
                    :total="points.length"
                    :pageSize="pointsNumber"
                    @change="pageView"
                />
            </div>
        </div>
    </div>
</template>
