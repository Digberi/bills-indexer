import { RequestFactoryModel } from './request-factory.model';
import {
  RequestFactory,
  RequestFactoryEventName,
} from './request-factory.type';

export const saveRequestFactoryEvent = async (event: RequestFactory) =>
  await RequestFactoryModel.create(event);
