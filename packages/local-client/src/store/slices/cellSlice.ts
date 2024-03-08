import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type CellTypes = "code" | "text";

interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

export const fetchCells = createAsyncThunk("cell/fetch", async () => {
  const { data }: { data: Cell[] } = await axios.get("/cells");
  return data;
});

export const saveCells = createAsyncThunk(
  "cell/save",
  async (cells: Cell[]) => {
    await axios.post("/cells", { cells });
  },
);

const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    updateCell: (
      state,
      action: PayloadAction<{ id: string; content: string }>,
    ) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
    },
    moveCell: (
      state,
      action: PayloadAction<{ id: string; direction: "up" | "down" }>,
    ) => {
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    insertCellAfter: (
      state,
      action: PayloadAction<{
        id: string | null;
        type: CellTypes;
      }>,
    ) => {
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id,
      );

      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCells.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCells.fulfilled, (state, action) => {
      state.order = action.payload.map((cell) => cell.id);
      state.data = action.payload.reduce(
        (acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        },
        {} as CellsState["data"],
      );
    });
    builder.addCase(fetchCells.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(saveCells.rejected, (_state, action) => {
      console.log(action.payload);
    });
  },
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

const cellReducer = cellSlice.reducer;
export default cellReducer;
export const { updateCell, deleteCell, moveCell, insertCellAfter } =
  cellSlice.actions;
export type { Cell, CellTypes };
