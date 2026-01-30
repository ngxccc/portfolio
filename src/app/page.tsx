import { GitHubUser, StatsData } from "@/shared/types/stats";
import { HomeContent } from "../modules/home/components/home-content";
import { homeData } from "../modules/home/data/home-data";

async function getSocialStats() {
  const [githubRes, statsRes] = await Promise.all([
    // next: { revalidate: 3600 } -> Cache data trong 1 tiếng, không fetch liên tục
    fetch(homeData.githubApi, { next: { revalidate: 3600 } }),
    fetch(homeData.statsUrl, { next: { revalidate: 3600 } }),
  ]);

  const githubData = (await githubRes.json()) as GitHubUser;
  const statsData = (await statsRes.json()) as StatsData;

  return {
    githubRepos: githubData?.public_repos || 0,
    tiktokFollowers: Number(statsData?.tiktokFollowers) || 0,
  };
}

export default async function HomePage() {
  const { githubRepos, tiktokFollowers } = await getSocialStats();

  return (
    <main>
      <HomeContent
        initialGithubRepos={githubRepos}
        initialTiktokFollowers={tiktokFollowers}
      />
    </main>
  );
}
