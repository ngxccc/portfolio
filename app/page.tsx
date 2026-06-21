import { getSocialStats, HomeContent } from "@/modules/home";

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
