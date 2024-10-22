import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booth, BoothDocument } from "./schema/booth.schema";
import { Model } from "mongoose";
import { fetchOne, upsert } from "src/common/utils/db";

@Injectable()
export class BoothsService {
    constructor(
        @InjectModel(Booth.name) private boothModel: Model<BoothDocument>,
    ) { }


    async booths() {
        return this.boothModel.find();
    }

    async booth(id: string) {
        return fetchOne(this.boothModel, id);

    }

    async upsertBooth(input: any, id?: string) {
        return upsert(this.boothModel, input, id);
    }

}