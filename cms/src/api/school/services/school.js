'use strict';

/**
 * school service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::school.school');