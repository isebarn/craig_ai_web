import { defineStore } from "pinia";
import { api } from "boot/axios";

export const usePromptStore = defineStore("prompt", {
  state: () => ({
    _prompts: [],
    _currentResponse: "",
    _loading: false,
  }),

  getters: {
    prompts(state) {
      return state._prompts.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
    },

    currentResponse(state) {
      return state._currentResponse;
    },

    loading: (state) => state._loading,
  },

  actions: {
    getPrompts() {
      api.get("/prompts").then((response) => {
        this._prompts = response.data.prompts;
      });
    },

    async addPrompt(prompt) {
      this._loading = true;
      const response = await api.post("/prompt", { prompt });
      this._loading = false;
      this._prompts.push({
        prompt_text: prompt,
        response_text: response.data["response"],
      });
      this._currentResponse = response.data["response"];
      return response.data;
    },

    // set _currentResponse from passed value
    setCurrentResponse(response) {
      this._currentResponse = response;
    },
  },
});
