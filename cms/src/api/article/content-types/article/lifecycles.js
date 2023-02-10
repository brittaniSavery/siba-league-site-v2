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

    console.log({ current });

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

  async afterUpdate(event) {
    const { where } = event.params;
    console.dir(event.result.publishedAt);

    // getting the current version of the article
    const current = await strapi
      .service("api::article.article")
      .findOne(where.id, {
        fields: ["publishedAt"],
      });

    // article is currently unpublished, so no need to trigger rebuild
    if (!current.publishedAt) return;

    if (process.env.NODE_ENV === "development") {
      strapi.log.debug("Triggered rebuild on Github Actions");
    } else {
      strapi.service("api::article.article").triggerRebuild();
    }
  },
};
