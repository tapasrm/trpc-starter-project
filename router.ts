import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "./trpc";
import { randomUUID } from "crypto";

type User = {
  id: string;
  name: string;
  bio?: string;
};

const users: Record<string, User> = {};

export const t = initTRPC.create();

export const appRouter = router({
  getUserById: publicProcedure
    .meta({ openapi: { method: "GET", path: "/getUserById" } })
    .input(z.string())
    .output(
      z.object({ id: z.string(), name: z.string(), bio: z.string().optional() })
    )
    .query(({ input }) => {
      return users[input]; // input type is string
    }),
  createUser: publicProcedure
    .meta({ openapi: { method: "POST", path: "/createUser" } })
    .input(
      z.object({
        name: z.string().min(3),
        bio: z.string().max(142).optional(),
      })
    )
    .output(
      z.object({ id: z.string(), name: z.string(), bio: z.string().optional() })
    )
    .mutation(({ input }) => {
      const id = randomUUID();
      const user: User = { id, ...input };
      users[user.id] = user;
      return user;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
