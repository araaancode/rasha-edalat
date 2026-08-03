import { prisma } from '../config/database';
import { ConversationStatus, ConversationType } from '@prisma/client';

export class ConversationRepository {
  async create(data: {
    userId: string;
    type: ConversationType;
    lawyerId?: string;
  }) {
    return prisma.conversation.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.conversation.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
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
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async findByUserId(userId: string, page = 1, limit = 20) {
    return prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
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
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  async update(id: string, data: { status?: ConversationStatus }) {
    return prisma.conversation.update({
      where: { id },
      data,
    });
  }

  async addMessage(data: {
    conversationId: string;
    sender: string;
    content?: string;
    fileUrl?: string;
    fileType?: string;
  }) {
    return prisma.message.create({
      data: {
        conversationId: data.conversationId,
        sender: data.sender as any,
        content: data.content,
        fileUrl: data.fileUrl,
        fileType: data.fileType,
      },
    });
  }

  async getMessages(conversationId: string, page = 1, limit = 50) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}

export const conversationRepository = new ConversationRepository();