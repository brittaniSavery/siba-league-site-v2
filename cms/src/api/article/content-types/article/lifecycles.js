module.exports = {
  async beforeUpdate(event) {
    const { data: updated, where, populate } = event.params;

    const current = await strapi
      .service("api::article.article")
      .findOne(where.id);
    const isPublished = updated.publishedAt || current.publishedAt;

    console.log(current);

    if (isPublished && !(updated.author || current.author)) {
      throw strapi.errors.badRequest(
        "Author is required. Please select the author on the right-hand panel."
      );
    }
  },
};
