import { IPersonInfo } from "@/components/person-cards/Cards.interface";
import { IProjectItem } from "@/components/projects-list/List.interface";
import db from "@/firebase.init";
import { mutations, store } from "@/store/store";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const Firestore = {
  /**
   * @param {boolean} rehydration - request new data from a server every time on the background.
   * Cached results will be returned first then rehydration process will fire on the background.
   * */
  async getProjects(rehydration = false) {
    const cached = store.projects;
    rehydration ? this._invalidateProjects() : null;

    if (cached.length) {
      return;
    } else {
      this._invalidateProjects();
    }
  },
  async _queryDocs<T>(docCollection: "projects" | "users") {
    const querySnapshot = await getDocs(collection(db, docCollection));
    if (!querySnapshot) return;
    const docs: T[] = [];
    querySnapshot.forEach(doc => {
      docs.push({ ...(doc.data() as T), id: doc.id });
    });
    return docs;
  },
  async _invalidateProjects() {
    const data = await this._queryDocs<IProjectItem>("projects");
    mutations.setProjects(data || []);
  },

  async addProject(project: IProjectItem) {
    let isError = false;

    try {
      await addDoc(collection(db, "projects"), project);
      this._invalidateProjects();
      return {
        isError,
        message: "",
      };
    } catch (e: any) {
      isError = true;
      return {
        isError,
        message: e.message,
      };
    }
  },
  async deleteProject(id: string) {
    let isError = false;
    try {
      await deleteDoc(doc(db, "projects", id));
      await this._invalidateProjects();
      return {
        isError,
        message: "",
      };
    } catch (e: any) {
      isError = true;
      return {
        isError,
        message: e.message,
      };
    }
  },
  async getUsers() {
    const cached = store.users;
    if (cached.length) {
      return;
    } else {
      const data = await this._queryDocs<IPersonInfo>("users");
      mutations.setUsers(data || []);
    }
  },
};
