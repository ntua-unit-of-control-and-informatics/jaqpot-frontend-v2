import { components, operations } from './api.schema.d';

export type ModelDto = components['schemas']['Model'];
export type FeatureDto = components['schemas']['Feature'];
export type DatasetDto = components['schemas']['Dataset'];
export type DataEntryDto = components['schemas']['DataEntry'];
export type OrganizationDto = components['schemas']['Organization'];
export type OrganizationInvitationDto =
  components['schemas']['OrganizationInvitation'];

export type ModelsResponseDto =
  operations['getModels']['responses']['200']['content']['application/json'];
export type PartiallyUpdateModelRequestDto =
  operations['partiallyUpdateModel']['requestBody']['content']['application/json'];
