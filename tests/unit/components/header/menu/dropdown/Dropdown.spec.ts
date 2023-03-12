import Dropdown from "@/components/header/menu/Dropdown.vue";
import { menuLinks } from "@/components/header/menu/menu.data";
import { Wrapper } from "@vue/test-utils";
import { createCustomWrapper } from "../../../../utils/general";

describe("Dropdown.vue component", () => {
  let wrapper: Wrapper<Dropdown>;

  beforeEach(() => {
    wrapper = createCustomWrapper<Dropdown>(Dropdown, {});
  });

  afterEach(() => {
    wrapper.vm.$destroy();
  });

  it("renders chevron down when not clicked", () => {
    const chevronDown = wrapper.find(".mdi-chevron-down");
    expect(chevronDown.exists()).toBe(true);
  });
  it("renders chevron up when clicked", async () => {
    const dropdownButton = wrapper.find(".v-btn");
    await dropdownButton.trigger("click");
    const chevronUp = wrapper.find(".mdi-chevron-up");
    expect(chevronUp.exists()).toBe(true);
  });

  it("opens vuetify list with links when clicked", async () => {
    const dropdownButton = wrapper.find(".v-btn");
    await dropdownButton.trigger("click");

    const list = wrapper.find(".v-list");
    expect(list).toMatchSnapshot();
    menuLinks.forEach(link => {
      expect(wrapper.html()).toMatch(link.title);
    });
  });

  it("redirects to a page when link is clicked", async () => {
    const dropdownButton = wrapper.find(".v-btn");
    await dropdownButton.trigger("click");
    const routerSpy = jest.spyOn(wrapper.vm.$router, "push");
    const link = wrapper.find("a");
    await link.trigger("click");

    expect(routerSpy).toHaveBeenCalled();
  });
});
