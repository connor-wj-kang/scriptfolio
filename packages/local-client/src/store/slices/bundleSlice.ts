import { startBuild } from "@/bundler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface BundlesState {
  [ket: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

type Data = {
  cellId: string;
  input: string;
};

const initialState: BundlesState = {};

const startBundle = createAsyncThunk(
  "bundle/startBundle",
  async (data: Data) => {
    const result = await startBuild(data.input);
    return result;
  },
);

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(startBundle.pending, (state, action) => {
      state[action.meta.arg.cellId] = {
        loading: true,
        code: "",
        err: "",
      };
    });

    builder.addCase(startBundle.fulfilled, (state, action) => {
      state[action.meta.arg.cellId] = {
        loading: false,
        code: action.payload.code,
        err: action.payload.err,
      };
    });
  },
});

const bundleReducer = bundleSlice.reducer;
export default bundleReducer;
export { startBundle };
