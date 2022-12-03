import * as z from "zod";

export const schema = z.object({
  name: z.string(),
});

export type SchemaType = z.infer<typeof schema>;
