import SelectedTeams from "./SelectedTeams";

export default function JoinForm() {
  return (
    <form>
      <div className="field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <div className="control">
          <input
            name="name"
            id="name"
            className="input"
            type="text"
            placeholder="e.g. first name or nickname"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <div className="control">
          <input
            name="email"
            id="email"
            className="input"
            type="email"
            placeholder="e.g. example@email.com"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="discord" className="label">
          Discord Username
        </label>
        <div className="control">
          <input
            name="discord"
            id="discord"
            className="input"
            type="text"
            placeholder="e.g. user_name"
          />
          <p className="help">
            Creating a new discord account is not required.
          </p>
        </div>
      </div>
      <div className="field">
        <label htmlFor="foundFrom" className="label">
          Found SIBA from
        </label>
        <div className="control">
          <div className="select">
            <select name="foundFrom" id="foundFrom">
              <option>--select one--</option>
              <option value="devs">Wolverine Studios</option>
              <option value="referral">Family or Friend</option>
              <option value="google">Google</option>
              <option value="socials">Twitter, Bluesky, etc.</option>
              <option value="other">Other (Please provide below)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Reason for joining</label>
        <div className="control">
          <textarea
            name="reason"
            className="textarea"
            placeholder=""
          ></textarea>
        </div>
      </div>
      <div className="content mt-5">
        <h2>Select Your Teams</h2>
        <p>
          Choose your teams for the either the pro league, the college league,
          or both. You must have at least one team selected before submitting
          the form.
        </p>
      </div>
      <SelectedTeams />
      <button type="submit" className="button is-primary mt-4">
        Join
      </button>
    </form>
  );
}
