import { GraphQLClient } from 'graphql-request'

var client = null;

// 初始化GraphQLClient，设置header
function init (token) {
  client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
};

// 抓取用户信息
function fetchUserData (login) {
  var query = `{
    ${ !login ? 'viewer' : 'user(login:"${login}")' } {
      avatarUrl(size: 200)
      bio
      company
      createdAt
      email
      followers {
        totalCount
      }
      following {
        totalCount
      }
      isHireable
      issueComments {
        totalCount
      }
      issues {
        totalCount
      }
      location
      login
      name
      organizations(first:100) {
        totalCount
        nodes {
          avatarUrl(size:35)
          members {
            totalCount
          }
          name
          url
        }
      }
      pinnedRepositories(first:6) {
        nodes {
          description
          forks {
            totalCount
          }
          issues {
            totalCount
          }
          isFork
          languages(first:1) {
            nodes {
              color
              name
            }
          }
          name
          stargazers {
            totalCount
          }
          url
        }
      }
      pullRequests {
        totalCount
      }
      repositories(first:6, affiliations:OWNER, orderBy:{field:STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          description
          forks {
            totalCount
          }
          issues {
            totalCount
          }
          isFork
          languages(first:1) {
            nodes {
              color
              name
            }
          }
          name
          stargazers {
            totalCount
          }
          url
        }
      }
      repositoriesContributedTo {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      url
      viewerCanFollow
      viewerIsFollowing
      websiteUrl
    }
  }`
  return client.request(query);
};

// 抓取用户repos
function fetchUserRepos (login, cursor) {
  var after = cursor ? 'after: ' + cursor + ',' : '';
  var query = `query ($login: String!, $count: Int!) {
    user(login: $login) {
      repositories(first: $count, ${after} affiliations:OWNER, orderBy:{field:PUSHED_AT, direction:DESC}) {
        nodes {
          description
          forks {
            totalCount
          }
          isFork
          languages(first:1) {
            nodes {
              color
              name
            }
          }
          name
          stargazers {
            totalCount
          }
          url
          viewerHasStarred
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }`;

  var variables = {
    login: login,
    count: 6
  };

  return client.request(query, variables);
};

// 抓取用户repos
function fetchRepo(owner, name) {
  var query = `query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      branches: refs(refPrefix:"refs/heads/") {
        totalCount
      }
      commits: object(expression:"master") {
        ... on Commit {
          history {
            totalCount
          }
        }
      }
      createdAt
      defaultBranchRef {
        name
      }
      description
      diskUsage
      forkCount
      homepageUrl
      isFork
      issues {
        totalCount
      }
      languages(first:20) {
        nodes {
          name
          color
        }
      }
      licenseInfo {
        name
      }
      name
      parent {
        nameWithOwner
      }
      pullRequests {
        totalCount
      }
      pushedAt
      repositoryTopics(first:20) {
        nodes {
          topic {
            name
          }
        }
      }
      stargazers {
        totalCount
      }
      tags: refs(refPrefix:"refs/tags/") {
        totalCount
      }
      updatedAt
      url
      viewerHasStarred
      watchers {
        totalCount
      }
    }
  }`;

  var variables = {
    owner: owner,
    name: name
  };

  return client.request(query, variables);
};

export default {
  client,
  init,
  fetchUserData,
  fetchUserRepos,
  fetchRepo
};