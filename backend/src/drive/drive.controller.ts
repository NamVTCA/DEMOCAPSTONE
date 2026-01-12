import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { DbService } from '../db.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

@Controller('users/drive')
export class DriveController {
  constructor(private readonly db: DbService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  list(@Req() req: any) {
    const files = this.db.getFilesByUser(req.user.id);
    return { files };
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (req, file, cb) => {
          const ext = extname(file.originalname) || '';
          const name = uuidv4() + ext;
          cb(null, name);
        },
      }),
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    if (!file) {
      return { message: 'No file uploaded' };
    }
    const url = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    const rec = this.db.addFile({
      userId: req.user.id,
      name: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      filename: file.filename,
      url,
    } as any);
    return { file: rec };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Req() req: any) {
    const removed = this.db.removeFileByIdForUser(id, req.user.id);
    if (!removed) return { message: 'File not found' };
    // delete physical file if exists
    const filepath = path.join(UPLOAD_DIR, removed.filename);
    try {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    } catch (e) {
      console.warn('Failed to unlink file', e);
    }
    return { ok: true };
  }
}
