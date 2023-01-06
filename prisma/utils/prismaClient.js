import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") prisma = new PrismaClient();

if (process.env.NODE_ENV === "development") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma;

// ANOTHER WAY TO HANDLE !
// import { PrismaClient } from "@prisma/client";
//
// const client = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
//
// export default client;
