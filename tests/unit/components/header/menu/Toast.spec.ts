import Toast from "@/components/header/menu/Toast.vue";
import { Wrapper } from "@vue/test-utils";
import { createCustomWrapper } from "../../../utils/general";
import { IState, store } from "@/store/store";
import Vue from "vue";

describe("Toast.vue component", () => {
  let wrapper: Wrapper<Toast>;
  const mockedStore = Vue.observable<Pick<IState, "toastMsg" | "toastType">>({
    toastMsg: "",
    toastType: "success",
  });
  const mockedSetToast = (msg: string, type: "success" | "error") => {
    mockedStore.toastMsg = msg;
    mockedStore.toastType = type;
  };
  const mockedClearToast = () => {
    mockedStore.toastMsg = "";
    mockedStore.toastType = "success";
  };

  const ERR_MSG = "Network Error";
  const SUCC_MSG = "Success!";

  beforeEach(() => {
    wrapper = createCustomWrapper<Toast>(Toast, {
      computed: {
        toastOpen: {
          get: () => !!mockedStore.toastMsg,
          set: () => mockedClearToast(),
        },
        toastType: () => mockedStore.toastType,
        msg: () => mockedStore.toastMsg,
      },
    });
  });

  afterEach(() => {
    mockedClearToast();
    jest.clearAllTimers();

    wrapper.vm.$destroy();
  });

  it("renders nothing if store is empty", () => {
    expect(wrapper.find(".v-snack--active").exists()).toBe(false);
  });

  it("renders error message when it is passed to the store", async () => {
    await mockedSetToast(ERR_MSG, "error");
    expect(mockedStore.toastMsg).toMatch(ERR_MSG);
    expect(wrapper.find(".v-snack--active").text()).toMatch(ERR_MSG);
  });

  it("renders success message when it is passed to the store", async () => {
    await mockedSetToast(SUCC_MSG, "success");
    expect(mockedStore.toastMsg).toMatch(SUCC_MSG);
    expect(wrapper.find(".v-snack--active").text()).toMatch(SUCC_MSG);
  });

  it("closes after sometime seconds", async () => {
    jest.useFakeTimers();
    await mockedSetToast(SUCC_MSG, "success");
    jest.advanceTimersByTime(4001);
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".v-snack--active").exists()).toBe(false);
  });

  it("clears toast and closes snack bar when close button is clicked", async () => {
    await mockedSetToast(SUCC_MSG, "success");
    await wrapper.find(".v-btn").trigger("click");
    expect(mockedStore.toastMsg).toMatch("");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".v-snack--active").exists()).toBe(false);
  });
});
