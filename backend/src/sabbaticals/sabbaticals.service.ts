import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SabbaticalGateway, SabbaticalGatewayDocument } from "./schema/sabbatical-gateway.schema";
import { Model } from "mongoose";
import { RoadmapsService } from "src/roadmaps/roadmaps.service";
import { CyclesService } from "src/cycles/cycles.service";

@Injectable()
export class SabbaticalsService {
    constructor(
        @InjectModel(SabbaticalGateway.name) private sabbaticalGatewayModel: Model<SabbaticalGatewayDocument>,
        private readonly gatewayService: RoadmapsService,
        @Inject(forwardRef(() => CyclesService))
        private readonly cyclesService: CyclesService
    ) { }

    async upsertSabbaticalGateway(input: any, id?: string) {
        return this.gatewayService.upsertGateway(input, id);
    }

    async initSabbaticalGateway() {
        const gateway = await this.gatewayService.upsertGateway({ name: 'Sabbatical' });
        return await this.sabbaticalGatewayModel.create({ gateway: gateway._id });
    }

    async endCycle(shouldStartNewCycle: boolean) {
        await this.cyclesService.completeCurrentCycle();
        if (shouldStartNewCycle) {
            await this.cyclesService.upsertCycle({});
        }
        return true
    }
}