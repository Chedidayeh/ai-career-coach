// import { PrismaClient } from "@prisma/client";

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = db;
// }

// // globalThis.prisma: This global variable ensures that the Prisma client instance is
// // reused across hot reloads during development. Without this, each time your application
// // reloads, a new instance of the Prisma client would be created, potentially leading
// // to connection issues.

import { PrismaClient } from '@prisma/client'

declare global {
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }

  prisma = global.cachedPrisma
}

export const db = prisma