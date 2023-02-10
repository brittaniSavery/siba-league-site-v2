// @ts-nocheck
"use strict";

/**
 * article service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::article.article", ({ strapi }) => ({
  async triggerRebuild() {
    strapi.log.info("Starting github action trigger");
    const fetch = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));

    const response = await fetch(
      "https://api.github.com/repos/brittanisavery/siba-league-site-v2/dispatches",
      {
        method: "POST",
        body: JSON.stringify({ event_type: "strapi-update" }),
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (response.ok) {
      strapi.log.info("Triggered build/deploy for frontend website.");
    } else {
      const error = await response.json();
      strapi.log.warn(
        `An error occurred when trying to contact Github: ${error.message}. Get more information at ${error.documentation_url}`
      );
    }
  },
}));
