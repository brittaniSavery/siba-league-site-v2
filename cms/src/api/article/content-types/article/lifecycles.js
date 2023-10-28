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
    const { data, where } = event.params;
    const { updatedAt, slug, title, publishedAt, author } = data;
    const { id } = where;

    if (/^article/.test(slug)) {
      data.slug = slugify(title, { strict: true, lower: true });
    }

    // getting the current version of the article
    const current = await strapi.service("api::article.article").findOne(id, {
      fields: ["publishedAt"],
      populate: { author: true },
    });

    const isPublished = publishedAt || current.publishedAt;

    // double-checking that there is an author for published articles

    if (!!isPublished) {
      const authorRemoved = author?.disconnect.length > 0;
      const authorAdded = author?.connect.length > 0;

      if (!current.author || (authorRemoved && !authorAdded)) {
        throw new ApplicationError("Author is required.");
      }
    }
  },
};
