import { Ref, computed, onMounted, onUnmounted, ref } from 'vue';

type Point = { x: number; y: number; }
interface Options {
    beforeStart?: (e: TouchEvent) => void
    afterStart?: (e: TouchEvent) => void
    beforeMove?: (e: TouchEvent) => void
    afterMove?: (e: TouchEvent) => void
    beforeEnd?: (e: TouchEvent) => void
    afterEnd?: (e: TouchEvent) => void
}
//手势滑动
export const useSwipe = (element: Ref<HTMLElement | undefined>, options?: Options) => {
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
        options?.beforeStart?.(e)
        swiping.value = true
        end.value = start.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
        options?.afterStart?.(e)
    }
    const onMove = (e: TouchEvent) => {
        options?.beforeMove?.(e)
        if (start.value) {
            end.value = { x: e.touches[0].screenX, y: e.touches[0].screenY, }
        }
        options?.afterMove?.(e)
    }
    const onEnd = (e: TouchEvent) => {
        options?.beforeEnd?.(e)
        swiping.value = false
        options?.afterEnd?.(e)
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
    return { swiping, distance, direction }
}