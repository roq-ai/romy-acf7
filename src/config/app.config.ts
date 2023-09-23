interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: [],
  tenantRoles: ['Administrator', 'Content Curator', 'Editor', 'Subscriber', 'Guest User'],
  tenantName: 'Publisher',
  applicationName: 'ROMY',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage user', 'Manage publisher', 'Manage quote', 'Manage subscriber'],
  getQuoteUrl: 'https://app.roq.ai/proposal/cd1c1653-09c5-4985-84fb-2919892392e7',
};
