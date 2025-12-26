import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Stamps {
    @Prop({ required: false })
    commenced: Date;

    @Prop({ required: false })
    completed: Date;

    @Prop({ required: false })
    focused: Date;

    @Prop({ required: false })
    denied: Date;
}

export const StampsSchema = SchemaFactory.createForClass(Stamps);
