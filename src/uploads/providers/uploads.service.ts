import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import awsConfig from '../config/aws.config';
import { v4 as uuid } from 'uuid';
import { extname, join, posix } from 'path';
import { Repository } from 'typeorm';
import { Upload } from '../entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileType } from '../enums/file-type.enum';
import { supportedImageMimeTypes } from '../constants/supported-mimetypes.constants';

@Injectable()
export class UploadsService {
  constructor(
    @Inject(awsConfig.KEY)
    private readonly awsConfiguration: ConfigType<typeof awsConfig>,

    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,
  ) {}
  public async uploadImage(file: Express.Multer.File) {
    if (!supportedImageMimeTypes.includes(file.mimetype))
      throw new BadRequestException('The given file type is not supported.');

    const s3 = new S3();
    let uploadedFileName: string;

    try {
      const { Key } = await s3
        .upload({
          Bucket: this.awsConfiguration.bucketName,
          Key: this.generateFileName(file, 'users'),
          ContentType: file.mimetype,
          Body: file.buffer,
        })
        .promise();

      uploadedFileName = Key;
    } catch {
      throw new RequestTimeoutException(
        'Something went wrong while uploading the file.',
        'Could not upload file to S3 bucket.',
      );
    }

    const newUpload = this.uploadsRepository.create({
      name: uploadedFileName,
      type: FileType.IMAGE,
      url: `${this.awsConfiguration.cloudfrontUrl}/${uploadedFileName}`,
      mimeType: file.mimetype,
      size: file.size,
    });

    try {
      return await this.uploadsRepository.save(newUpload);
    } catch {
      throw new RequestTimeoutException(
        'Something went wrong while uploaded the file.',
        { description: 'Could not save the uploaded file in the databse.' },
      );
    }
  }

  public generateFileName(file: Express.Multer.File, path?: string) {
    const fileName = file.originalname;

    const fileNameArr = fileName.split('.');
    fileNameArr.pop();
    const trimmedFileName = fileNameArr.join('');
    trimmedFileName.replace(/\s/, '_');

    const timestamp = Date.now().toString();
    const uniqueId = uuid();
    const extention = extname(fileName);

    return posix.join(
      'multimedia',
      path || '',
      `${trimmedFileName}-${timestamp}-${uniqueId}${extention}`,
    );
  }
}
