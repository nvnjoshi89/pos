import { metadata } from "@/app/layout";
import { AdminResponse } from "@/types/admin";
import { MetaData } from "@/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminManagementState {
  admins: AdminResponse[];
  metadata: MetaData;
}

const initialState: AdminManagementState = {
  admins: [],
  metadata: {} as MetaData,
};

const adminManagementSlice = createSlice({
  name: "adminMangement",
  initialState,
  reducers: {
    setAdmins: (
      state,
      action: PayloadAction<{ admins: AdminResponse[]; metadata: MetaData }>,
    ) => {
      const { admins, metadata } = action.payload;
      state.admins = admins;
      state.metadata = metadata;
    },
    resetAdmins: (state) => {
      state.admins = [];
      state.metadata = {} as MetaData;
    },
    updateMetadata: (state, action: PayloadAction<{ metadata: MetaData }>) => {
      const { metadata } = action.payload;
      state.metadata = metadata;
    },
  },
});
