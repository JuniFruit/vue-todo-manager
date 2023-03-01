import { IPersonInfo } from "@/components/person-cards/Cards.interface";
import { IProjectItem } from "@/components/projects-list/List.interface";
import Vue from "vue";
interface IState {
  toastMsg: string;
  toastType: ToastType;
  projects: IProjectItem[];
  users: IPersonInfo[];
}

type ToastType = "success" | "error";

const state: IState = {
  toastMsg: "",
  toastType: "success",
  projects: [],
  users: [],
};

export const store = Vue.observable<IState>({
  ...state,
});

export const mutations = {
  setToast(msg: string, type: ToastType = "success") {
    store.toastMsg = msg;
    store.toastType = type;
  },
  clearToast() {
    store.toastMsg = "";
  },
  setProjects(projects: IProjectItem[]) {
    store.projects = [...projects];
  },
  deleteProjectById(id: string) {
    store.projects = store.projects.filter(item => item.id !== id);
  },
  addProject(project: IProjectItem) {
    store.projects.unshift(project);
  },
  setUsers(users: IPersonInfo[]) {
    store.users = [...users];
  },
};
