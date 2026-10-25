import { Router, Response } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get Notifications
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const userId = req.user!.userId;
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    const unreadCount = await prisma.notification.count({
      where: { userId, read: false },
    });

    res.json({ unreadCount, notifications });
  } catch (err) {
    next(err);
  }
});

// Mark Notification as Read
router.patch('/:id/read', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const id = req.params.id as string;
    const userId = req.user!.userId;

    await prisma.notification.updateMany({
      where: { id, userId },
      data: { read: true },
    });

    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    next(err);
  }
});

// Mark All as Read
router.patch('/read-all', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const userId = req.user!.userId;

    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });

    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    next(err);
  }
});

export default router;
