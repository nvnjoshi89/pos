"use client";
import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 3000;

type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

type Toast = Required<Pick<ToastProps, "id">> & ToastProps;

type State = {
  toasts: Toast[];
};
