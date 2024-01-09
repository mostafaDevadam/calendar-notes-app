import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './note.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'Note', schema: NoteSchema}])
  ],
  providers: [NoteService],
  controllers: [NoteController]
})
export class NoteModule {}
