import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CityAirQuality extends Document {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  coordinates: [number, number]; // Coordinates are represented as a tuple of [latitude, longitude]

  @Prop({ required: true, type: Object })
  pollution: {
    ts: Date;
    aqius: number;
    mainus: string;
    aqicn: number;
    maincn: string;
  };

  @Prop({ default: Date.now })
  createdAt: Date;
}

const CityAirQualitySchema = SchemaFactory.createForClass(CityAirQuality);

CityAirQualitySchema.index({ 'pollution.aqius': -1 });

export { CityAirQualitySchema };
