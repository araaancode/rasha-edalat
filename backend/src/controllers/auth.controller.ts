import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { logger } from '../config/logger';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(400).json({ message: error instanceof Error ? error.message : 'Registration failed' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { identifier, password } = req.body;
      const result = await authService.login(identifier, password);

      // Set refresh token in HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
      });

      console.log('✅ Refresh token cookie set for user:', result.user.id);

      res.json({
        accessToken: result.accessToken,
        user: result.user,
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(401).json({ message: error instanceof Error ? error.message : 'Login failed' });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.query;
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ message: 'Token required' });
      }

      const result = await authService.verifyEmail(token);
      res.json(result);
    } catch (error) {
      logger.error('Email verification error:', error);
      res.status(400).json({ message: error instanceof Error ? error.message : 'Verification failed' });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await authService.forgotPassword(email);
      res.json(result);
    } catch (error) {
      logger.error('Forgot password error:', error);
      res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to send reset email' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      const result = await authService.resetPassword(token, newPassword);
      res.json(result);
    } catch (error) {
      logger.error('Reset password error:', error);
      res.status(400).json({ message: error instanceof Error ? error.message : 'Password reset failed' });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      console.log('🔍 Refresh token received:', refreshToken ? 'Yes' : 'No');
      
      if (!refreshToken) {
        console.log('❌ No refresh token in cookies');
        return res.status(401).json({ 
          message: 'Refresh token required',
          code: 'REFRESH_TOKEN_MISSING'
        });
      }

      const result = await authService.refreshToken(refreshToken);
      console.log('✅ Refresh token successful for user:', result.userId);
      
      res.json(result);
    } catch (error) {
      console.error('❌ Refresh token error:', error);
      logger.error('Refresh token error:', error);
      res.status(401).json({ 
        message: error instanceof Error ? error.message : 'Invalid refresh token',
        code: 'REFRESH_TOKEN_FAILED'
      });
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  }

  async getMe(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await authService.getMe(userId);
      res.json(user);
    } catch (error) {
      logger.error('Get me error:', error);
      res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to get user' });
    }
  }
}

export const authController = new AuthController();