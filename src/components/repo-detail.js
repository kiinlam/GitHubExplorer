var initList = function (text) {
  return {
    data: function () {
      return {
        text: text
      };
    },
    template: `
      <section class="detail-subject" flex="1" flex-align="self-center" text="center">
        {{ text }}
      </section>
    `
  };
};

var dataList = function () { 
  return {
    props: {
      nodeData: {
        type: null,
        required: true
      }
    },
    methods: {
      repoClick: function (node) {
        this.$emit('repo-click', node);
      }
    },
    template: `
      <section class="detail-subject bg-minor" flex="1">
        <div layout="flex" padding="10" bg="white" border="bottom">
          <div flex="1">
            <div font="f18 w700">{{ nodeData.name }}</div>
            <small v-if="nodeData.isFork">forked from {{ nodeData.parent.nameWithOwner }}</small>
          </div>
          <div layout="flex" flex-align="y-start">
            <div class="status-tag"><span>Watch</span><span>{{ nodeData.watchers.totalCount }}</span></div>
            <div class="status-tag ml-10"><span>Star</span><span>{{ nodeData.stargazers.totalCount }}</span></div>
            <div class="status-tag ml-10"><span>Fork</span><span>{{ nodeData.forkCount }}</span></div>
          </div>
        </div>

        <div class="mt-10" border="top" bg="white">
          <!-- Code -->
          <div padding="10" border="bottom">Code<span class="flr" color="minor" font="f12" v-if="nodeData.licenseInfo">{{ nodeData.licenseInfo.name }}</span></div>

          <div padding="10" border="bottom">
            <div>{{ nodeData.description }} <span class="ml-10" color="link">{{ nodeData.homepageUrl }}</span></div>
            <div class="mt-5" font="f12" color="minor" v-if="nodeData.repositoryTopics.nodes.length">
              Topics:<span class="ml-10" v-for="node in nodeData.repositoryTopics.nodes">{{ node.topic.name }}</span>
            </div>
          </div>

          <!-- 统计 -->
          <div layout="flex" padding="10" border="bottom" text="center">
            <div flex="1" border="right">
              <div font="f16 w700">{{ nodeData.commits.history.totalCount }}</div>
              <div color="minor">commits</div>
            </div>
            <div flex="1" border="right">
              <div font="f16 w700">{{ nodeData.branches.totalCount }}</div>
              <div color="minor">branches</div>
            </div>
            <div flex="1" border="right">
              <div font="f16 w700">{{ nodeData.tags.totalCount }}</div>
              <div color="minor">releases</div>
            </div>
            <div flex="1">
              <div font="f16 w700">{{ nodeData.diskUsage / 1024 | toFixed(2) }}</div>
              <div color="minor">size(MB)</div>
            </div>
          </div>

          <!-- 语言 -->
          <div padding="10" border="bottom" v-if="nodeData.languages.nodes.length">
            <div layout="flex" text="center">
              <div flex="1" v-for="node in nodeData.languages.nodes">
                <span class="icon-lang mr-4" :style="{background: node.color}"></span>{{ node.name }}
              </div>
            </div>
          </div>

          <div padding="10" border="bottom" font="f12" color="minor">
            最后推送时间：{{ nodeData.pushedAt | formatTime }}
          </div>

        </div>

        <div class="mt-10" border="top" bg="white">
          <!-- Issues -->
          <div padding="10" border="bottom">Issues</div>

          <!-- open issues -->
          <div padding="10" border="bottom">
            <p>Open<span class="numerical ml-10" color="minor">{{ nodeData.issuesOpen.totalCount }}</span></p>
          </div>

          <!-- Closed issues -->
          <div padding="10" border="bottom">
            <p>Closed<span class="numerical ml-10" color="minor">{{ nodeData.issuesClosed.totalCount }}</span></p>
          </div>

        </div>

        <div class="mt-10" border="top" bg="white">
          <!-- Pull requests -->
          <div padding="10" border="bottom">Pull requests</div>

          <!-- Open pullRequests -->
          <div padding="10" border="bottom">
            <p>Open<span class="numerical ml-10" color="minor">{{ nodeData.pullRequestsOpen.totalCount }}</span></p>
          </div>

          <!-- Closed pullRequests -->
          <div padding="10" border="bottom">
            <p>Closed<span class="numerical ml-10" color="minor">{{ nodeData.pullRequestsClosed.totalCount }}</span></p>
          </div>

        </div>

      </section>
    `
  };
};

var component = {
  functional: true,
  render: function (createElement, context) {
    var props = context.props;
    var nodeData = props.nodeData;
    var elem = null;
    
    if (!nodeData) {
      elem = initList('请选择Repository');
    } else if (nodeData.status === 2) {
      elem = dataList();
    } else {
      elem = initList('加载中...');
    }
    
    return createElement(
      elem,
      context.data,
      context.children
    );
  }
};

export default component;