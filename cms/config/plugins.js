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
        accessKeyId: env("S3_AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("S3_AWS_ACCESS_SECRET"),
        region: env("S3_AWS_REGION"),
        params: {
          Bucket: env("S3_AWS_BUCKET"),
        },
      },
    },
  },
});
