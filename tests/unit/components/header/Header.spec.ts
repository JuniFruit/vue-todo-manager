import Header from "@/components/header/Header.vue";
import Dropdown from "@/components/header/menu/Dropdown.vue";
import NavMenu from "@/components/header/menu/NavMenu.vue";
import Toast from "@/components/header/menu/Toast.vue";
import { Wrapper } from "@vue/test-utils";
import { createCustomWrapper } from "../../utils/general";
describe("Header.vue component", () => {
  let wrapper: Wrapper<Header>;

  beforeEach(() => {
    wrapper = createCustomWrapper<Header>(Header, {
      stubs: {
        Toast: Toast,
        NavMenu: NavMenu,
        Dropdown: Dropdown,
      },
    });
  });
  afterEach(() => {
    wrapper.vm.$destroy();
  });

  it("has vuetify dropdown", () => {
    const dropdown = wrapper.find(".v-menu");
    expect(dropdown.exists()).toBe(true);
  });
  it("has vuetify flat toolbar", () => {
    const toolbar = wrapper.find(".v-toolbar__content");
    expect(toolbar.exists()).toBe(true);
  });
  it("has vuetify hamburger menu", () => {
    const hamburger = wrapper.find(".v-app-bar__nav-icon");
    expect(hamburger.exists()).toBe(true);
  });
  it("has vuetify nav drawer", () => {
    const drawer = wrapper.find(".v-navigation-drawer");
    expect(drawer.exists()).toBe(true);
  });
  it("renders vuetify drawer when hamburger is clicked", async () => {
    const hamburger = wrapper.find(".v-app-bar__nav-icon");
    const drawerBeforeClick = wrapper.find(".v-navigation-drawer--open");
    expect(drawerBeforeClick.exists()).toBe(false);
    await hamburger.trigger("click");
    const drawerAfterClick = wrapper.find(".v-navigation-drawer--open");
    expect(drawerAfterClick.exists()).toBe(true);
  });
});
