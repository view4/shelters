import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SabbaticalGateway, SabbaticalGatewayDocument } from "./schema/sabbatical-gateway.schema";
import { Model } from "mongoose";
import { RoadmapsService } from "src/roadmaps/roadmaps.service";

@Injectable()
export class SabbaticalsService {
    constructor(
        @InjectModel(SabbaticalGateway.name) private sabbaticalGatewayModel: Model<SabbaticalGatewayDocument>,
        private readonly gatewayService: RoadmapsService,
    ) { }

    async upsertSabbaticalGateway(input: any, id?: string) {
        return this.gatewayService.upsertRoadmap(input, id);
    }

    async initSabbaticalGateway() {
        const gateway = await this.gatewayService.upsertRoadmap({ name: 'Sabbatical' });
        return this.upsertSabbaticalGateway({ gateway: gateway._id });
    }

}