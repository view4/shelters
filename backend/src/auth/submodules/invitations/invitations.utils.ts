import { Model } from 'mongoose';
import { FeedParams } from 'src/common/types';
import { aggregateFeed } from 'src/common/utils/db';

export interface InvitationsFilter {
  userId?: string;
  status?: string;
  invitedBy?: string;
}

export const aggregateInvitations = async (
  model: Model<any>,
  filter: InvitationsFilter,
  feedParams?: FeedParams,
  pipeline: any[] = []
) => {
  const match: any = {};
  
  if (filter.userId) {
    match.invitedBy = filter.userId;
  }
  
  if (filter.status) {
    match.status = filter.status;
  }

  if (filter.invitedBy) {
    match.invitedBy = filter.invitedBy;
  }

  const fullFeedParams = {
    ...feedParams,
    match: { ...match, ...(feedParams?.match || {}) },
  };

  return aggregateFeed(model, fullFeedParams, pipeline);
};

