import reposComponent from '../components/repos.js';  // 用户详情repo模块组件

var component = {
  components: {
    'repos-component': reposComponent
  },
  props: {
    nodeData: {
      type: null,
      required: true
    }
  },
  template: `
    <section class="detail-subject" layout="flex" flex="1">
      <!-- 基本信息 -->
      <div class="mr-20 w220" padding="10">
        <div class="img-wrap detail-subject-avatar">
          <img class="avatar" :src="nodeData.avatarUrl" :alt="nodeData.login">
        </div>
        <div class="mt-10" font="f20">{{ nodeData.name }}</div>
        <div class="mb-10" font="f12" color="minor">{{ nodeData.login }}</div>
        <div class="mb-10" font="f12" color="minor">{{ nodeData.url }}</div>
        <div>{{ nodeData.bio }}</div>
        <div class="mt-10 pt-10" border="top" color="dark">
          <div class="mb-5" v-if="nodeData.company">
            <span class="icon icon-company"></span>
            <span class="ml-5">{{ nodeData.company }}</span>
          </div>
          <div class="mb-5" v-if="nodeData.location">
            <span class="icon icon-location"></span>
            <span class="ml-5">{{ nodeData.location }}</span>
          </div>
          <div class="mb-5" v-if="nodeData.email">
            <span class="icon icon-email"></span>
            <span class="ml-5">{{ nodeData.email }}</span>
          </div>
          <div class="mb-5" v-if="nodeData.websiteUrl">
            <span class="icon icon-website"></span>
            <span class="ml-5">{{ nodeData.websiteUrl }}</span>
          </div>
        </div>
        <div class="mt-10 pt-10" border="top" color="dark" v-if="nodeData.isHireable">
          <div class="mb-5">
            <span class="icon icon-hire"></span>
            <span class="ml-5">正在寻找新的机会</span>
          </div>
        </div>
        <div class="mt-10 pt-10" border="top" color="dark">
          <div class="mb-5">
            <span class="icon icon-clock"></span>
            <span class="ml-5" font="f12" color="minor">{{ nodeData.createdAt | formatTime }}加入</span>
          </div>
        </div>
      </div>

      <!-- Github信息 -->
      <div class="bg-minor" flex="1" style="overflow: auto">
        <p padding="10" border="bottom" bg="white">统计</p>

        <div layout="flex" border="bottom" text="center" bg="white">
          <div flex="1" padding="10" border="right">
            <div font="f24 w700">{{ nodeData.repositoriesContributedTo.totalCount }}</div>
            <div font="f12" color="minor">Repo贡献</div>
          </div>
        
          <div flex="1" padding="10" border="right">
            <div font="f24 w700">{{ nodeData.pullRequests.totalCount }}</div>
            <div font="f12" color="minor">PR发起</div>
          </div>

          <div flex="1" padding="10" border="right">
            <div font="f24 w700">{{ nodeData.issues.totalCount }}</div>
            <div font="f12" color="minor">Issue提出</div>
          </div>

          <div flex="1" padding="10">
            <div font="f24 w700">{{ nodeData.issueComments.totalCount }}</div>
            <div font="f12" color="minor">Issue回复</div>
          </div>
        </div>

        <template v-if="nodeData.organizations.nodes.length">
          <div class="mt-10" border="top">
            <p padding="10" border="bottom" bg="white">组织<span class="numerical ml-10">{{ nodeData.organizations.totalCount }}</span></p>
            <div layout="flex" flex-flow="wrap" bg="white">
              <div padding="10" align="center" v-for="node in nodeData.organizations.nodes">
                <div class="w50"><img width="20" height="20" :src="node.avatarUrl" alt="node.members.totalCount + '人'"></div>
                <div font="f12" title="node.url">{{ node.name }}</div>
              </div>
            </div>
          </div>
        </template>

        <repos-component :nodes-data="nodeData.pinnedRepositories.nodes" desc="来自用户设置">
          Pinned Repos
          <template slot="desc">来自用户设置</template>
        </repos-component>

        <repos-component :nodes-data="nodeData.repositories.nodes" desc="根据Stars排行">
          Popular Repos
          <template slot="desc">根据Stars排行</template>
        </repos-component>

      </div>

    </section>
  `
};

export default component;