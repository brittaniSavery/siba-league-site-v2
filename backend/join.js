const PRO = "pro";
const COLLEGE = "college";

const PRO_ABILITY_POINTS = [
  { label: "Offensive Ability", id: "offensive" },
  { label: "Defensive Ability", id: "defensive" },
  { label: "Potential", id: "potential" },
  { label: "Game Strategy", id: "strategy" },
  { label: "Player Development", id: "development" },
];

const COLLEGE_ABILITY_POINTS = [
  { label: "Offensive Concepts", id: "offensive" },
  { label: "Defensive Concepts", id: "defensive" },
  { label: "Recruiting Skills", id: "recruiting" },
  { label: "Scouting Skills", id: "scouting" },
  { label: "Player Development", id: "development" },
];

const COLLEGE_COACH_PERSONALITY = [
  "Ambition",
  "Academics",
  "Discipline",
  "Integrity",
  "Temper",
];

exports.buildCommissionerEmail = ({ name, email, teams, foundBy, reason }) => {
  //throwing error if any important parameters are missing
  if (!(name && email && teams && foundBy)) {
    throw new Error(
      "Make sure to add your name, email, team choices as well as how you found SIBA."
    );
  }

  const hasPro = teams.some((team) => team.type === PRO);
  const hasCollege = teams.some((team) => team.type === COLLEGE);

  const league =
    hasPro && hasCollege
      ? "both leagues"
      : `the ${hasPro ? PRO : COLLEGE} league`;

  return {
    Source: process.env.NO_REPLY,
    Destination: { ToAddresses: [process.env.COMMISSIONER] },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: `${name} wants to join ${league}!`,
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          ${EmailStart(
            hasCollege && !hasPro,
            `Another person wants to join ${league}!`,
            ""
          )}
          ${EmailSubheading("Basic Information")}
          ${EmailParagraph(`
          <b>Name:</b> ${name}<br />
          <b>Email:</b> ${email}<br />
          <b>Found SIBA from:</b> ${getFoundBy(foundBy)}
          ${reason ? `<br /><b>Reason for joining:</b> ${reason}` : ""}
          `)}

          ${EmailSubheading("Team(s) Information")}
          ${EmailTeams(teams)}
          
          ${EmailParagraph("Thanks,<br />The Avery Incorporated IT Team")}
          ${EmailEnd(
            "You are receiving this email because someone completed the join form and you are deemed the commissioner for both the pro league and college of SIBA."
          )}`,
        },
      },
    },
  };
};

exports.buildPlayerEmail = (name, email, teams) => {
  const hasPro = teams.some((team) => team.type === PRO);
  const hasCollege = teams.some((team) => team.type === COLLEGE);

  const league =
    hasPro && hasCollege
      ? "both leagues"
      : `the ${hasPro ? PRO : COLLEGE} league`;

  const leagueName = () => {
    if (hasPro && hasCollege) {
      return "the SIBA, and its college league, the SICBA";
    } else if (hasPro) {
      return "the SIBA";
    } else {
      return "the SICBA";
    }
  };

  const downloadLinkPlain =
    hasPro && hasCollege
      ? "download, for both pro (https://siba.averyincorporated.com/siba/downloads) and college (https://siba.averyincorporated.com/college/downloads),"
      : `download (https://siba.averyincorporated.com/${
          hasPro ? "siba" : COLLEGE
        }/downloads)`;

  const downloadLink =
    hasPro && hasCollege
      ? `download, for both <a href="https://siba.averyincorporated.com/siba/downloads" style="color: #3260a4;" target="_blank">pro</a> and
  <a href="https://siba.averyincorporated.com/college/downloads" style="color: #3260a4;" target="_blank">college</a>,`
      : `<a href="https://siba.averyincorporated.com/${
          hasPro ? "siba" : COLLEGE
        }/downloads style="color: #3260a4;" target="_blank">download</a>`;

  return {
    Source: process.env.COMMISSIONER,
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: `Thanks for joining ${leagueName()}!`,
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          ${EmailStart(
            hasCollege && !hasPro,
            `Hi ${name}, welcome to ${leagueName()}!`,
            `Thank you for joining! We look forward to chatting with you in our <a
            href="https://join.slack.com/t/sibabball/shared_invite/zt-grkrrq9i-je57xB2Y7NGoPTh0GlKNNg" target="_blank"
            style="color: #3260a4;">Slack community</a>. If you haven't joined already, be sure to do so and say hi in the general channel. 
            From there, one of the commissioners will add you to the right channels for ${league}.`
          )}
          ${EmailParagraph(
            "Below are some friendly reminders for getting ready to join in on the fun."
          )}
          ${EmailSubheading(`Game version${hasPro && hasCollege ? "s" : ""}`)}
          ${EmailParagraph(
            `${
              hasPro
                ? "For the pro league, we are using Draft Day Sports: Pro Basketball 2021 version 10.11"
                : ""
            } ${
              hasCollege
                ? "For the college league, we are using raft Day Sports: College Basketball 2021 version 9.7."
                : ""
            }`
          )}
          ${EmailSubheading(
            `League Graphics and File${hasPro && hasCollege ? "s" : ""}`
          )}
          ${EmailParagraph(` Our leagues use specific graphics for the team logos, players, and coaches. Make
          sure to ${downloadLink} the graphics folder from our website. Once you download
          the graphics .zip folder, you'll place that folder inside Wolverine Studios folder
          where your game is located, e.g.
          <code
              style="background-color: #e8f5ff; color: #3260a4;">C:\\Wolverine Studios</code>`)}
              ${EmailParagraph(`The current league file is also available on the download page.
          Once you have the .zip folder on your computer, unzip the content into the saves folder for your game,
          e.g. <code style="background-color: #e8f5ff; color: #3260a4;">C:\\Wolverine Studios\\DDS${
            hasCollege && !hasPro ? "C" : "P"
          }B2021\\app\\disk\\saves</code>. Then launch the program, load the association, and finally pick your coach's name and insert the password
          associated with your team.`)}

          ${EmailSubheading(`Your Team${teams.length > 1 ? "s" : ""}`)}
          ${EmailParagraph(
            `The following is the information you entered for your team${
              teams.length > 1 ? "s" : ""
            }. Please double-check that everything looks good. If anything is incorrect or missing, let one of the commissioners know and it will be changed as soon as possible.`
          )}
          ${EmailTeams(teams)}
          ${EmailParagraph(
            "Thanks once again for joining! Tell your friends about the leagues if they love basketball, numbers, and stats too. There are plenty of teams available, even some really good ones."
          )}
          ${EmailParagraph("Happy gaming,")}
          ${EmailParagraph(
            `Kelley and Brittani Avery<br/>${hasPro ? "SIBA" : ""}${
              hasPro && hasCollege ? "/" : ""
            }${hasCollege ? "SICBA" : ""} Commissioners`
          )}
          ${EmailEnd(`You are receiving this email because you completed
          the join form on <a href="https://siba.averyincorporated.com" style="color: #3260a4;">siba.averyincorporated.com</a>.`)}`,
        },
        Text: {
          Charset: "UTF-8",
          Data: `
          Hi ${name}, welcome to ${leagueName()}!
      
          Thank you for joining! We look forward to chatting with you in our Slack community (https://join.slack.com/t/sibabball/shared_invite/zt-grkrrq9i-je57xB2Y7NGoPTh0GlKNNg).
          If you haven't joined already, be sure to do so and say hi in the general channel. From there, one of the commissioners will add you to the right channels for ${league}.

          Below are some friendly reminders for getting ready to join in on the fun of managing a team.

          - Game version${hasPro && hasCollege ? "s" : ""}: ${
            hasPro
              ? "For the pro league, we are using Draft Day Sports: Pro Basketball 2021 version 10.11"
              : ""
          } ${
            hasCollege
              ? "For the college league, we are using raft Day Sports: College Basketball 2021 version 9.7."
              : ""
          }

          - League Graphics and File${
            hasPro && hasCollege ? "s" : ""
          }: Our leagues use specific graphics for the team logos, players, and coaches. Make
          sure to ${downloadLinkPlain} the graphics folder from our website. Once you download
          the graphics .zip folder, you'll place that folder inside Wolverine Studios folder
          where your game is located, e.g. C:\\Wolverine Studios.

          The current league file is also available on the download page. Once you have the .zip folder on your computer, unzip the content into the saves folder for your game,
          e.g. C:\\Wolverine Studios\\DDS${
            hasCollege && !hasPro ? "C" : "P"
          }B2021\\app\\disk\\saves. Then launch the program, load the association, and finally pick your coach's name and insert the password
          associated with your team.

          - Your Team${
            teams.length > 1 ? "s" : ""
          }: The following is the information you entered for your team${
            teams.length > 1 ? "s" : ""
          }. 
          Please double-check that everything looks good. If anything is incorrect or missing, let one of the commissioners know and it will be changed as soon as possible.
          ${teams.map((team) => EmailTeamPlain(team)).join("")}

          Thanks once again for joining! Tell your friends about the leagues if they love basketball, numbers, and stats too. There are plenty of teams available, even some really good ones.

          Happy gaming,
          
          Kelley and Brittani Avery
          ${hasPro ? "SIBA" : ""}${hasPro && hasCollege ? "/" : ""}${
            hasCollege ? "SICBA" : ""
          } Commissioners
          `,
        },
      },
    },
  };
};

function getFoundBy(foundBy) {
  switch (foundBy) {
    case "developers":
      return "Wolverine Studios Forums";
    case "referral":
      return "Friend/Family";
    case "google":
      return "Google";
    case "fb":
      return "Facebook";
    case "twitter":
      return "Twitter";
    default:
      return "Something else";
  }
}

function EmailParagraph(text) {
  return `<!-- / Paragraph -->
  <table class="container paragraph-block" border="0" cellpadding="0" cellspacing="0"
      width="100%">
      <tr>
          <td align="center" valign="top">
              <table class="container" border="0" cellpadding="0" cellspacing="0" width="620"
                  style="width: 620px;">
                  <tr>
                      <td class="paragraph-block__content"
                          style="padding: 25px 0 18px 0; font-size: 16px; line-height: 27px; color: #495057;"
                          align="left">${text}</td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
  <!-- /// Paragraph -->`;
}

function EmailBlankLine() {
  return "<tr><td>&#xA0;</td></tr>";
}

function EmailSubheading(text) {
  return `<!-- / Title -->
  <table class="container title-block" border="0" cellpadding="0" cellspacing="0"
      width="100%">
      <tr>
          <td align="center" valign="top">
              <table class="container" border="0" cellpadding="0" cellspacing="0" width="620"
                  style="width: 620px;">
                  <tr>
                      <td style="border-bottom: solid 1px #eeeeee; padding: 35px 0 18px 0; font-size: 26px;"
                          align="left">${text}</td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
  <!-- /// Title -->`;
}

function EmailTeamPlain(team) {
  const personality =
    team.type === PRO
      ? `Personality: ${team.coach.personality}
         Greed: ${team.coach.greed}`
      : COLLEGE_COACH_PERSONALITY.map(
          (trait) =>
            `${trait}: ${team.coach[trait.toLowerCase()]}
      `
        ).join("");

  const abilities = () => {
    const abilityList =
      team.type === PRO ? PRO_ABILITY_POINTS : COLLEGE_ABILITY_POINTS;

    return abilityList
      .map(
        (ability) =>
          `${ability.label}: ${team.coach[ability.id]}
          `
      )
      .join("");
  };

  return `
${team.basics.name} (${team.type})
Password: ${team.basics.password}
${team.type === PRO ? "General Manager" : "Head Coach"}: ${
    team.coach.first_name
  } ${team.coach.last_name}
Picture Number: ${team.coach.pic}
Outfit Number: ${team.coach.outfit}

${team.type === COLLEGE ? "Personality" : ""}
${personality}
        
Ability Points
${abilities()}
-----
        `;
}

function EmailTeam(team) {
  const defaultFont = "font-size: 16px; line-height: 27px; color: #495057;";

  const personality =
    team.type === PRO
      ? `<tr><td style="${defaultFont}"><b>Personality:</b> ${team.coach.personality}</td></tr>
       <tr><td style="${defaultFont}"><b>Greed:</b> ${team.coach.greed}</td></tr>`
      : COLLEGE_COACH_PERSONALITY.map(
          (trait) =>
            `<tr><td style="${defaultFont}"><b>${trait}:</b> ${
              team.coach[trait.toLowerCase()]
            }</td></tr>`
        ).join("");

  const abilities = () => {
    const abilityList =
      team.type === PRO ? PRO_ABILITY_POINTS : COLLEGE_ABILITY_POINTS;

    return abilityList
      .map(
        (ability) =>
          `<tr><td  style="${defaultFont}"><b>${ability.label}:</b> ${
            team.coach[ability.id]
          }</td></tr>`
      )
      .join("");
  };

  return `
 <table style="padding: 0 40px;">
 <tr>
     <td style="font-size: 20px; color: #3260a4;">${team.basics.name} (${
    team.type
  })</td>
 </tr>
 <tr>
     <td style="${defaultFont}"><b>Password:</b> ${team.basics.password}</td>
 </tr>
 <tr>
    <td style="${defaultFont}">
      ${team.type === PRO ? "General Manager" : "Head Coach"}<br />${
    team.coach.first_name
  } ${team.coach.last_name}
    </td>
</tr>
 <tr>
     <td style="${defaultFont}">
        <img src="${process.env.SITE_URL}/files/${team.type}/Website/images/${
    team.type === PRO ? "nonplayers" : "coaches"
  }/fac/${team.coach.pic}.png"
             alt="" />
        <br />
        <b>Picture Number:</b> ${team.coach.pic}
      </td>
      </tr>
      <tr>
     <td style="${defaultFont}">
        <img src="${process.env.SITE_URL}/files/${team.type}/Website/images/${
    team.type === PRO ? "nonplayers" : "coaches"
  }/clothes/${team.coach.outfit}.png"
             alt="" />
        <br />
        <b>Outfit Number:</b> ${team.coach.outfit}
      </td>
  </tr>
 ${
   team.type === COLLEGE
     ? `${EmailBlankLine()}
    <tr><td style="color: #3260a4; font-size: 18px; font-weight:500;">Personality</td></tr>`
     : ""
 }
${personality}
${EmailBlankLine()}
<tr><td style="color: #3260a4; font-size: 18px; font-weight:500;">Ability Points</td></tr>
${abilities()}
</table>`;
}

function EmailTeams(teams) {
  return `
  <!-- / Projects list -->
  <table class="container projects-list" border="0" cellpadding="0" cellspacing="0"
      width="100%" style="padding-top: 25px;">
      <tr>
          <td>
              <table class="container" border="0" cellpadding="0" cellspacing="0"
                  width="100%">
                  <tr>
                      ${[0, 1]
                        .map(
                          (index) =>
                            teams[index] &&
                            `<td valign="top" align="left">
                              ${EmailTeam(teams[index])}
                             </td>`
                        )
                        .join("")}
                  </tr>

                  ${
                    teams.length > 2
                      ? `
                      ${[2, 3]
                        .map(
                          (index) =>
                            teams[index] &&
                            `<td valign="top" align="left" style="padding-top: 15px">
                              ${EmailTeam(teams[index])}
                             </td>`
                        )
                        .join("")}`
                      : ""
                  }
              </table>
          </td>
      </tr>
  </table>
  <!-- /// Projects list -->`;
}

function EmailStart(hasCollegeOnly, title, content) {
  const backgroundColor = hasCollegeOnly ? "#313638" : "#3260a4";

  return `
  <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <style type="text/css">
        /* ----- Custom Font Import ----- */
        @import url(https://fonts.googleapis.com/css?family=Roboto:400,700,400italic,700italic&subset=latin,latin-ext);

        /* ----- Text Styles ----- */
        table {
            font-family: 'Roboto', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-font-smoothing: antialiased;
            font-smoothing: antialiased;
        }

        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td {
            line-height: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        @media only screen and (max-width: 650px) {

            /* ----- Base styles ----- */
            .full-width-container {
                padding: 0 !important;
            }

            .container {
                width: 100% !important;
            }

            /* ----- Header ----- */
            .header td {
                padding: 30px 15px 30px 15px !important;
            }

            /* ----- Projects list ----- */
            .projects-list {
                display: block !important;
            }

            .projects-list tr {
                display: block !important;
            }

            .projects-list td {
                display: block !important;
            }

            .projects-list tbody {
                display: block !important;
            }

            .projects-list img {
                margin: 0 auto 25px auto;
            }

            /* ----- Half block ----- */
            .half-block {
                display: block !important;
            }

            .half-block tr {
                display: block !important;
            }

            .half-block td {
                display: block !important;
            }

            .half-block__image {
                width: 100% !important;
                background-size: cover;
            }

            .half-block__content {
                width: 100% !important;
                box-sizing: border-box;
                padding: 25px 15px 25px 15px !important;
            }

            /* ----- Hero subheader ----- */
            .hero-subheader__title {
                padding: 30px 15px 15px 15px !important;
                font-size: 35px !important;
            }

            .hero-subheader__content {
                padding: 0 15px 60px 15px !important;
            }

            /* ----- Title block ----- */
            .title-block {
                padding: 0 15px 0 15px;
            }

            /* ----- Paragraph block ----- */
            .paragraph-block__content {
                padding: 25px 15px 18px 15px !important;
            }
        }
    </style>

    <!--[if gte mso 9]><xml>
			<o:OfficeDocumentSettings>
				<o:AllowPNG/>
				<o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		</xml><![endif]-->
</head>

<body style="padding: 0; margin: 0;" bgcolor="${backgroundColor}">
    <span
        style="color:transparent !important; overflow:hidden !important; display:none !important; line-height:0px !important; height:0 !important; opacity:0 !important; visibility:hidden !important; width:0 !important; mso-hide:all;">This
        is your preheader text for this email (Read more about email preheaders here - https://goo.gl/e60hyK)</span>

    <!-- / Full width container -->
    <table class="full-width-container" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"
        bgcolor="${backgroundColor}" style="width: 100%; height: 100%; padding: 30px 0 30px 0;">
        <tr>
            <td align="center" valign="top">
                <!-- / 650px container -->
                <table class="container" border="0" cellpadding="0" cellspacing="0" width="650" bgcolor="#ffffff"
                    style="width: 650px;">
                    <tr>
                        <td align="center" valign="top">
                            <!-- / Header -->
                            <table class="container header" border="0" cellpadding="0" cellspacing="0" width="620"
                                style="width: 620px;">
                                <tr>
                                    <td style="padding: 10px 0 10px 0; border-bottom: solid 1px #eeeeee;" align="left">
                                        <a href="https://siba.averyincorporated.com"><img
                                                src="https://siba.averyincorporated.com/email/${
                                                  hasCollegeOnly ? COLLEGE : PRO
                                                }-email-header.png"
                                                alt="SIBA" /></a>
                                    </td>
                                </tr>
                            </table>
                            <!-- /// Header -->

                            <!-- / Hero subheader -->
                            <table class="container hero-subheader" border="0" cellpadding="0" cellspacing="0"
                                width="620" style="width: 620px;">
                                <tr>
                                    <td class="hero-subheader__title"
                                        style="font-size: 43px; font-weight: bold; padding: 30px 0 15px 0;"
                                        align="left">${title}</td>
                                </tr>

                                <tr>
                                    <td class="hero-subheader__content"
                                        style="font-size: 16px; line-height: 27px; color: #343a40; padding: 0 60px 10px 0;"
                                        align="left">${content}</td>
                                </tr>
                            </table>
                            <!-- /// Hero subheader -->`;
}

function EmailEnd(footer) {
  return `
  <!-- / Footer -->
  <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%"
      align="center">
      <tr>
          <td align="center">
              <table class="container" border="0" cellpadding="0" cellspacing="0" width="620"
                  align="center" style="border-top: 1px solid #eeeeee; width: 620px;">
                  <tr>
                      <td style="color: #969696; font-size: 14px; text-align: center; padding: 50px 0 30px 0;">
                      ${footer}<br/><br />
                          <a href="https://averyincorporated.com">Avery Incorporated</a>
                      </td>
                  </tr>

              </table>
          </td>
      </tr>
  </table>
  <!-- /// Footer -->
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>

</html>`;
}
