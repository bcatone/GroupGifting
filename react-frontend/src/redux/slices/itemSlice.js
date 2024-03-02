import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { updateItemInPlant } from "../plants/plantSlice";

export const fetchAllItems = createAsyncThunk(
  "items/fetchAllItems",
  async () => {
    try {
      const response = await fetch(`/items`);
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (itemId) => {
    try {
      const response = await fetch(`/items/${itemId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateItemInApi = createAsyncThunk(
  "item/updateItemInApi",
  async ({ itemId, updatedItem }, thunkAPI) => {
    try {
      const response = await fetch(`/items/${itemId}`, {
        method: "PATCH",
        body: updatedItem,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const updatedItemData = {};
      updatedItem.forEach((value, key) => {
        updatedItemData[key] = value;
      });

    //   thunkAPI.dispatch(updateItemInPlant(updatedItemData));
      return updatedItemData;
    } catch (error) {
      throw error;
    }
  }
);

export const addItemToApi = createAsyncThunk(
  "items/addItemToApi",
  async (newItem) => {
    try {
      let requestBody;

      if (newItem instanceof FormData) {
        requestBody = {
          method: "POST",
          body: newItem,
        };
      } else {
        requestBody = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        };
      }

      const response = await fetch("/items", requestBody);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteItemFromApi = createAsyncThunk(
  "items/deleteItemFromApi",
  async (itemId) => {
    try {
      const response = await fetch(`/items/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Item deleted successfully.");
        return itemId;
      } else {
        throw new Error(`Failed to delete Item: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState: {
    allItems: [],
    individualItem: null,
    loadingAllItems: false,
    loadingIndividualItem: false,
    errorAllItems: null,
    errorIndividualItem: null,
  },
  reducers: {
    clearItems: (state) => {
      state.allItems = [];
      state.individualItem = null;
      state.loadingAllItems = false;
      state.loadingIndividualItem = false;
      state.errorAllItems = null;
      state.errorIndividualItem = null;
    },
    addItem: (state, action) => {
      state.allItems.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.allItems = state.allItems.filter(
        (item) => item.id !== action.payload
      );
    },
    addCommentToItem: (state, action) => {
      state.individualItem.comments.push(action.payload);
    },
    deleteCommentFromItem: (state, action) => {
      state.individualItem.comments = state.individualItem.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    updateCommentInItem: (state, action) => {
      const updatedComment = action.payload;

      state.individualItem.comments = state.individualItem.comments.map(
        (comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
      );
    },
    addItemToAllAndIndState: (state, action) => {
      const newItem = action.payload;

      state.allItems.push(newItem);
      state.individualItem = newItem;
      state.loadingIndividualItem = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.pending, (state, action) => {
        state.loadingAllItems = true;
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.allItems = action.payload;
        state.loadingAllItems = false;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.loadingAllItems = false;
        state.errorAllItems = action.error.message;
      })
      .addCase(fetchItemById.pending, (state, action) => {
        state.loadingIndividualItem = true;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.individualItem = action.payload;
        state.loadingIndividualItem = false;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingIndividualItem = false;
        state.errorIndividualItem = action.error.message;
      })
      .addCase(addItemToApi.pending, (state, action) => {
        state.loadingIndividualItem = true;
      })
      .addCase(addItemToApi.fulfilled, (state, action) => {
        const newItem = action.payload;

        state.allItems.push(newItem);

        state.individualItem = newItem;

        state.loadingIndividualItem = false;
      })
      .addCase(addItemToApi.rejected, (state, action) => {
        state.loadingIndividualItem = false;
        state.errorIndividualItem = action.error.message;
      })
      .addCase(deleteItemFromApi.pending, (state, action) => {
        state.loadingIndividualItem = true;
      })
      .addCase(deleteItemFromApi.fulfilled, (state, action) => {
        const deletedItemId = action.payload;

        state.allItems = state.allItems.filter(
          (item) => item.itemId !== deletedItemId
        );

        // state.individualItem = null

        state.loadingIndividualItem = false;
      })
      .addCase(deleteItemFromApi.rejected, (state, action) => {
        state.loadingIndividualItem = false;
        state.errorIndividualItem = action.error.message;
      })
      .addCase(updateItemInApi.fulfilled, (state, action) => {
        const updatedItem = action.payload;

        state.individualItem = updatedItem;

        state.allItems = state.allItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );

        state.loadingIndividualItem = false;
      })
      .addCase(updateItemInApi.rejected, (state, action) => {
        state.loadingIndividualItem = false;
        state.errorIndividualItem = action.error.message;
      });
  },
});

export const {
  addItem,
  deleteItem,
  addCommentToItem,
  deleteCommentFromItem,
  updateCommentInItem,
  addItemToAllAndIndState,
  clearItems,
} = itemSlice.actions;

export const itemReducer = itemSlice.reducer;
