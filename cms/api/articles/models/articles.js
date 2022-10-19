"use strict";
const slugify = require("slugify");
const objectid = require("objectid");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeUpdate: async (params, data) => {
      const article = await strapi
        .query("articles")
        .findOne({ _id: objectid(params._id) });
      const isPublished = data.published_at || article.published_at;

      if (isPublished && !(data.author || article.author)) {
        throw strapi.errors.badRequest(
          "Author is required. Please select the author on the right-hand panel."
        );
      }

      if (data.title && !isPublished) {
        data.slug = slugify(data.title, { strict: true, lower: true });
      }
    },
  },
};
