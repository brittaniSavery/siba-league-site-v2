import type {
  HumanTeam,
  Member,
  StrapiCollectionResponse,
  StrapiCollegeInfo,
  StrapiProInfo,
  StrapiSingleTypeResponse,
  StrapiTeamInfo,
} from "./types";

export async function getDataFromApi<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<T>);
}

export async function getStrapiMembers(type: "pro" | "college") {
  const strapiObjectType = type === "pro" ? "general-managers" : "coaches";
  const strapiPaginationLimit = type === "pro" ? 32 : 100;

  const strapiMembers = await getDataFromApi<StrapiCollectionResponse<Member>>(
    `${import.meta.env.PUBLIC_CMS_URL}/${strapiObjectType}?sort=team&pagination[limit]=${strapiPaginationLimit}`,
  );

  return strapiMembers.data.map<Member>((m) => ({
    team: m.attributes.team,
    name: m.attributes.name,
    logo: m.attributes.logo,
  }));
}

export async function getProTeams() {
  const teamInfo = await getDataFromApi<
    StrapiSingleTypeResponse<StrapiProInfo>
  >(`${import.meta.env.PUBLIC_CMS_URL}/pro-info`);

  return {
    teams: teamInfo.data.attributes.teams,
    lastUpdated: new Date(teamInfo.data.attributes.updatedAt),
  };
}

export async function getSchools() {
  const teamInfo = await getDataFromApi<
    StrapiSingleTypeResponse<StrapiCollegeInfo>
  >(`${import.meta.env.PUBLIC_CMS_URL}/college-info`);

  return {
    teams: teamInfo.data.attributes.teams,
    lastUpdated: teamInfo.data.attributes.updatedAt,
  };
}

export async function getProHumanTeams() {
  return getHumanTeams("pro");
}

export async function getCollegeHumansTeams() {
  return getHumanTeams("college");
}

async function getHumanTeams(type: "pro" | "college") {
  const strapiMembers = await getStrapiMembers(type);
  const members: HumanTeam[] = strapiMembers.map((m) => ({
    team: m.team,
    member: m.name,
  }));

  const teamInfo = await getDataFromApi<
    StrapiSingleTypeResponse<StrapiTeamInfo>
  >(`${import.meta.env.PUBLIC_CMS_URL}/${type}-info`);

  const teams: HumanTeam[] =
    teamInfo.data.attributes.teams.map((t) => ({
      id: t.id,
      team: `${t.name} ${t.mascot}`,
    })) || [];

  return mergeArrays(members, teams, "team");
}

function mergeArrays<T, U extends T>(
  existingArray: T[],
  mergeArray: U[],
  matchKey: keyof T,
): T[] {
  return existingArray.map((existingItem) => {
    const match = mergeArray.find(
      (mergeItem) => mergeItem[matchKey] === existingItem[matchKey],
    );
    return match ? { ...existingItem, ...match } : existingItem;
  });
}
