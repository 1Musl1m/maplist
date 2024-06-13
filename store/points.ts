import { defineStore } from 'pinia';

interface Point {
    id: number;
    number: number;
    latLng: [number, number];
}

function generatePoints(count: number): Point[] {
    const points: Point[] = [];
    for (let i = 1; i <= count; i++) {
        points.push({
            id: i,
            number: i,
            latLng: [
                (Math.random() + 1) * 19, 
                (Math.random() + 1) * 9.5,
            ],
        });
    }
    return points;
}

export const usePointsStore = defineStore('points', {
    state: () => ({
        points: generatePoints(100),
    }),
});
