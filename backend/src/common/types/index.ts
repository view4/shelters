import mongoose, { ObjectId } from "mongoose";

export type FeedParams = {
    sort?: any;
    skip?: number;
    limit?: number;
    segment?: [number?, number?];
    match?: any;
    unwind?: any;
    lookup?: any;
    addFields?: any;
    stamps?: any;
    prospective?: boolean;
    approved?: boolean;
    connectStamps?: boolean;
}

export type AdditionalPipelineOptions = {
    match?: any;
    addFields?: any;
    lookup?: any;
    unwind?: any;
    pipeline?: Array<any>;
  };

  export type ID  = string | mongoose.Types.ObjectId;
  
  export type LinkT = {
    name: string,
    url: string,
  }