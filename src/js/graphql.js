import { GraphQLClient } from 'graphql-request'

var client = null;

// 初始化GraphQLClient，设置header
function init (token) {
  console.log('init gql');
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
function fetchUserRepos (login) {
  var query = `query ($login: String!) {
    user(login: $login) {
      repositories(first:6, affiliations:OWNER, orderBy:{field:PUSHED_AT, direction:DESC}) {
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
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }`;

  var variables = {
    login: login
  };

  return client.request(query, variables);
};

export default { client, init, fetchUserData, fetchUserRepos };