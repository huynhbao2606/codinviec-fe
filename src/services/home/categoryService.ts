import { Category } from "@/types/home/Category";
import api from "@/interceptor/api";
import {IBaseResponse} from "@/types/common/BaseResponse";

export const categoryService = {
    async getAll(): Promise<Category[]> {
        const res = await api.get<IBaseResponse<Category[]>>("/category");
        if (!res.data.data) {
            throw new Error("Không lấy được category");
        }
        return res.data?.data;
    },
};
