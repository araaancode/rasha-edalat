// src/repositories/appointment.repository.ts
import { prisma } from '../config/database';
import { AppointmentStatus } from '@prisma/client';

export class AppointmentRepository {
  async create(data: {
    userId: string;
    lawyerId: string;
    date: Date;
    startTime: string;
    endTime: string;
  }) {
    return prisma.appointment.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.appointment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        lawyer: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
        },
        payment: true,
      },
    });
  }

  async findByLawyerId(lawyerId: string, status?: AppointmentStatus) {
    return prisma.appointment.findMany({
      where: {
        lawyerId,
        ...(status && { status }),
      },
      orderBy: { date: 'desc' },
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

  async findByUserId(userId: string, status?: AppointmentStatus) {
    return prisma.appointment.findMany({
      where: {
        userId,
        ...(status && { status }),
      },
      orderBy: { date: 'desc' },
      include: {
        lawyer: {
          include: {
            user: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, data: { status: AppointmentStatus; meetingLink?: string; paymentId?: string }) {
    return prisma.appointment.update({
      where: { id },
      data,
    });
  }

  async checkAvailability(lawyerId: string, date: Date, startTime: string) {
    return prisma.appointment.findUnique({
      where: {
        lawyerId_date_startTime: {
          lawyerId,
          date,
          startTime,
        },
      },
    });
  }

  async getUpcoming(userId: string) {
    const now = new Date();
    return prisma.appointment.findMany({
      where: {
        userId,
        date: { gte: now },
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
      orderBy: { date: 'asc' },
      take: 5,
      include: {
        lawyer: {
          include: {
            user: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });
  }
}

export const appointmentRepository = new AppointmentRepository();