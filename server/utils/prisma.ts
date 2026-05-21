// prisma.ts
import { PrismaClient as PrismaClientType } from '@prisma/client'; // 仅类型导入（可选）
import prismaPackage from '@prisma/client';

// 兼容 CommonJS -> ESM 导入
const PrismaClient = (prismaPackage as { default: { PrismaClient: typeof PrismaClientType } }).default?.PrismaClient || prismaPackage.PrismaClient;

// 全局单例避免重复实例化（Nuxt3 开发环境热更新会重复创建客户端）
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientType | undefined;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;