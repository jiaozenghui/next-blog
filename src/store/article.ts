import { create } from "zustand";

export const initValue = {} as articleDetails;

type dataType = typeof initValue;

type actionType = {
  setArticleData: (data: dataType) => any;
  updateData: (
    data: Partial<{ [K in keyof typeof initValue]: (typeof initValue)[K] }> | null,
  ) => any;
  resetData: () => any;
};

/** 更新用户端文章编辑数据*/
const CurrentArticleData = create<{ data: dataType } & actionType>(
  (set) => ({
    data: initValue,
    /** 更新整体对象*/
    setArticleData: (data: dataType) => set({ data: data }),
    /** 更新单一属性*/
    updateData: (state) => set((s) => ({ data: { ...s.data, ...state } })),
    /** 重置属性*/
    resetData: () => set({ data: initValue }),
  }),
);
export default CurrentArticleData;
