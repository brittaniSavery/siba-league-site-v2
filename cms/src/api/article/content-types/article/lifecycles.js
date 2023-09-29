const slugify = require("slugify");
const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;

    // generating the slug if missing
    if (!data.slug) {
      data.slug = slugify(data.title, { strict: true, lower: true });
    }
  },

  async beforeUpdate(event) {
    const { data: updated, where, populate } = event.params;

    // getting the current version of the article
    const current = await strapi
      .service("api::article.article")
      .findOne(where.id, {
        fields: ["publishedAt"],
        populate: { author: true },
      });

    const isPublished = updated.publishedAt || current.publishedAt;

    // double-checking that there is an author for published articles

    if (!!isPublished) {
      const authorRemoved = updated.author?.disconnect.length > 0;
      const authorAdded = updated.author?.connect.length > 0;

      if (!current.author || (authorRemoved && !authorAdded)) {
        throw new ApplicationError("Author is required.");
      }
    }
  },
};
