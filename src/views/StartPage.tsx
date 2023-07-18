import { Transition, defineComponent, ref } from 'vue';
import style from './StartPage.module.scss';
import { Button } from '../shared/Button';
import { FloatButton } from '../shared/FloatButton';
import { Center } from '../shared/Center';
import { Icon } from '../shared/Icon';
import { NavBar } from '../shared/NavBar';
import { OverLay } from '../shared/OverLay';
import { RouterLink } from 'vue-router';
import { MainLayout } from '../layouts/MainLayout';

export const StartPage = defineComponent({
    setup: (props, context) => {
        const overlayVisible = ref(false)
        const onClickMenu = () => {
            overlayVisible.value = !overlayVisible.value
        }
        return () => (
            <MainLayout class={style.wrapper}>
                {{
                    title: () => '自由记账',
                    icon: () => <Icon name='menu' onClick={onClickMenu} />,
                    default: () => (
                        <div>
                            <Center class={style.icon_wrapper}>
                                <Icon name='bird' class={style.icon} />
                            </Center>
                            <div class={style.button_wrapper}>
                                <RouterLink to="/items/create">
                                    <Button class={style.button}>开始记账</Button>
                                </RouterLink>
                            </div>
                            <RouterLink to="/items/create">
                                <FloatButton iconName='add' />
                            </RouterLink>
                            <Transition
                                leaveActiveClass={style.leaveActive}
                                enterActiveClass={style.enterActive}
                                leaveToClass={style.leaveTo}
                                enterFromClass={style.enterFrom}>
                                {overlayVisible.value && <OverLay />}
                            </Transition>
                        </div>
                    )
                }
                }
            </MainLayout >
            // <div class={style.wrapper}>
            //     <NavBar>
            //         {{
            //             icon: () => <Icon name='menu' onClick={onClickMenu} />,
            //             title: () => '自由记账',
            //         }}
            //     </NavBar>
            //     <Center class={style.icon_wrapper}>
            //         <Icon name='bird' class={style.icon} />
            //     </Center>
            //     <div class={style.button_wrapper}>
            //         <RouterLink to="/items/create">
            //             <Button class={style.button}>开始记账</Button>
            //         </RouterLink>
            //     </div>
            //     <RouterLink to="/items/create">
            //         <FloatButton iconName='add' />
            //     </RouterLink>
            //     <Transition
            //         leaveActiveClass={style.leaveActive}
            //         enterActiveClass={style.enterActive}
            //         leaveToClass={style.leaveTo}
            //         enterFromClass={style.enterFrom}>
            //         {overlayVisible.value && <OverLay />}
            //     </Transition>
            // </div >
        )
    }
})