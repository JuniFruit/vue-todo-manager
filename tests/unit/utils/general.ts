import Layout from "@/modules/layout/Layout.vue";
import { routes } from "@/router/index";
import { IState } from "@/store/store";
import {
  createLocalVue,
  mount,
  shallowMount,
  ThisTypedMountOptions,
  Wrapper,
} from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuetify from "vuetify";

export const createRouter = () => {
  return new VueRouter({ mode: "history", base: process.env.BASE_URL, routes });
};

export const createStore = (state: IState | {} = {}) => {
  return { ...state };
};

export const createCustomWrapper = <T extends Layout>(
  component: any,
  options: ThisTypedMountOptions<T> = {}
): Wrapper<T> => {
  const vuetify = new Vuetify();
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = createRouter();
  return mount(component, {
    localVue,
    router,
    vuetify,
    ...options,
  });
};
