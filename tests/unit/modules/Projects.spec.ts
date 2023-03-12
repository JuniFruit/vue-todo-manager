import { IProjectItem } from "@/components/projects-list/List.interface";
import ProjectsList from "@/components/projects-list/ProjectsList.vue";
import Projects from "@/modules/projects/Projects.vue";
import { Wrapper } from "@vue/test-utils";
import { createCustomWrapper, createStore } from "../utils/general";
describe("Projects.vue module", () => {
  let wrapper: Wrapper<Projects>;
  const projects: IProjectItem[] = [
    {
      title: "Test",
      id: " 0.5",
      person: "tester",
      due: "21th March 2023",
      status: "ongoing",
      content: "testing",
    },
    {
      title: "ATest",
      id: " 0.7",
      person: "ztester",
      due: "21th March 2023",
      status: "ongoing",
      content: "testing",
    },
  ];
  const store = createStore({});
  const mockedFirestore = {
    getProjects: jest.fn(
      () =>
        new Promise((res, rej) => {
          store.projects = projects;
          return res("");
        })
    ),
  };

  beforeEach(() => {
    store.projects = projects;
    wrapper = createCustomWrapper<Projects>(Projects, {
      computed: {
        projects() {
          return store.projects || [];
        },
      },
      async created() {
        await mockedFirestore.getProjects();
      },
      stubs: {
        ProjectsList,
      },
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
    store.projects = [];
    mockedFirestore.getProjects.mockReset();
    mockedFirestore.getProjects.mockRestore();
  });

  it("renders sort by person and by project buttons", () => {
    const byPerson = wrapper.find("[data-person]");
    const byProject = wrapper.find("[data-project]");
    expect(byPerson.exists()).toBe(true);
    expect(byProject.exists()).toBe(true);
  });

  it("invokes firestore service function", () => {
    (wrapper.vm.$options.created as any).forEach((hook: any) => hook.call());
    expect(mockedFirestore.getProjects).toHaveBeenCalled();
  });

  // it("renders data from store", () => {
  //   store.projects = projects;
  //   const projectsFromStore = wrapper.vm.$options.computed!
  //     .projects as () => IProjectItem[];
  //   expect(projectsFromStore().length).toEqual(2);
  // });
  // it("renders projects from store", () => {
  //   const projectsFromStore = wrapper.vm.$options.computed!
  //     .projects as () => IProjectItem[];
  //   expect(wrapper.html()).toMatch(projectsFromStore()[0].title);
  //   expect(wrapper.html()).toMatch(projectsFromStore()[0].due);
  //   expect(wrapper.html()).toMatch(projectsFromStore()[0].status);
  //   expect(wrapper.html()).toMatch(projectsFromStore()[0].person);
  // });

  it("sorts by person when by person btn clicked", async () => {
    const byPerson = wrapper.find("[data-person]");
    await byPerson.trigger("click");

    expect(store.projects![0].person).toEqual("tester");
    expect(store.projects![1].person).toEqual("ztester");
  });
  it("sorts by title when by project btn clicked", async () => {
    const byProject = wrapper.find("[data-project]");
    await byProject.trigger("click");

    expect(store.projects![0].title).toEqual("ATest");
    expect(store.projects![1].title).toEqual("Test");
  });
});
