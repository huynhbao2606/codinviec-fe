import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Category } from "@/types/home/Category";
import { categoryService } from "@/services/home/categoryService";

interface CategoryState {
    data: Category[];
    loading: boolean;
    error: AxiosError | null;
}

const initialState: CategoryState = {
    data: [],
    loading: false,
    error: null,
};

// Fetch categories qua service
export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await categoryService.getAll();
        } catch (error: unknown) {
            // Trả về error object để component có thể xử lý chi tiết
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError);
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError) || (action.error as AxiosError);
            });
    },
});

export const categoryReducer = categorySlice.reducer;
