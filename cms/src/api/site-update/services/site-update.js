'use strict';

/**
 * site-update service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::site-update.site-update');