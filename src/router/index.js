import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/index"
        },
        {
            path: "/index",
            name: "index",
            component: () => import("../views/index/index.vue"),

        },
        {
            path: "/home",
            name: "home",
            component: () => import("@/views/home/home.vue"),
        }

    ]
})

export default router