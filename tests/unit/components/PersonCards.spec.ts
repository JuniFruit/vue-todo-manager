import PersonCards from "@/components/person-cards/PersonCards.vue";
import { Wrapper } from "@vue/test-utils";
import { createCustomWrapper } from "../utils/general";

describe("PersonCards.vue module", () => {
  let wrapper: Wrapper<PersonCards>;
  const users = [
    {
      name: "John Doe",
      role: "tester",
      avatar: "//",
    },
    {
      name: "John Doe2",
      role: "tester2",
      avatar: "//",
    },
  ];

  beforeEach(() => {
    wrapper = createCustomWrapper<PersonCards>(PersonCards, {
      propsData: {
        team: users,
      },
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
  });

  it("renders items in a list if it's not empty", () => {
    expect(wrapper.text()).toMatch(users[0].name);
    expect(wrapper.text()).toMatch(users[0].role);
  });
  it("renders vuetify cards", () => {
    const card = wrapper.find(".v-card");
    expect(card).toMatchSnapshot();
  });

  it("renders nothing if it's empty", () => {
    expect(expect(wrapper.text()).toMatch(users[0].name)).toBeFalsy();
  });
});
