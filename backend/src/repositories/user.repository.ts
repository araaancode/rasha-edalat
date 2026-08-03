import { prisma } from '../config/database';
import { User, UserRole } from '@prisma/client';

export class UserRepository {
  async create(data: {
    email: string;
    phone: string;
    password: string;
    fullName: string;
    nationalCode?: string;
    role?: UserRole;
    verifyToken?: string;
  }) {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone: string) {
    return prisma.user.findUnique({
      where: { phone },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        lawyerProfile: true,
      },
    });
  }

  async findByVerifyToken(token: string) {
    return prisma.user.findFirst({
      where: { verifyToken: token },
    });
  }

  async findByResetToken(token: string) {
    return prisma.user.findFirst({
      where: { resetPasswordToken: token },
    });
  }

  async update(id: string, data: Partial<User>) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }

  async getLawyers(filters?: {
    specialization?: string;
    isApproved?: boolean;
  }) {
    return prisma.lawyerProfile.findMany({
      where: {
        ...(filters?.specialization && { specialization: filters.specialization as any }),
        ...(filters?.isApproved !== undefined && { isApprovedByAdmin: filters.isApproved }),
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async getUsers(filters?: {
    role?: UserRole;
    isVerified?: boolean;
  }) {
    return prisma.user.findMany({
      where: {
        ...(filters?.role && { role: filters.role }),
        ...(filters?.isVerified !== undefined && { isVerified: filters.isVerified }),
      },
      include: {
        lawyerProfile: true,
      },
    });
  }
}

export const userRepository = new UserRepository();