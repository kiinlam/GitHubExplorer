var component = {
  props: {
    nodeData: {
      type: Object,
      required: true
    }
  },
  template: `
    <div @click="$emit('repo-click', nodeData)">
      <div class="mt-5 mb-5" font="f14 w700"><a :href="nodeData.url" target="_blank">{{ nodeData.name }}</a></div>
      <div color="minor" flex="1" font="f12">{{ nodeData.description }}</div>
      <div color="minor">
        <div class="repo-tag" v-if="nodeData.isFork"><span>Forked</span></div>
      </div>
      <div class="mt-10" layout="flex" flex-flow="wrap" font="f12" color="minor">
        <template v-if="nodeData.languages.nodes.length">
          <div class="mr-20">
            <span class="icon-lang mr-4" :style="{ background: nodeData.languages.nodes[0].color }"></span>{{ nodeData.languages.nodes[0].name }}
          </div>
        </template>
        <div class="mr-20">
          <span class="icon icon-stars mr-4"></span>{{ nodeData.stargazers.totalCount }}
        </div>
        <div class="mr-20">
          <span class="icon icon-fork mr-4"></span>{{ nodeData.forks.totalCount }}
        </div>
      </div>
    </div>
  `
};

export default component;