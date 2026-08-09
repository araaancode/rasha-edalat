// import bcrypt from 'bcryptjs';
// import crypto from 'crypto';
// import { prisma } from '../config/database'; // اضافه کنید
// import { userRepository } from '../repositories/user.repository';
// import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt'; // ← verifyRefreshToken را اضافه کنید
// import { sendEmail, getVerificationEmailTemplate, getResetPasswordEmailTemplate } from '../utils/email';
// import { logger } from '../config/logger';
// import { env } from '../config/env';

// export class AuthService {
//   async register(data: {
//     email: string;
//     phone: string;
//     password: string;
//     fullName: string;
//     nationalCode?: string;
//     role?: string;
//     specialization?: string;
//     barNumber?: string;
//   }) {
//     // Check if user exists
//     const existingUser = await userRepository.findByEmail(data.email);
//     if (existingUser) {
//       throw new Error('User with this email already exists');
//     }

//     const existingPhone = await userRepository.findByPhone(data.phone);
//     if (existingPhone) {
//       throw new Error('User with this phone number already exists');
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(data.password, 10);

//     // Generate verification token
//     const verifyToken = crypto.randomBytes(32).toString('hex');

//     // Create user
//     const user = await userRepository.create({
//       email: data.email,
//       phone: data.phone,
//       password: hashedPassword,
//       fullName: data.fullName,
//       nationalCode: data.nationalCode,
//       role: data.role as any,
//       verifyToken,
//     });

//     // If role is lawyer, create lawyer profile
//     if (data.role === 'LAWYER' && data.specialization && data.barNumber) {
//       await prisma.lawyerProfile.create({
//         data: {
//           userId: user.id,
//           specialization: data.specialization as any,
//           barNumber: data.barNumber,
//         },
//       });
//     }

//     // Send verification email
//     try {
//       await sendEmail(
//         data.email,
//         'تایید ایمیل - راشا عدالت',
//         getVerificationEmailTemplate(data.fullName, verifyToken)
//       );
//     } catch (error) {
//       logger.error('Failed to send verification email:', error);
//     }

//     return {
//       message: 'User registered successfully. Please verify your email.',
//       userId: user.id,
//     };
//   }

//   async login(identifier: string, password: string) {
//     // Find user by email or phone
//     let user = await userRepository.findByEmail(identifier);
//     if (!user) {
//       user = await userRepository.findByPhone(identifier);
//     }

//     if (!user) {
//       throw new Error('Invalid credentials');
//     }

//     if (!user.isVerified) {
//       throw new Error('Please verify your email first');
//     }

//     // Check password
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       throw new Error('Invalid credentials');
//     }

//     // Generate tokens
//     const payload = {
//       userId: user.id,
//       email: user.email,
//       role: user.role,
//     };

//     const accessToken = generateAccessToken(payload);
//     const refreshToken = generateRefreshToken(payload);

//     return {
//       accessToken,
//       refreshToken,
//       user: {
//         id: user.id,
//         email: user.email,
//         phone: user.phone,
//         fullName: user.fullName,
//         role: user.role,
//         isVerified: user.isVerified,
//       },
//     };
//   }

//   async verifyEmail(token: string) {
//     const user = await userRepository.findByVerifyToken(token);
//     if (!user) {
//       throw new Error('Invalid verification token');
//     }

//     await userRepository.update(user.id, {
//       isVerified: true,
//       verifyToken: null,
//     });

//     return { message: 'Email verified successfully' };
//   }

//   async forgotPassword(email: string) {
//     const user = await userRepository.findByEmail(email);
//     if (!user) {
//       throw new Error('User not found');
//     }

//     const resetToken = crypto.randomBytes(32).toString('hex');
//     await userRepository.update(user.id, {
//       resetPasswordToken: resetToken,
//     });

//     try {
//       await sendEmail(
//         email,
//         'بازیابی رمز عبور - راشا عدالت',
//         getResetPasswordEmailTemplate(user.fullName, resetToken)
//       );
//     } catch (error) {
//       logger.error('Failed to send reset password email:', error);
//       throw new Error('Failed to send reset password email');
//     }

//     return { message: 'Reset password email sent' };
//   }

//   async resetPassword(token: string, newPassword: string) {
//     const user = await userRepository.findByResetToken(token);
//     if (!user) {
//       throw new Error('Invalid reset token');
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await userRepository.update(user.id, {
//       password: hashedPassword,
//       resetPasswordToken: null,
//     });

//     return { message: 'Password reset successfully' };
//   }

//   async refreshToken(refreshToken: string) {
//     try {
//       console.log('🔍 Verifying refresh token...');
      
//       // 1. بررسی وجود توکن
//       if (!refreshToken) {
//         console.log('❌ No refresh token provided');
//         throw new Error('Refresh token is required');
//       }

//       // 2. تایید توکن
//       const decoded = verifyRefreshToken(refreshToken);
//       if (!decoded) {
//         console.log('❌ Invalid refresh token');
//         throw new Error('Invalid refresh token');
//       }

//       console.log('✅ Refresh token verified for user:', decoded.userId);

//       // 3. پیدا کردن کاربر
//       const user = await userRepository.findById(decoded.userId);
//       if (!user) {
//         console.log('❌ User not found:', decoded.userId);
//         throw new Error('User not found');
//       }

//       // 4. تولید توکن جدید
//       const payload = {
//         userId: user.id,
//         email: user.email,
//         role: user.role,
//       };

//       const newAccessToken = generateAccessToken(payload);
//       console.log('✅ New access token generated for user:', user.id);

//       return { 
//         accessToken: newAccessToken,
//         userId: user.id 
//       };
//     } catch (error) {
//       console.error('❌ Refresh token service error:', error);
//       throw error;
//     }
//   }

//   async getMe(userId: string) {
//     const user = await userRepository.findById(userId);
//     if (!user) {
//       throw new Error('User not found');
//     }

//     const { password, ...userWithoutPassword } = user;
//     return userWithoutPassword;
//   }
// }

// export const authService = new AuthService();.

// src/services/auth.service.ts
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '../config/database';
import { userRepository } from '../repositories/user.repository';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { sendEmail, getVerificationEmailTemplate, getResetPasswordEmailTemplate } from '../utils/email';
import { logger } from '../config/logger';

export class AuthService {
  async register(data: {
    email: string;
    phone: string;
    password: string;
    fullName: string;
    nationalCode?: string;
    role?: string;
    specialization?: string;
    barNumber?: string;
  }) {
    // Check if user exists
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const existingPhone = await userRepository.findByPhone(data.phone);
    if (existingPhone) {
      throw new Error('User with this phone number already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Generate verification token (اختیاری - برای ایمیل)
    const verifyToken = crypto.randomBytes(32).toString('hex');

    // Create user - isVerified به صورت خودکار true است (پیش‌فرض در schema)
    const user = await userRepository.create({
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      fullName: data.fullName,
      nationalCode: data.nationalCode,
      role: data.role as any,
      verifyToken,
    });

    // اگر role وکیل باشد، پروفایل وکیل ایجاد شود
    if (data.role === 'LAWYER' && data.specialization && data.barNumber) {
      await prisma.lawyerProfile.create({
        data: {
          userId: user.id,
          specialization: data.specialization as any,
          barNumber: data.barNumber,
        },
      });
    }

    // ارسال ایمیل تایید (اختیاری)
    try {
      await sendEmail(
        data.email,
        'تایید ایمیل - راشا عدالت',
        getVerificationEmailTemplate(data.fullName, verifyToken)
      );
    } catch (error) {
      logger.error('Failed to send verification email:', error);
    }

    return {
      message: 'User registered successfully.',
      userId: user.id,
    };
  }

  async login(identifier: string, _password: string) {
    // Find user by email or phone
    let user = await userRepository.findByEmail(identifier);
    if (!user) {
      user = await userRepository.findByPhone(identifier);
    }

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // ❌ حذف بررسی isVerified - دیگر نیازی نیست
    // if (!user.isVerified) {
    //   throw new Error('Please verify your email first');
    // }

    // Check password
    const isValid = await bcrypt.compare(_password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        role: user.role,
        isVerified: true, // همیشه true برگردانده می‌شود
      },
    };
  }

  async verifyEmail(token: string) {
    const user = await userRepository.findByVerifyToken(token);
    if (!user) {
      throw new Error('Invalid verification token');
    }

    // کاربر قبلاً تایید شده است، فقط توکن را پاک می‌کنیم
    await userRepository.update(user.id, {
      verifyToken: null,
    });

    return { message: 'Email verified successfully' };
  }

  async forgotPassword(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    await userRepository.update(user.id, {
      resetPasswordToken: resetToken,
    });

    try {
      await sendEmail(
        email,
        'بازیابی رمز عبور - راشا عدالت',
        getResetPasswordEmailTemplate(user.fullName, resetToken)
      );
    } catch (error) {
      logger.error('Failed to send reset password email:', error);
      throw new Error('Failed to send reset password email');
    }

    return { message: 'Reset password email sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await userRepository.findByResetToken(token);
    if (!user) {
      throw new Error('Invalid reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.update(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
    });

    return { message: 'Password reset successfully' };
  }

  async refreshToken(refreshToken: string) {
    try {
      console.log('🔍 Verifying refresh token...');
      
      if (!refreshToken) {
        console.log('❌ No refresh token provided');
        throw new Error('Refresh token is required');
      }

      const decoded = verifyRefreshToken(refreshToken);
      if (!decoded) {
        console.log('❌ Invalid refresh token');
        throw new Error('Invalid refresh token');
      }

      console.log('✅ Refresh token verified for user:', decoded.userId);

      const user = await userRepository.findById(decoded.userId);
      if (!user) {
        console.log('❌ User not found:', decoded.userId);
        throw new Error('User not found');
      }

      const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const newAccessToken = generateAccessToken(payload);
      console.log('✅ New access token generated for user:', user.id);

      return { 
        accessToken: newAccessToken,
        userId: user.id 
      };
    } catch (error) {
      console.error('❌ Refresh token service error:', error);
      throw error;
    }
  }

  async getMe(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export const authService = new AuthService();