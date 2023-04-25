const { capitalize } = require("lodash");
const { startCase } = require("lodash");
const { PRO_LEAGUE_INFO, COLLEGE_LEAGUE_INFO } = require("./constants.js");

/**
 *
 * @param {string} name - the name of the new member
 * @param {string} email - the email of the new member
 * @param {string} found - how the member found SIBA
 * @param {string} reason - the reason the member joined the league. This can be `null`.
 * @param {object} proTeam - the pro team that the new member has selected. This can be `null`.
 * @param {object[]} collegeTeams - the college teams that the new member has selected. This array can be empty.
 * @returns an `object` containing the email subject and body content in html and plain text versions
 */
function generateCommissionerEmail(
  name,
  email,
  found,
  reason,
  proTeam,
  collegeTeams
) {
  const hasPro = !!proTeam;
  const hasCollege = collegeTeams.length > 0;

  const joining =
    hasPro && hasCollege
      ? "both leagues"
      : hasPro
      ? "the pro league"
      : "the college league";

  const subject = `${name} wants to join ${joining}!`;

  const emailHeader = generateEmailStart(subject);
  const bodyStart = generateEmailBodyHeader(joining, true);
  const memberInfo = generateMemberInfo(subject, name, email, found, reason);
  const teamsInfo = generateTeams(proTeam, collegeTeams);
  const emailFooter = generateEmailEnd(true);

  const html = emailHeader + bodyStart + memberInfo + teamsInfo + emailFooter;
  const plain = generatePlainTextEmail(
    name,
    email,
    found,
    reason,
    proTeam,
    collegeTeams,
    true
  );

  return { subject, html, plain };
}

/**
 * This function generates the subject and body content (html and plaintext versions) of the welcome email a new member
 * receives when they first join SIBA/SICBA. This includes helpful information to get them started as well as their
 * selected teams and their responding GM/Head Coach.
 * @param {string} name - the name of the new member
 * @param {object} proTeam - the pro team that the new member has selected. This can be `null`
 * @param {object[]} collegeTeams - the college teams that the new member has selected. This array can be empty.
 * @returns an `object` containing the email subject and body content in html and plain text versions
 */
function generateMemberEmail(name, proTeam, collegeTeams) {
  const hasPro = !!proTeam;
  const hasCollege = collegeTeams.length > 0;

  const leagues = [];
  hasPro && leagues.push(PRO_LEAGUE_INFO.abbv);
  hasCollege && leagues.push(COLLEGE_LEAGUE_INFO.abbv);
  const leagueStr = leagues.join(" and ");

  const subject = `Welcome to ${leagueStr}, ${name}!`;

  const emailHeader = generateEmailStart(subject);
  const bodyStart = generateEmailBodyHeader(leagueStr);
  const generalInfo = generateGeneralInformation(
    name,
    leagueStr,
    hasPro,
    hasCollege
  );
  const teamsInfo = generateTeams(proTeam, collegeTeams);
  const emailFooter = generateEmailEnd();

  const html = emailHeader + bodyStart + generalInfo + teamsInfo + emailFooter;
  const plain = generatePlainTextEmail(
    name,
    "",
    "",
    "",
    proTeam,
    collegeTeams,
    true
  );

  return { subject, html, plain };
}

module.exports = {
  generateMemberEmail,
  generateCommissionerEmail,
};

function getFoundLabel(found) {
  switch (found) {
    case "developers":
      return "Wolverine Studios Forums";
    case "referral":
      return "Friend/Family";
    case "google":
      return "Google";
    case "twitter":
      return "Twitter";
    default:
      return "Something else";
  }
}

/**
 * This function generates a plain text version of the email that is sent to the member/commissioner, just in case
 * their email client doesn't handle html.
 * @param {string} name - the name of the new member
 * @param {string} email - the email of the new member
 * @param {string} found - how the member found SIBA
 * @param {string} reason - the reason the member joined the league. This can be `null`.
 * @param {object} proTeam - the pro team that the new member has selected. This can be `null`.
 * @param {object[]} collegeTeams - the college teams that the new member has selected. This array can be empty.
 * @param {boolean} isToCommissioner - determines if this email is going to the commissioner or the new member
 * * @returns a plain text version of the email
 */
function generatePlainTextEmail(
  name,
  email,
  found,
  reason,
  proTeam,
  collegeTeams,
  isToCommissioner = false
) {
  const hasPro = !!proTeam;
  const hasCollege = collegeTeams.length > 0;
  let start;

  if (isToCommissioner) {
    start = `Hello Commissioner,
    Below, you'll find all the information required to enter our new member into the league.

    -----------------
    BASIC INFORMATION
    -----------------
    
    Name: ${name}
    Email: ${email}
    Found SIBA from: ${getFoundLabel(found)}
    ${!!reason ? `Reason: ${reason}` : ""}
    `;
  } else {
    const leagues = [];
    hasPro && leagues.push(PRO_LEAGUE_INFO.abbv);
    hasCollege && leagues.push(COLLEGE_LEAGUE_INFO.abbv);
    const leagueStr = leagues.join(" and ");

    start = `Hi ${name},
        Thank you for joining! We look forward to chatting with you in our Slack community,
        https://join.slack.com/t/sibabball/shared_invite/zt-grkrrq9i-je57xB2Y7NGoPTh0GlKNNg.
        If you haven't joined already, be sure to do so and say hi in the general channel. From there, 
        one of the commissioners will add you to the right channels for ${leagueStr}.

        Below are some friendly reminders for getting ready to join in on the fun.

        -------------
        GAME VERSIONS
        -------------

        ${hasPro && "Pro: Draft Day Sports: Pro Basketball 2021 version 10.11"}
        ${
          hasCollege &&
          "College: Draft Day Sports: College Basketball 2021 version 9.7"
        }
        
        -------------------------
        LEAGUE GRAPHICS AND FILES
        -------------------------
        
        There are two important downloads needed for running the league and managing your team(s): 
        the graphics folder and the league file. Check below to see where you can find these downloads
        as well where to place them once on your computer.

        ${
          hasPro &&
          `Pro:
            Download Link: https://siba.averyincorporated.com/siba/downloads
            Graphics Computer Location: C:\\Wolverine Studios\\DDSPB2021
            League File Computer Location: C:\\Wolverine Studios\\DDSPB2021\\app\\disk\\saves`
        }

        ${
          hasCollege &&
          `College:
            Download Link: https://siba.averyincorporated.com/college/downloads
            Graphics Computer Location: C:\\Wolverine Studios\\DDSCB2021
            League File Computer Location: C:\\Wolverine Studios\\DDSCB2021\\app\\disk\\saves`
        }`;
  }

  const teams = getTeamsArray(collegeTeams, proTeam);
  const teamsInfo = `${
    isToCommissioner
      ? `
    --------------
    SELECTED TEAMS
    --------------`
      : `
    ----------
    YOUR TEAMS
    ----------`
  }

  ${teams
    .map((t) => {
      const leagueInfo =
        t.type === "pro" ? PRO_LEAGUE_INFO : COLLEGE_LEAGUE_INFO;
      const currentInfo = `${t.team.name} ${t.team.mascot} (${capitalize(
        t.type
      )}):
    Password: ${t.password}
                
    ${startCase(leagueInfo.singleMember)}
    ${t.firstName} ${t.lastName} (${t.age})
    Face Picture Number: ${t.picture}
    Outfit Picture Number: ${t.outfit}

    ${
      t.type === "college"
        ? `Personality
        
        Ambition: ${t.ambition}
        Academics: ${t.academics}
        Discipline: ${t.discipline}
        Integrity: ${t.integrity}
        Temper: ${t.temper}`
        : ""
    }

    Ability Points
    ${leagueInfo.pointLabels
      .map((points) => `${points.label[t.type]}: ${t[points.key]}`)
      .join("")}
`;

      return currentInfo;
    })
    .join("")}`;

  return start + teamsInfo;
}

/**
 * This function generates the beginning of emails sent when a new member joins SIBA/SICBA.
 * The subject can vary depending on the recipient, which can be either the new member as a welcome email
 * or the information email sent to the commissioner to add the new member.
 * @param {string} subject - The email's subject
 * @returns Email <!DOCTYPE html>, <html> beginning, and entire <head> section
 */
function generateEmailStart(subject) {
  return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
        <!-- Tell iOS not to automatically link certain text strings. -->
        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">
        <title>${subject}</title> <!--   The title tag shows in email notifications, like Android 4.4. -->
    
        <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
    
        <!-- Web Font / @font-face : BEGIN -->
        <!-- NOTE: If web fonts are not required, lines 23 - 41 can be safely removed. -->
    
        <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
        <!--[if mso]>
            <style>
                * {
                    font-family: sans-serif !important;
                }
            </style>
        <![endif]-->
    
        <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
        <!--[if !mso]><!-->
        <link
            href="https://fonts.googleapis.com/css2?family=Secular+One&family=Maven+Pro:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet" type='text/css'>
        <!--<![endif]-->
    
        <!-- Web Font / @font-face : END -->
    
        <!-- CSS Reset : BEGIN -->
        <style>
            /* What it does: Tells the email client that only light styles are provided but the client can transform them to dark. A duplicate of meta color-scheme meta tag above. */
            :root {
                color-scheme: light;
                supported-color-schemes: light;
            }
    
            /* What it does: Remove spaces around the email design added by some email clients. */
            /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
            html,
            body {
                margin: 0 auto !important;
                padding: 0 !important;
                height: 100% !important;
                width: 100% !important;
            }
    
            /* What it does: Stops email clients resizing small text. */
            * {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
    
            /* What it does: Centers email on Android 4.4 */
            div[style*="margin: 16px 0"] {
                margin: 0 !important;
            }
    
            /* What it does: forces Samsung Android mail clients to use the entire viewport */
            #MessageViewBody,
            #MessageWebViewDiv {
                width: 100% !important;
            }
    
            /* What it does: Stops Outlook from adding extra spacing to tables. */
            table,
            td {
                mso-table-lspace: 0pt !important;
                mso-table-rspace: 0pt !important;
            }
    
            /* What it does: Fixes webkit padding issue. */
            table {
                border-spacing: 0 !important;
                border-collapse: collapse !important;
                table-layout: fixed !important;
                margin: 0 auto !important;
            }
    
            /* What it does: Uses a better rendering method when resizing images in IE. */
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
            a {
                text-decoration: none;
            }
    
            /* What it does: A work-around for email clients meddling in triggered links. */
            a[x-apple-data-detectors],
            /* iOS */
            .unstyle-auto-detected-links a,
            .aBn {
                border-bottom: 0 !important;
                cursor: default !important;
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
            .a6S {
                display: none !important;
                opacity: 0.01 !important;
            }
    
            /* What it does: Prevents Gmail from changing the text color in conversation threads. */
            .im {
                color: inherit !important;
            }
    
            /* If the above doesn't work, add a .g-img class to any image in question. */
            img.g-img+div {
                display: none !important;
            }
    
            /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
            /* Create one of these media queries for each additional viewport size you'd like to fix */
    
            /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
            @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                u~div .email-container {
                    min-width: 320px !important;
                }
            }
    
            /* iPhone 6, 6S, 7, 8, and X */
            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                u~div .email-container {
                    min-width: 375px !important;
                }
            }
    
            /* iPhone 6+, 7+, and 8+ */
            @media only screen and (min-device-width: 414px) {
                u~div .email-container {
                    min-width: 414px !important;
                }
            }
        </style>
        <!-- CSS Reset : END -->
    
        <!-- Progressive Enhancements : BEGIN -->
        <style>
            /* What it does: Hover styles for buttons */
            .button-td,
            .button-a {
                transition: all 100ms ease-in;
            }
    
            .button-td-primary:hover,
            .button-a-primary:hover {
                background: #555555 !important;
                border-color: #555555 !important;
            }
    
            /* Media Queries */
            @media screen and (max-width: 600px) {
    
                /* What it does: Adjust typography on small screens to improve readability */
                .email-container p {
                    font-size: 17px !important;
                }
    
            }
        </style>
        <!-- Progressive Enhancements : END -->
    
    </head>
    `;
}

/**
 * This function generates the beginning of the actual <body> of the html email.
 * @param {string} league - combination of pro and college abbreviations depending on member's team(s)
 * @param {boolean} isToCommissioner - determines if this email is going to the commissioner or the new member
 * @returns Email <body> beginning, email preview text
 */
function generateEmailBodyHeader(league, isToCommissioner = false) {
  const previewText = isToCommissioner
    ? `We have a new member joining ${league}. You'll find everything you need to add this member to their respective league(s).`
    : `Thanks for joining the ${league}! We're looking forward to see how you manage your team(s). In this email,
    you'll some helpful information to get you started.`;

  return `
<!--
	The email background color (#3260a4) is defined in three places:
	1. body tag: for most email clients
	2. center tag: for Gmail and Inbox mobile apps and web versions of Gmail, GSuite, Inbox, Yahoo, AOL, Libero, Comcast, freenet, Mail.ru, Orange.fr
	3. mso conditional: For Windows 10 Mail
-->

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #3260a4;">
    <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #3260a4;">
        <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #3260a4;">
    <tr>
    <td>
    <![endif]-->

        <!-- Visually Hidden Preheader Text : BEGIN -->
        <div style="max-height:0; overflow:hidden; mso-hide:all;" aria-hidden="true">
        ${previewText}
        </div>
        <!-- Visually Hidden Preheader Text : END -->

        <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
        <!-- Preview Text Spacing Hack : BEGIN -->
        <div
            style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <!-- Preview Text Spacing Hack : END -->

        <!--
            Set the email width. Defined in two places:
            1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.
            2. MSO tags for Desktop Windows Outlook enforce a 600px width.
        -->
        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <!--[if mso]>
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
            <tr>
            <td>
            <![endif]-->

            <!-- Email Body : BEGIN -->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="margin: auto;">
                <!-- Email Header : BEGIN -->
                <tr>
                    <td style="padding: 20px 0; text-align: center">
                        <img src="https://siba.averyincorporated.com/email/pro-email-header.png" width="124" height="60"
                            alt="SIBA League Logo" border="0"
                            style="height: auto; background: #ffffff; font-family: 'Maven Pro', sans-serif; font-size: 15px; line-height: 15px; color: #555555;">
                    </td>
                </tr>
                <!-- Email Header : END -->
                `;
}

function generateMemberInfo(title, name, email, found, reason) {
  const foundLabel = getFoundLabel(found);

  return `
    <!-- Member Information : BEGIN -->
    <tr>
        <td style="background-color: #ffffff;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                    <td
                        style="padding: 20px 20px 0; font-family: 'Maven Pro', sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                        <h1
                            style="margin: 0 0 10px 0; font-family: 'Secular One', sans-serif; font-size: 25px; line-height: 30px; color: #333333; font-weight: normal;">
                            ${title}!</h1>
                        <p style="margin: 0 0 10px 0;">Hello Commissioner,</p>
                        <p style="margin: 0 0 10px 0;">Below, you'll find all the information required to enter our new member into the league.</p>

                        <h2
                            style="margin: 10px 0 10px 0; padding: 10px 0 0 0; font-family: 'Secular One', sans-serif; font-size: 20px; line-height: 22px; color: #333333;">
                            Basic Information</h2>
                        <p style="margin: 0;"><b>Name:</b> ${name}</p>
                        <p style="margin: 0;"><b>Email:</b> ${email}</p>
                        <p style="margin: 0;"><b>Found SIBA from:</b> ${foundLabel}</p>
                        ${
                          !!reason
                            ? `<p style="margin: 0;"><b>Reason:</b> ${reason}</p>`
                            : ""
                        }
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- Member Information : END -->`;
}

/**
 * This function generates the general information of the html email for the new member. This details the game versions
 * and download file locations. It also mentions the slack channel so that the member can immediately join the main
 * location for chatting about the league.
 * @param {string} name - the name of the new member
 * @param {string} league - combination of pro and college abbreviations depending on member's team(s)
 * @param {boolean} hasPro - shows whether or not the member is managing a pro team
 * @param {boolean} hasCollege - shows whether or not the member is managing 1-3 college team(s)
 * @returns Email table row for the general information section of the member email
 */
function generateGeneralInformation(name, league, hasPro, hasCollege) {
  return `<!-- General Information : BEGIN -->
    <tr>
        <td style="background-color: #ffffff;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                    <td
                        style="padding: 20px 20px 0; font-family: 'Maven Pro', sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                        <h1
                            style="margin: 0 0 10px 0; font-family: 'Secular One', sans-serif; font-size: 25px; line-height: 30px; color: #333333; font-weight: normal;">
                            Welcome to the ${league}!</h1>
                        <p style="margin: 0 0 10px 0;">Hi ${name},</p>
                        <p style="margin: 0 0 10px 0;">Thank you for joining! We look forward to chatting
                            with you in
                            our <a
                                href="https://join.slack.com/t/sibabball/shared_invite/zt-grkrrq9i-je57xB2Y7NGoPTh0GlKNNg"
                                target="_blank" style="color: #0f85ec">Slack community</a>. If you haven't
                            joined already, be sure to do so
                            and say hi in the general channel. From there, one of the commissioners will add
                            you to the right channels for
                            ${league}.</p>
                        <p style="margin: 0 0 10px 0;">Below are some friendly reminders for getting ready
                            to join in on the fun.</p>

                        <h2
                            style="margin: 10px 0 10px 0; padding: 10px 0 0 0; font-family: 'Secular One', sans-serif; font-size: 20px; line-height: 22px; color: #333333;">
                            Game Versions</h2>
                        ${
                          hasPro &&
                          `<p style="margin: 0;"><b>Pro:</b> Draft Day Sports: Pro Basketball 2021 version
                            10.11</p>`
                        }
                        ${
                          hasCollege &&
                          `<p style="margin: 0;"><b>College:</b> Draft Day Sports: College Basketball
                            2021 version 9.7</p>`
                        }

                        <h2
                            style="margin: 10px 0 10px 0; padding: 10px 0 0 0; font-family: 'Secular One', sans-serif; font-size: 20px; line-height: 22px; color: #333333; font-weight: bold;">
                            League Graphics and Files</h2>
                        <p style="margin: 0;">There are two important downloads needed for running the
                            league and managing your
                            team(s): the graphics folder and the league file. Check below to see where you
                            can find
                            these downloads as well where to place them once on your computer.</p>

                        ${
                          hasPro &&
                          `<p style="margin: 10px 0 10px 0;"><b>Pro:</b></p>
                        <ul style="padding: 0; margin: 0; list-style-type: disc;">
                            <li style="margin:0 0 0 30px;" class="list-item-first">Download Link: <a
                                    href="https://siba.averyincorporated.com/siba/downloads"
                                    style="color: #0f85ec">https://siba.averyincorporated.com/siba/downloads</a>
                            </li>
                            <li style="margin:0 0 0 30px;">Graphics Computer Location: <code
                                    style="background-color: #f7f7f7; color: #3260a4">C:\\Wolverine Studios\\DDSPB2021</code>
                            </li>
                            <li style="margin: 0 0 0 30px;" class="list-item-last">League File Computer
                                Location:
                                <code
                                    style="background-color: #f7f7f7; color: #3260a4">C:\\Wolverine Studios\\DDSPB2021\\app\\disk\\saves</code>
                            </li>
                        </ul>`
                        }

                        ${
                          hasCollege &&
                          `<p style="margin: 10px 0 10px 0;"><b>College:</b></p>
                        <ul style="padding: 0; margin: 0; list-style-type: disc;">
                            <li style="margin:0 0 0 30px;" class="list-item-first">Download Link: <a
                                    href="https://siba.averyincorporated.com/college/downloads"
                                    style="color: #0f85ec">https://siba.averyincorporated.com/college/downloads</a>
                            </li>
                            <li style="margin:0 0 0 30px;">Graphics Computer Location: <code
                                    style="background-color: #f7f7f7; color: #3260a4">C:\\Wolverine Studios\\DDSCB2021</code>
                            </li>
                            <li style="margin:0 0 0 30px;" class="list-item-last">League File Computer
                                Location:
                                <code
                                    style="background-color: #f7f7f7; color: #3260a4">C:\\Wolverine Studios\\DDSCB2021\\app\\disk\\saves</code>
                            </li>
                        </ul>`
                        }
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- General Information : END -->`;
}

/**
 * This function generates the Selected Teams section of the html email. We include this information in the new member's
 * email to have a quicker turnaround on typos or other errors.
 * @param {object} proTeam - the pro team that the new member has selected. This can be `null`
 * @param {object[]} collegeTeams - the college teams that the new member has selected. This array can be empty.
 * @param {boolean} isToCommissioner - determines if this email is going to the commissioner or the new member
 * @returns Email table for the member's teams, including pro and/or college teams
 */
function generateTeams(proTeam, collegeTeams, isToCommissioner = false) {
  const totalTeams = getTeamsArray(collegeTeams, proTeam);

  const start = `<!-- Selected Teams : BEGIN -->
  <tr>
      <td style="padding: 0 20px 40px; background-color: #ffffff;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                  <td>
                      <h2
                          style="margin: 10px 0; padding: 10px 0 0 0; font-family: 'Secular One', sans-serif; font-size: 20px; line-height: 22px; color: #333333; font-weight: bold;">
                          ${isToCommissioner ? "Selected" : "Your"} Teams</h2>
                  </td>
              </tr>
              `;

  const teamRows = totalTeams
    .map((t, i) => {
      const leagueInfo =
        t.type === "pro" ? PRO_LEAGUE_INFO : COLLEGE_LEAGUE_INFO;
      const rowStart = i % 2 === 0 ? "<tr>" : "";
      const rowEnd = i % 2 !== 0 ? "<tr>" : "";
      const rowBody = `
    <td valign="top" width="50%" style="padding: 0 5px 0 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td
                    style="text-align: left; font-family: 'Maven Pro', sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                    <p
                        style="margin: 0; color: #3260a4; font-size: 16px; font-weight: bold;">
                        ${t.team.name} ${t.team.mascot} (${capitalize(
        t.type
      )})</p>
                    <p style="margin: 0 0 10px 0;"><span
                            style="font-weight: 500;">Password:</span> ${
                              t.password
                            }</p>
                    <p style="margin: 0;">${startCase(
                      leagueInfo.singleMember
                    )}</p>
                    <p style="margin: 0;">${t.firstName} ${t.lastName} (${
        t.age
      })</p>
                </td>
            </tr>
            <tr>
                <td
                    style="padding: 10px 0; text-align: left; font-family: 'Maven Pro',sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                    <img src="https://siba.averyincorporated.com/files/${
                      t.type
                    }/Website/images/${leagueInfo.pictureFolder}/fac/${
        t.picture
      }.png" width="260" alt=""
                        border="0"
                        style="width: 100%; max-width: 260px; height: auto; display: block; background: #ffffff;">
                    <p style="margin: 0;"><span style="font-weight: 500;">Face Picture
                            Number:</span> ${t.picture}</p>
                </td>
            </tr>
            <tr>
                <td
                    style="padding: 10px 0; text-align: left; font-family: 'Maven Pro',sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                    <img src="https://siba.averyincorporated.com/files/${
                      t.type
                    }/Website/images/${leagueInfo.pictureFolder}/clothes/${
        t.outfit
      }.png" width="260" alt=""
                        border="0"
                        style="width: 100%; max-width: 260px; height: auto; display: block; background: #ffffff;">
                    <p style="margin: 0;"><span style="font-weight: 500;">Outfit Picture
                            Number:</span> ${t.outfit}</p>
                </td>
            </tr>
            ${
              t.type === "college"
                ? `
            <tr>
                <td
                    style="text-align: left; font-family: 'Maven Pro', sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                    <p style="margin: 10px 0 5px 0; font-size: 16px; font-weight: bold;">
                        Personality
                    </p>

                    <p style="margin: 0;"><span style="font-weight: 500;">Ambition:</span>
                        ${t.ambition}</p>
                    <p style="margin: 0;"><span style="font-weight: 500;">Academics:</span>
                        ${t.academics}</p>
                    <p style="margin: 0;"><span style="font-weight: 500;">Discipline:</span>
                        ${t.discipline}</p>
                    <p style="margin: 0;"><span style="font-weight: 500;">Integrity:</span>
                        ${t.integrity}</p>
                    <p style="margin: 0;"><span style="font-weight: 500;">Temper:</span>
                        ${t.temper}</p>

                </td>
            </tr>
            `
                : ""
            }
            <tr>
                <td
                    style="text-align: left; font-family: 'Maven Pro', sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                    <p style="margin: 10px 0 5px 0; font-size: 16px; font-weight: bold;">
                        Ability Points
                    </p>
                    ${leagueInfo.pointLabels
                      .map(
                        (points) =>
                          `<p style="margin: 0;"><span style="font-weight: 500;">${
                            points.label[t.type]
                          }:</span> ${t[points.key]}</p>`
                      )
                      .join("")}
                </td>
            </tr>
        </table>
    </td>`;

      return rowStart + rowBody + rowEnd;
    })
    .join("");

  const end = `</table>
    </td>
</tr>
<!-- Selected Teams : END -->`;

  return start + teamRows + end;
}

function getTeamsArray(collegeTeams, proTeam) {
  const collegeFormatted = collegeTeams.map((team) => ({
    type: "college",
    ...team,
  }));

  const proFormatted = proTeam ? [{ type: "pro", ...proTeam }] : [];

  const totalTeams = proFormatted.concat(collegeFormatted);
  return totalTeams;
}

/**
 * This function generates the end of the html version of the email
 * @param {boolean} isToCommissioner - determines if this email is going to the commissioner or the new member
 * @returns Email <body> and <html> end
 */
function generateEmailEnd(isToCommissioner = false) {
  return ` </table>
    <!-- Email Body : END -->

    <!-- Email Footer : BEGIN -->
    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto;">
        <tr>
            <td
                style="padding: 20px; font-family: 'Maven Pro', sans-serif; font-size: 12px; line-height: 15px; text-align: center; color: #ffffff;">
                <p style="margin: 0;">${
                  isToCommissioner
                    ? "You are receiving this email because someone completed the join form and you are deemed the commissioner for both the pro league and college of SIBA."
                    : `You are receiving this email because you completed the join form on <a
                        href="https://siba.averyincorporated.com/"
                        style="color: #ffffff !important; text-decoration: underline;">siba.averyincorporated.com</a>.`
                }
                </p>
                <br />
                <p style="margin: 0; ">
                    <a href="https://averyincorporated.com/"
                        style="color: #ffffff !important; text-decoration: underline;">Avery Incorporated</a>
                </p>
            </td>
        </tr>
    </table>
    <!-- Email Footer : END -->

    <!--[if mso]>
    </td>
    </tr>
    </table>
    <![endif]-->
</div>

<!--[if mso | IE]>
</td>
</tr>
</table>
<![endif]-->
</center>
</body>

</html>`;
}
