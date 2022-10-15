"use strict";

const aws = require("aws-sdk");
const ses = new aws.SES();
const join = require("./join");

exports.join = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const commissionerEmail = join.buildCommissionerEmail(body);
    const playerEmail = join.buildPlayerEmail(
      body.name,
      body.email,
      body.teams
    );
    await ses.sendEmail(commissionerEmail).promise();
    await ses.sendEmail(playerEmail).promise();
    return generateResponse(200);
  } catch (error) {
    return generateError(500, error);
  }
};

function generateResponse(code, payload) {
  const response = {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Credentials": true,
    },
  };

  if (payload) response.body = JSON.stringify(payload);

  return response;
}

function generateError(code, error) {
  console.log(error);
  return generateResponse(code, error.message);
}
