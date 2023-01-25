/**
 * TODO: Add a new component that:
 *      tells the user that their submission was successful and that they should be on the lookout for an email
 *      tells the user that their email failed, but we still received their information
 *      tells the user that commissioner email failed or both emails failed and they should reach out to siba@averyincorporated.com
 * */

import type { JoinFormResults } from ".";

export default function JoinResults({
  memberName,
  isCommissionerEmailSuccessful,
  isMemberEmailSuccessful,
}: JoinFormResults) {
  let textColor;
  let heading;
  let icon;

  const completeSuccess =
    isCommissionerEmailSuccessful && isMemberEmailSuccessful;

  if (!isCommissionerEmailSuccessful && !isMemberEmailSuccessful) {
    textColor = "danger";
    heading = "Uh oh!";
    icon = "square-xmark";
  } else {
    textColor = "success";
    heading = "Success!";
    icon = "square-check";
  }

  return (
    <div className="content">
      <h2 className={`has-text-${textColor}-dark`}>
        <span className="icon-text">
          <span className="icon">
            <i className={`fa-solid fa-${icon}`} />
          </span>
          <span>{heading}</span>
        </span>
      </h2>

      <p>Thanks {memberName} for filling out the join form!</p>
      {completeSuccess && (
        <p>
          We received your information and a commissioner will add you and your
          team(s) to the league as soon as possible. Also, be on the lookout for
          an email giving a guide on how to get started, such as by joining our{" "}
          <a
            href="https://join.slack.com/t/sibabball/shared_invite/zt-grkrrq9i-je57xB2Y7NGoPTh0GlKNNg"
            target="_blank"
            rel="noreferrer"
          >
            slack community
          </a>
          , verifying the game versions, and downloading the league files and
          graphics.
        </p>
      )}
      {!isMemberEmailSuccessful && (
        <>
          <p>
            We received your information and a commissioner will add you and
            your team(s) to the league as soon as possible. However, there was
            an error sending your confirmation email that includes a helpful
            get-started guide. Sorry about that.
          </p>
          <p>
            If you need any help in downloading files or anything else
            SIBA-related, hop onto to our{" "}
            <a
              href="https://join.slack.com/t/sibabball/shared_invite/zt-grkrrq9i-je57xB2Y7NGoPTh0GlKNNg"
              target="_blank"
              rel="noreferrer"
            >
              slack
            </a>{" "}
            and someone will be happy to assist you. We&apos;re a friendly and
            supportive bunch!
          </p>
        </>
      )}
    </div>
  );
}
