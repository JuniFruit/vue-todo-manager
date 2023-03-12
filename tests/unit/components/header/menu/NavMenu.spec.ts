import { IMenuItem } from "@/components/header/menu/menu.data";
import NavMenu from "@/components/header/menu/NavMenu.vue";
import { Wrapper } from "@vue/test-utils";
import { createCustomWrapper } from "../../../utils/general";
import Dialog from "@/components/header/menu/Dialog.vue";

describe("NavMenu.vue component", () => {
  let wrapper: Wrapper<NavMenu>;
  const links: IMenuItem[] = [
    {
      link: "/",
      title: "Dashboard",
      icon: "mdi-folder",
    },
    {
      link: "/projects",
      title: "Projects",
      icon: "mdi-folder",
    },
  ];

  beforeEach(() => {
    wrapper = createCustomWrapper<NavMenu>(NavMenu, {
      propsData: {
        links,
      },
      stubs: { Dialog },
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
  });

  it("renders links from menuLinks", () => {
    expect(wrapper.text()).toMatch(links[0].title);
    expect(wrapper.text()).toMatch(links[1].title);
  });
  it("renders links in vuetify list", () => {
    const vList = wrapper.find(".v-list");
    expect(vList).toMatchSnapshot();
  });

  it("renders vuetify user avatar", () => {
    const avatar = wrapper.find(".v-avatar");
    expect(avatar.exists()).toBe(true);
  });
});
