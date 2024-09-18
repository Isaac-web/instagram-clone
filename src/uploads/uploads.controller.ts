import { UploadsService } from './providers/uploads.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-types.enum';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('/image')
  @UseInterceptors(FileInterceptor('file'))
  @Auth(AuthType.None)
  public uploadFile(@UploadedFile('file') file: Express.Multer.File) {
    return this.uploadsService.uploadImage(file);
  }
}
