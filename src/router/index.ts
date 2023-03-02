import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "dashboard",
    meta: {
      title: "Dashboard",
    },
    component: Dashboard,
  },
  {
    path: "/team_page",
    name: "team page",
    meta: {
      title: "Team",
    },
    // route level code-splitting
    // this generates a separate chunk (teamPage.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "teamPage" */ "../views/TeamPage.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    meta: {
      title: "Projects",
    },
    // route level code-splitting
    // this generates a separate chunk (projects.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/Projects.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
