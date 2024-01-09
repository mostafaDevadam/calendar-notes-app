import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      //destination: './assets/images',
      destination: (req, file, cb) => {
        //(null,__dirname + '/public/uploads')
        cb(null, './assets/images');

    },
      filename: (req, file, cb) => {
        const fileNameSplit = file.originalname.split(".")
        const fielExt = fileNameSplit[fileNameSplit.length - 1]
        cb(null, `${Date.now()}.${fielExt}`)
      }
    })
  }))
  async upload(@UploadedFile() file, @Body() body: any) {
    console.log(file)
    const photoUrl = `http://localhost:${process.env.PORT}/${file.filename}`;
    console.log('photoUrl:', photoUrl);

    console.log('body:', body);

    const data = { name: file.filename, phototUrl: photoUrl, name_: body.name };
    console.log('data:', data);
    return data;
  }


}
