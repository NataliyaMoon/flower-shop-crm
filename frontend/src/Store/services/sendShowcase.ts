import { api } from "../../features/index";

const sendShowcaseApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendShowcase: build.mutation<void, FormData>({
      query: (post) => ({
        url: "/sales/showcase_custom",
        method: "POST",
        body: post
      })
    })
  }),
  overrideExisting: false
});

export const { useSendShowcaseMutation } = sendShowcaseApi;
