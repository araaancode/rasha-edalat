import { appointmentRepository } from '../repositories/appointment.repository';
import { userRepository } from '../repositories/user.repository';
import { AppointmentStatus } from '@prisma/client';
import { logger } from '../config/logger';

export class AppointmentService {
  async create(data: {
    userId: string;
    lawyerId: string;
    date: string;
    startTime: string;
    endTime: string;
  }) {
    // Check if lawyer exists and is approved
    const lawyer = await userRepository.findById(data.lawyerId);
    if (!lawyer || !lawyer.lawyerProfile || !lawyer.lawyerProfile.isApprovedByAdmin) {
      throw new Error('Lawyer not found or not approved');
    }

    // Check availability
    const dateObj = new Date(data.date);
    const existing = await appointmentRepository.checkAvailability(
      data.lawyerId,
      dateObj,
      data.startTime
    );

    if (existing) {
      throw new Error('This time slot is already booked');
    }

    // Create appointment
    const appointment = await appointmentRepository.create({
      userId: data.userId,
      lawyerId: data.lawyerId,
      date: dateObj,
      startTime: data.startTime,
      endTime: data.endTime,
    });

    logger.info(`Appointment created: ${appointment.id}`);
    return appointment;
  }

  async confirm(id: string, lawyerId: string) {
    const appointment = await appointmentRepository.findById(id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    if (appointment.lawyerId !== lawyerId) {
      throw new Error('Unauthorized');
    }

    if (appointment.status !== 'PENDING') {
      throw new Error('Appointment cannot be confirmed');
    }

    return appointmentRepository.update(id, { status: 'CONFIRMED' });
  }

  async reject(id: string, lawyerId: string) {
    const appointment = await appointmentRepository.findById(id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    if (appointment.lawyerId !== lawyerId) {
      throw new Error('Unauthorized');
    }

    if (appointment.status !== 'PENDING') {
      throw new Error('Appointment cannot be rejected');
    }

    return appointmentRepository.update(id, { status: 'REJECTED' });
  }

  async cancel(id: string, userId: string) {
    const appointment = await appointmentRepository.findById(id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    if (appointment.userId !== userId) {
      throw new Error('Unauthorized');
    }

    if (appointment.status === 'DONE') {
      throw new Error('Appointment already done');
    }

    return appointmentRepository.update(id, { status: 'CANCELED' });
  }

  async getUserAppointments(userId: string, status?: AppointmentStatus) {
    return appointmentRepository.findByUserId(userId, status);
  }

  async getLawyerAppointments(lawyerId: string, status?: AppointmentStatus) {
    return appointmentRepository.findByLawyerId(lawyerId, status);
  }

  async getUpcoming(userId: string) {
    return appointmentRepository.getUpcoming(userId);
  }
}

export const appointmentService = new AppointmentService();