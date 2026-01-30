import { siteConfig } from "@/shared/config/site";
import { GitHubUser, StatsData } from "@/shared/types/stats";

export async function getSocialStats() {
  const [githubRes, statsRes] = await Promise.all([
    // next: { revalidate: 3600 } -> Cache data trong 1 tiếng, không fetch liên tục
    fetch(siteConfig.githubApi, { next: { revalidate: 3600 } }),
    fetch(siteConfig.statsUrl, { next: { revalidate: 3600 } }),
  ]);

  const githubData = (await githubRes.json()) as GitHubUser;
  const statsData = (await statsRes.json()) as StatsData;

  return {
    githubRepos: githubData?.public_repos || 0,
    tiktokFollowers: Number(statsData?.tiktokFollowers) || 0,
  };
}
