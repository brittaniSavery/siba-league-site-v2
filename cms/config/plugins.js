module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "amazon-ses",
      providerOptions: {
        key: env("EMAIL_AWS_ACCESS_KEY"),
        secret: env("EMAIL_AWS_SECRET_KEY"),
        amazon: env("EMAIL_AWS_REGION"),
      },
      settings: {
        defaultFrom: "info@averyincorporated.com",
        defaultReplyTo: env("EMAIL_REPLY_TO"),
      },
    },
  },
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          accessKeyId: env("S3_AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("S3_AWS_ACCESS_SECRET"),
          region: env("S3_AWS_REGION"),
          params: {
            Bucket: env("S3_AWS_BUCKET"),
          },
        },
      },
    },
  },
  "site-publisher": {
    config: {
      owner: "brittaniSavery",
      repo: "siba-league-site-v2",
      workflow_id: "deploy-frontend.yml",
      token: env("GITHUB_TOKEN"),
      branch: "main",
      inputs: {
        event_type: "strapi-update",
      },
    },
  },
});
