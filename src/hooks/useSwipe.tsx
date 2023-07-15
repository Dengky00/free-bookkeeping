import { Ref, computed, onMounted, onUnmounted, ref } from 'vue';

type Point = { x: number; y: number; }
//手势滑动
export const useSwipe = (element: Ref<HTMLElement | null>) => {
    const swiping = ref(false)
    const start = ref<Point>()
    const end = ref<Point>()
    const distance = computed(() => {
        if (start.value && end.value) {
            return {
                x: end.value.x - start.value.x,
                y: end.value.y - start.value.y,
            }
        }
    })
    const direction = computed(() => {
        if (distance.value) {
            const { x, y } = distance.value
            if (Math.abs(x) < Math.abs(y)) {
                return y < 0 ? 'up' : 'down'
            } else {
                return x < 0 ? 'left' : 'right'
            }
        }
    })
    const onStart = (e: TouchEvent) => {
        swiping.value = true
        end.value = start.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
    }
    const onMove = (e: TouchEvent) => {
        if (start.value) {
            end.value = { x: e.touches[0].screenX, y: e.touches[0].screenY, }
        }
    }
    const onEnd = (e: TouchEvent) => {
        swiping.value = false
    }
    onMounted(() => {
        if (element.value) {
            element.value.addEventListener('touchstart', onStart)
            element.value.addEventListener('touchmove', onMove)
            element.value.addEventListener('touchend', onEnd)
        }
    })
    onUnmounted(() => {
        if (element.value) {
            element.value.removeEventListener('touchstart', onStart)
            element.value.removeEventListener('touchmove', onMove)
            element.value.removeEventListener('touchend', onEnd)
        }
    })
    return { distance, direction }
}