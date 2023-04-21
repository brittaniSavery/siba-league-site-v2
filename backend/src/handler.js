"use strict";

const aws = require("aws-sdk");
const ses = new aws.SES();
const {
  generateMemberEmail,
  generateCommissionerEmail,
} = require("./join/generate-emails");

exports.join = async (event) => {
  try {
    const body = JSON.parse(event.body);

    if (!body) return generateError(400, "Event body cannot be empty.");

    const { name, email, found, reason, proTeam, collegeTeams } = body;
    const memberEmail = generateMemberEmail(name, proTeam, collegeTeams);
    const commissionerEmail = generateCommissionerEmail(
      name,
      email,
      found,
      reason,
      proTeam,
      collegeTeams
    );

    // @ts-ignore
    const memberEmailResult = await ses
      .sendEmail({
        Source: process.env.NO_REPLY,
        Destination: { ToAddresses: [email] },
        Message: {
          Body: {
            Html: { Charset: "UTF-8", Data: memberEmail.html },
            Text: { Charset: "UTF-8", Data: memberEmail.plain },
          },
          Subject: { Data: memberEmail.subject },
        },
      })
      .promise();

    const commissionerEmailResult = await ses
      .sendEmail({
        // @ts-ignore
        Source: process.env.NO_REPLY,
        Destination: { ToAddresses: [process.env.COMMISSIONER] },
        Message: {
          Body: {
            Html: { Charset: "UTF-8", Data: commissionerEmail.html },
            Text: { Charset: "UTF-8", Data: commissionerEmail.plain },
          },
          Subject: { Data: commissionerEmail.subject },
        },
      })
      .promise();

    return generateResponse(200, {
      result: {
        member: {
          isSuccessful: !!memberEmailResult.$response.error,
          error: memberEmailResult.$response.error,
        },
        commissioner: {
          isSuccessful: !!commissionerEmailResult.$response.error,
          error: commissionerEmailResult.$response.error,
        },
      },
    });
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
