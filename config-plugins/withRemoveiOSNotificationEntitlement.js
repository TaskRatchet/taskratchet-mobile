/* eslint-disable @typescript-eslint/no-var-requires */
const withEntitlementsPlist =
  require('@expo/config-plugins').withEntitlementsPlist;

const withRemoveiOSNotificationEntitlement = config => {
  return withEntitlementsPlist(config, mod => {
    delete mod.modResults['aps-environment'];
    return mod;
  });
};

module.exports = withRemoveiOSNotificationEntitlement;
