import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Stamps, StampsSchema } from 'src/common/schemas/stamps.schema';


// CONCEPT / COULD DO: Implement these stamps according to the seven days of creation to therefore mirror better the Divine flow of creation.
@Schema()
export class FeatureStamps extends Stamps {
    // light
    @Prop({required: false})
    prospective: Date;

    // heavens
    @Prop({required: false})
    committed: Date;

    // earth
    @Prop({required: false})
    commenced: Date;

    // luminaries

    // fish of the sea, birds of the sky

    // beasts and man
    @Prop({required: false})
    deployed: Date; //maybe luminaries is deployed?

    // Sabbath
    @Prop({ required: false })
    accepted: Date;
}

export const FeatureStampsSchema = SchemaFactory.createForClass(FeatureStamps); 