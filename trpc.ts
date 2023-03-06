import { initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";
import { Context } from "./context";

const t = initTRPC.context<Context>().meta<OpenApiMeta>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
