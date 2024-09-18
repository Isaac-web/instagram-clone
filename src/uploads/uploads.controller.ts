import { UploadsService } from './providers/uploads.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-types.enum';
import { supportedImageMimeTypes } from './constants/supported-mimetypes.constants';

@ApiTags('File Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('/image')
  @ApiOperation({
    summary: `Uploads image that has a file type of one of ${supportedImageMimeTypes.join(', ')}.`,
  })
  @ApiResponse({
    status: 200,
    description: 'File upload was successful.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file type.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Authentication required.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File being uploaded.',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Auth(AuthType.None)
  public uploadFile(@UploadedFile('file') file: Express.Multer.File) {
    return this.uploadsService.uploadImage(file);
  }
}
