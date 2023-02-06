const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;

module.exports = {
  async beforeUpdate(event) {
    const { data: updated, where, populate } = event.params;

    // getting the current version of the article
    const current = await strapi
      .service("api::article.article")
      .findOne(where.id);
    const isPublished = updated.publishedAt || current.publishedAt;

    console.log("data", updated);
    console.log("populate", populate);

    // double-checking that there is an author for published articles

    if (isPublished) {
      const authorRemoved = updated.author.disconnect.length > 0;
      const authorAdded = updated.author.connect.length > 0;

      if (!populate.author.count || (authorRemoved && !authorAdded)) {
        throw new ApplicationError("Author is required.");
      }
    }
  },
};
