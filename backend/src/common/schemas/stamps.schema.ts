import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Stamps {
    @Prop({ required: false })
    commenced: Date;

    @Prop({ required: false })
    completed: Date;
}

export const StampsSchema = SchemaFactory.createForClass(Stamps);
