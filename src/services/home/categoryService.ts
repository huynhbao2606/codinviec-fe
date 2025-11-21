import { Category } from "@/types/home/Category";
import { BaseResponse } from "@/types/common/BaseResponse";
import api from "@/interceptor/api";

export const categoryService = {
    async getAll(): Promise<Category[]> {
        const res = await api.get<BaseResponse<Category[]>>("/category");
        return res.data.data;
    },
};
