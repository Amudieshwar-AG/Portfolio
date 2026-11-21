import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const statsFilePath = path.resolve(__dirname, '../src/data/codingStats.json');

async function fetchLeetCode(username) {
  // Try community proxy first, then fallback to official GraphQL
  try {
    const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (typeof data.totalSolved === 'number') {
        return {
          username,
          totalSolved: data.totalSolved,
          easy: data.easySolved || 0,
          medium: data.mediumSolved || 0,
          hard: data.hardSolved || 0,
          ranking: data.ranking || 0,
          profileUrl: `https://leetcode.com/u/${username}/`
        };
      }
    }
  } catch (e) {
    console.warn('Alfa API failed, trying direct GraphQL...');
  }

  try {
    const query = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
            profile {
              ranking
            }
          }
        }
      `,
      variables: { username }
    };

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify(query)
    });

    if (res.ok) {
      const data = await res.json();
      const submitStats = data?.data?.matchedUser?.submitStats?.acSubmissionNum;
      const ranking = data?.data?.matchedUser?.profile?.ranking || 0;

      if (submitStats) {
        const all = submitStats.find(s => s.difficulty === 'All')?.count || 0;
        const easy = submitStats.find(s => s.difficulty === 'Easy')?.count || 0;
        const medium = submitStats.find(s => s.difficulty === 'Medium')?.count || 0;
        const hard = submitStats.find(s => s.difficulty === 'Hard')?.count || 0;

        return {
          username,
          totalSolved: all,
          easy,
          medium,
          hard,
          ranking,
          profileUrl: `https://leetcode.com/u/${username}/`
        };
      }
    }
  } catch (err) {
    console.error('Failed to fetch LeetCode stats:', err.message);
  }

  return null;
}

async function main() {
  console.log('Fetching coding statistics...');

  // Read existing stats
  let existingStats = {
    leetcode: {
      username: "Amudieshwar",
      totalSolved: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      ranking: 5000001,
      profileUrl: "https://leetcode.com/u/Amudieshwar/"
    },
    skillrack: {
      username: "AMUDIESHWAR A G",
      rollNumber: "2117240070018",
      branch: "Artificial Intelligence",
      totalSolved: 46,
      codeTracks: 36,
      dailyChallenges: 10,
      profileUrl: "https://skillrack.com/faces/ui/profile.xhtml"
    },
    lastUpdated: new Date().toISOString()
  };

  if (fs.existsSync(statsFilePath)) {
    try {
      existingStats = JSON.parse(fs.readFileSync(statsFilePath, 'utf8'));
    } catch (e) {
      console.warn('Error reading existing stats file, using defaults');
    }
  }

  const leetcodeStats = await fetchLeetCode('Amudieshwar');

  const updatedStats = {
    leetcode: leetcodeStats || existingStats.leetcode,
    skillrack: existingStats.skillrack,
    lastUpdated: new Date().toISOString()
  };

  fs.mkdirSync(path.dirname(statsFilePath), { recursive: true });
  fs.writeFileSync(statsFilePath, JSON.stringify(updatedStats, null, 2), 'utf8');
  console.log('Updated codingStats.json successfully:', updatedStats);
}

main();
