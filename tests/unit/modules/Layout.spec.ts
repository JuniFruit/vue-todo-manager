import Layout from "@/modules/layout/Layout.vue";
import { createLocalVue, Wrapper } from "@vue/test-utils";
import VueRouter from "vue-router";
import { createCustomWrapper, createRouter } from "../utils/general";

describe("Layout.vue", () => {
  let wrapper: Wrapper<Layout>;

  beforeEach(() => {
    wrapper = createCustomWrapper<Layout>(Layout, {
      stubs: ["app-header", "router-view", "router-link"],
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
  });

  it("renders header component", () => {
    expect(wrapper.findComponent({ name: "Header" }).exists()).toBe(true);
  });
});
