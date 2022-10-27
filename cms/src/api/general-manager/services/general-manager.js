'use strict';

/**
 * general-manager service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::general-manager.general-manager');