import { IPersonInfo } from "@/components/person-cards/Cards.interface";
import PersonCards from "@/components/person-cards/PersonCards.vue";
import Team from "@/modules/team/Team.vue";
import { Wrapper } from "@vue/test-utils";
import { createCustomWrapper, createStore } from "../utils/general";

describe("Team.vue module", () => {
  let wrapper: Wrapper<Team>;

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
  const mockedFirestore = {
    getUsers: jest.fn(
      () =>
        new Promise((res, rej) => {
          store.users = users;
          return res("");
        })
    ),
  };
  const store = createStore({});

  beforeEach(() => {
    wrapper = createCustomWrapper<Team>(Team, {
      stubs: {
        PersonCards,
      },
      computed: {
        team() {
          return store.users || [];
        },
      },
      async created() {
        await mockedFirestore.getUsers();
      },
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
  });

  it("invokes firestore service for getUsers function", () => {
    (wrapper.vm.$options.created as any).forEach((hook: any) => hook.call());
    expect(mockedFirestore.getUsers).toHaveBeenCalled();
  });

  it("renders data from store if there is cached data", () => {
    store.users = users;
    const fromStore = wrapper.vm.$options.computed!.team as () => IPersonInfo[];
    expect(fromStore().length).toEqual(2);
  });
});
