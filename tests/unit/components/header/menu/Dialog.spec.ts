import Dialog from "@/components/header/menu/Dialog.vue";
import { Wrapper } from "@vue/test-utils";
import { createCustomWrapper } from "../../../utils/general";
import { Firestore } from "@/services/firestore.service";
import { mutations } from "@/store/store";

describe("Dialog.vue component", () => {
  let wrapper: Wrapper<Dialog>;
  const TITLE = "Testing project";
  const INFO = "To test fields";
  const DUE = "2023-09-09";
  const ERR_MSG = "Minimum length is 3 characters";
  const SUCC_MSG = "Successfully added!";
  const NET_ERR = "Network Error";
  const mockedPromise = Promise.resolve({ isError: false, message: "" });
  const mockedRejPromise = { isError: true, message: NET_ERR };

  it("renders fields that match snapshot", () => {
    wrapper = createCustomWrapper<Dialog>(Dialog, {
      data() {
        return {
          isOpen: true,
        };
      },
    });
    expect(wrapper.find(".v-dialog__content").exists()).toBe(true);
  });

  it("shows error message when blank from submitted ", async () => {
    wrapper = createCustomWrapper<Dialog>(Dialog, {
      data() {
        return {
          isOpen: true,
        };
      },
    });
    await wrapper.find(".v-form").trigger("submit.prevent");
    expect(wrapper.find(".v-messages__message").text()).toMatch(ERR_MSG);
  });

  describe("when submitted with user inputs", () => {
    let resolvedSpy: any;

    beforeEach(() => {
      resolvedSpy = jest
        .spyOn(Firestore, "addProject")
        .mockImplementation(jest.fn(() => mockedPromise));

      wrapper = createCustomWrapper<Dialog>(Dialog, {
        data() {
          return {
            isOpen: true,
            due: DUE,
          };
        },
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
      jest.resetAllMocks();
      wrapper.vm.$destroy();
    });

    it("invokes Firestore service when submitted with project info object", async () => {
      wrapper.find("input[name=Title]").setValue(TITLE);
      wrapper.find("textarea[name=Information]").setValue(INFO);

      await wrapper.find(".v-form").trigger("submit.prevent");
      expect(resolvedSpy).toHaveBeenCalledWith({
        title: TITLE,
        person: "User",
        due: "9th Sep 2023",
        content: INFO,
        status: "ongoing",
        id: "0",
      });
    });

    it("sets loading state when submitted", () => {
      wrapper.find("input[name=Title]").setValue(TITLE);
      wrapper.find("textarea[name=Information]").setValue(INFO);

      wrapper.find(".v-form").trigger("submit.prevent");
      expect(wrapper.vm.$data.isLoading).toBe(true);
    });
    it("sets store toast to success value when promise resolved", async () => {
      wrapper.find("input[name=Title]").setValue(TITLE);
      wrapper.find("textarea[name=Information]").setValue(INFO);
      const toast = jest.spyOn(mutations, "setToast");

      await wrapper.find(".v-form").trigger("submit.prevent");

      expect(toast).toHaveBeenCalledWith(SUCC_MSG);
    });

    it("sets store toast to error value when promise rejected", async () => {
      wrapper.find("input[name=Title]").setValue(TITLE);
      wrapper.find("textarea[name=Information]").setValue(INFO);
      const toast = jest.spyOn(mutations, "setToast");
      jest
        .spyOn(Firestore, "addProject")
        .mockImplementation(jest.fn(async () => mockedRejPromise));
      await wrapper.find(".v-form").trigger("submit.prevent");

      expect(toast).toHaveBeenCalledWith(NET_ERR, "error");
    });

    it("closes dialog on success", async () => {
      wrapper.find("input[name=Title]").setValue(TITLE);
      wrapper.find("textarea[name=Information]").setValue(INFO);

      await wrapper.find(".v-form").trigger("submit.prevent");
      const dialog = wrapper.find(".v-dialog__content--active");
      expect(dialog.exists()).toBe(false);
    });

    it("renders dialog on error", async () => {
      wrapper.find("input[name=Title]").setValue(TITLE);
      wrapper.find("textarea[name=Information]").setValue(INFO);
      jest
        .spyOn(Firestore, "addProject")
        .mockImplementation(jest.fn(async () => mockedRejPromise));
      const dialog = wrapper.find(".v-dialog__content--active");
      expect(dialog).toMatchSnapshot();
    });

    it("changes loading state to false on error", async () => {
      wrapper.find("input[name=Title]").setValue(TITLE);
      wrapper.find("textarea[name=Information]").setValue(INFO);
      jest
        .spyOn(Firestore, "addProject")
        .mockImplementation(jest.fn(async () => mockedRejPromise));

      expect(wrapper.vm.$data.isLoading).toBe(false);
    });

    it("changes loading state to false on success", async () => {
      wrapper.find("input[name=Title]").setValue(TITLE);
      wrapper.find("textarea[name=Information]").setValue(INFO);

      expect(wrapper.vm.$data.isLoading).toBe(false);
    });
  });
});
