import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { github } from "../assets";

const GithubStats = () => {
  const [stats, setStats] = useState({
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    followers: 0,
    following: 0,
    publicGists: 0,
    contributions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentRepos, setRecentRepos] = useState([]);

  const username = "Divyanshu-Mishra9620";

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = {
          Accept: "application/vnd.github.v3+json",
        };

        const token = import.meta.env.VITE_GITHUB_TOKEN?.trim();

        if (token && token.length > 0) {
          headers.Authorization = `token ${token}`;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, 10000);

        try {
          const userResponse = await fetch(
            `https://api.github.com/users/${username}`,
            {
              headers,
              signal: controller.signal,
            }
          );

          const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
            {
              headers,
              signal: controller.signal,
            }
          );

          clearTimeout(timeoutId);

          if (!userResponse.ok) {
            if (userResponse.status === 403) {
              throw new Error(
                "API rate limit exceeded. Please add a GitHub token to .env.local (VITE_GITHUB_TOKEN)"
              );
            }
            throw new Error(
              `Failed to fetch user data: ${userResponse.statusText}`
            );
          }
          if (!reposResponse.ok) {
            if (reposResponse.status === 403) {
              throw new Error(
                "API rate limit exceeded. Please add a GitHub token to .env.local (VITE_GITHUB_TOKEN)"
              );
            }
            throw new Error(
              `Failed to fetch repositories: ${reposResponse.statusText}`
            );
          }

          const userData = await userResponse.json();
          const reposData = await reposResponse.json();

          if (!userData) {
            throw new Error("Invalid user data from GitHub API");
          }
          if (!Array.isArray(reposData)) {
            throw new Error("Invalid repositories data from GitHub API");
          }

          const totalStars = reposData.reduce(
            (acc, repo) => acc + (repo?.stargazers_count || 0),
            0
          );
          const totalForks = reposData.reduce(
            (acc, repo) => acc + (repo?.forks_count || 0),
            0
          );

          const filteredRepos = reposData.filter((repo) => {
            const homepage = repo?.homepage;
            return !homepage || (homepage && !homepage.startsWith("file://"));
          });

          const recent = filteredRepos.slice(0, 6).map((repo) => ({
            name: repo?.name || "Unnamed Repository",
            description: repo?.description || "No description available",
            stars: repo?.stargazers_count || 0,
            forks: repo?.forks_count || 0,
            language: repo?.language || "Unknown",
            url: repo?.html_url || "#",
            homepage:
              repo?.homepage && !repo.homepage.startsWith("file://")
                ? repo.homepage
                : null,
            updated: repo?.updated_at
              ? new Date(repo.updated_at).toLocaleDateString()
              : "N/A",
          }));

          const newStats = {
            totalRepos: userData?.public_repos || 0,
            totalStars,
            totalForks,
            followers: userData?.followers || 0,
            following: userData?.following || 0,
            publicGists: userData?.public_gists || 0,
          };

          setStats(newStats);
          setRecentRepos(recent);
          setLoading(false);
        } catch (fetchErr) {
          clearTimeout(timeoutId);
          throw fetchErr;
        }
      } catch (err) {
        console.error("Error fetching GitHub stats:", err);
        setError(
          err.message ||
            "Failed to fetch GitHub stats. Please try refreshing the page."
        );
        setLoading(false);

        setStats({
          totalRepos: 0,
          totalStars: 0,
          totalForks: 0,
          followers: 0,
          following: 0,
          publicGists: 0,
        });
        setRecentRepos([]);
      }
    };

    fetchGithubStats();
  }, []);

  const statCards = [
    {
      label: "Public Repos",
      value: stats.totalRepos,
      icon: "REPO",
      color: "from-gray-600 to-gray-800",
    },
    {
      label: "Total Stars",
      value: stats.totalStars,
      icon: "STAR",
      color: "from-gray-500 to-gray-700",
    },
    {
      label: "Total Forks",
      value: stats.totalForks,
      icon: "FORK",
      color: "from-gray-600 to-gray-800",
    },
    {
      label: "Followers",
      value: stats.followers,
      icon: "USER",
      color: "from-gray-500 to-gray-700",
    },
    {
      label: "Following",
      value: stats.following,
      icon: "LINK",
      color: "from-gray-600 to-gray-800",
    },
    {
      label: "Public Gists",
      value: stats.publicGists,
      icon: "GIST",
      color: "from-gray-500 to-gray-700",
    },
  ];

  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    React: "#61dafb",
    "Jupyter Notebook": "#DA5B0B",
  };

  return (
    <div className="w-screen relative left-[calc(-50vw+50%)] px-0 md:px-0 bg-transparent min-h-[520px]">
      <div className="w-full bg-black relative overflow-hidden h-full">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(145, 94, 255, 0.15) 25%, rgba(145, 94, 255, 0.15) 26%, transparent 27%, transparent 74%, rgba(145, 94, 255, 0.15) 75%, rgba(145, 94, 255, 0.15) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, 0.15) 25%, rgba(0, 212, 255, 0.15) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.15) 75%, rgba(0, 212, 255, 0.15) 76%, transparent 77%, transparent)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div
          className={`relative z-10 ${styles.padding} py-12 md:py-16`}
        >
          <motion.div variants={textVariant()} className="mb-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
              <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
                &gt; system.analyze()
              </p>
            </div>
            <h2 className={`${styles.sectionHeadText} font-black text-white`}>
              <span className="text-gray-400">&lt;</span>
              GitHub
              <span className="text-white">/</span>
              <span className="text-gray-400">&gt;</span>
            </h2>
            <p className="text-gray-400 font-mono text-xs mt-2 opacity-70">
              // Real-time GitHub metrics & activity logs
            </p>
          </motion.div>

          {loading ? (
            <div className="mt-10 flex justify-center items-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-secondary text-lg">
                  Loading GitHub stats...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="mt-10 flex justify-center items-center">
              <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-8 max-w-2xl">
                <h3 className="text-red-500 text-center font-bold mb-3">
                  GitHub Data Unavailable
                </h3>
                <p className="text-red-400 text-center text-sm mb-4">{error}</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 text-sm font-medium"
                  >
                    Retry
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        "https://github.com/Divyanshu-Mishra9620",
                        "_blank"
                      )
                    }
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 text-sm font-medium"
                  >
                    Visit GitHub
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                    className="relative group"
                  >
                    <div className="relative bg-black bg-opacity-80 border border-white border-opacity-30 group-hover:border-white p-6 rounded-lg transition-all duration-300 backdrop-blur-sm">
                      <div className="flex items-start justify-between mb-4">
                        <span className="rounded-md border border-white/20 bg-white/5 px-2.5 py-1 font-mono text-xs text-gray-300">
                          {stat.icon}
                        </span>
                        <span className="text-gray-500 font-mono text-xs">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-bold text-4xl sm:text-5xl font-mono mb-2 text-white">
                        {stat.value.toLocaleString()}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <p className="text-gray-400 font-mono text-sm">
                          {stat.label}
                        </p>
                      </div>
                      <div className="w-full h-px bg-white opacity-20" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={fadeIn("up", "spring", 0.6, 0.75)}
                className="mt-12 flex justify-center"
              >
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group px-8 py-4 text-white font-bold text-lg font-mono"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-black border border-white border-opacity-50 group-hover:border-opacity-100 px-8 py-4 rounded backdrop-blur-sm flex items-center gap-3">
                    <span className="text-gray-400">&gt;</span>
                    <img src={github} alt="GitHub" className="w-6 h-6 invert" />
                    <span>View Full Profile</span>
                    <span className="text-gray-400">_</span>
                  </div>
                </a>
              </motion.div>

              <motion.div
                variants={fadeIn("up", "spring", 0.7, 0.75)}
                className="mt-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
                  <h3 className="text-white font-bold text-2xl font-mono">
                    <span className="text-gray-400">&gt;</span> Recent
                    Repositories
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentRepos.map((repo, index) => (
                    <motion.a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                      className="relative group"
                    >
                      <div className="relative bg-black bg-opacity-80 border border-white border-opacity-30 group-hover:border-white p-5 rounded transition-all duration-300 backdrop-blur-sm cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-white font-bold text-lg font-mono group-hover:text-gray-300 transition-colors">
                            {repo.name}
                          </h4>
                          <div className="flex gap-2 font-mono text-xs">
                            {repo.stars > 0 && (
                              <span className="px-2 py-1 bg-yellow-500 bg-opacity-10 border border-yellow-600 border-opacity-30 rounded text-yellow-400">
                                Star {repo.stars}
                              </span>
                            )}
                            {repo.forks > 0 && (
                              <span className="px-2 py-1 bg-green-500 bg-opacity-10 border border-green-600 border-opacity-30 rounded text-green-400">
                                Fork {repo.forks}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2 font-mono">
                          {repo.description}
                        </p>
                        <div className="w-full h-px bg-white opacity-20 mb-3" />
                        <div className="flex items-center justify-between">
                          {repo.language && (
                            <span className="flex items-center gap-2 text-sm font-mono">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{
                                  backgroundColor:
                                    languageColors[repo.language] || "#888",
                                }}
                              />
                              <span className="text-gray-400">
                                {repo.language}
                              </span>
                            </span>
                          )}
                          <span className="text-gray-500 text-xs font-mono">
                            {repo.updated}
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn("up", "spring", 0.8, 0.75)}
                className="mt-16 flex flex-col gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
                  <h3 className="text-white font-bold text-2xl font-mono">
                    <span className="text-gray-400">&gt;</span> Contribution
                    Activity
                  </h3>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded blur opacity-0 group-hover:opacity-50 transition duration-500 -z-10" />
                  <div className="relative bg-black bg-opacity-80 border border-gray-400 border-opacity-30 group-hover:border-opacity-100 p-6 rounded overflow-hidden backdrop-blur-sm transition-all duration-300">
                    <img
                      src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&background=0D1117&stroke=FFFFFF&ring=FFFFFF&fire=CCCCCC&currStreakLabel=FFFFFF`}
                      alt="GitHub Streak"
                      className="w-full h-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded blur opacity-0 group-hover:opacity-50 transition duration-500 -z-10" />
                  <div className="relative bg-black bg-opacity-80 border border-gray-400 border-opacity-30 group-hover:border-opacity-100 p-6 rounded overflow-hidden backdrop-blur-sm transition-all duration-300">
                    <img
                      src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&hide_border=true&bg_color=0D1117&color=FFFFFF&line=FFFFFF&point=CCCCCC&area=true&area_color=666666`}
                      alt="GitHub Activity Graph"
                      className="w-full h-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded blur opacity-0 group-hover:opacity-50 transition duration-500 -z-10" />
                  <div className="relative bg-black bg-opacity-80 border border-gray-400 border-opacity-30 group-hover:border-opacity-100 p-6 rounded overflow-hidden backdrop-blur-sm transition-all duration-300">
                    <img
                      src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&bg_color=0D1117&title_color=FFFFFF&text_color=FFFFFF&icon_color=CCCCCC`}
                      alt="Most Used Languages"
                      className="w-full h-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(GithubStats, "github");
