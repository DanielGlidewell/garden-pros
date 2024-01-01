import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { React } from "../../deps.ts";
import { Layout } from "./components/Layout.tsx";

export function renderElement(
  jsx: React.JSX.Element,
  context: Context
): React.JSX.Element {
  return context.state.isHxBoosted ? 
    jsx : 
    Layout({ children: jsx})
}