import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rasha.com' },
    update: {},
    create: {
      email: 'admin@rasha.com',
      phone: '09123456789',
      password: adminPassword,
      fullName: 'مدیر سیستم',
      role: UserRole.ADMIN,
      isVerified: true,
    },
  });

  console.log(`✅ Admin created: ${admin.email}`);

  // Create sample lawyer
  const lawyerPassword = await bcrypt.hash('Lawyer123!', 10);
  const lawyer = await prisma.user.upsert({
    where: { email: 'lawyer@rasha.com' },
    update: {},
    create: {
      email: 'lawyer@rasha.com',
      phone: '09123456788',
      password: lawyerPassword,
      fullName: 'وکیل نمونه',
      nationalCode: '1234567890',
      role: UserRole.LAWYER,
      isVerified: true,
      lawyerProfile: {
        create: {
          specialization: 'FAMILY',
          barNumber: '12345',
          bio: 'وکیل پایه یک دادگستری با ۱۰ سال سابقه',
          hourlyRate: 500000,
          isApprovedByAdmin: true,
        },
      },
    },
  });

  console.log(`✅ Lawyer created: ${lawyer.email}`);

  // Create sample user
  const userPassword = await bcrypt.hash('User123!', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@rasha.com' },
    update: {},
    create: {
      email: 'user@rasha.com',
      phone: '09123456787',
      password: userPassword,
      fullName: 'کاربر نمونه',
      isVerified: true,
    },
  });

  console.log(`✅ User created: ${user.email}`);

  // Create system settings
  const settings = [
    {
      key: 'AI_SYSTEM_PROMPT',
      value: 'شما یک مشاور حقوقی حرفه‌ای هستید. پاسخ‌های دقیق و مفید با استناد به قوانین ایران ارائه دهید.',
      description: 'System prompt for AI chat',
    },
    {
      key: 'MAX_FILE_SIZE',
      value: '5242880',
      description: 'Maximum file size in bytes (5MB)',
    },
    {
      key: 'RATE_LIMIT_CHAT',
      value: '20',
      description: 'Maximum chat messages per minute',
    },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('✅ System settings created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });