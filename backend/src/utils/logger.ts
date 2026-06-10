/**
 * Simple structured logger for production.
 * In a real-world scenario, you might want to use 'pino' or 'winston'.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  message: string;
  level: LogLevel;
  timestamp: string;
  context?: string;
  data?: any;
}

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';

  private log(level: LogLevel, message: string, data?: any, context?: string) {
    const payload: LogPayload = {
      message,
      level,
      timestamp: new Date().toISOString(),
      context,
      data,
    };

    if (this.isProduction) {
      // In production, we log as JSON for easier parsing by log aggregators
      console.log(JSON.stringify(payload));
    } else {
      // In development, we use pretty colors and formatting
      const color = this.getColor(level);
      const ctx = context ? `[${context}] ` : '';
      console.log(`${color}${payload.timestamp} ${level.toUpperCase()} ${ctx}${message}\x1b[0m`, data || '');
    }
  }

  private getColor(level: LogLevel): string {
    switch (level) {
      case 'info': return '\x1b[32m'; // Green
      case 'warn': return '\x1b[33m'; // Yellow
      case 'error': return '\x1b[31m'; // Red
      case 'debug': return '\x1b[34m'; // Blue
      default: return '\x1b[0m';
    }
  }

  info(message: string, data?: any, context?: string) {
    this.log('info', message, data, context);
  }

  warn(message: string, data?: any, context?: string) {
    this.log('warn', message, data, context);
  }

  error(message: string, data?: any, context?: string) {
    this.log('error', message, data, context);
  }

  debug(message: string, data?: any, context?: string) {
    if (!this.isProduction) {
      this.log('debug', message, data, context);
    }
  }
}

export const logger = new Logger();
