var component = {
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  template: `
    <div class="pointer" @click="$emit('repo-click', node)">
      <div class="mt-5 mb-5" font="f14 w700">{{ node.name }}</div>
      <div color="minor">{{ node.description }}</div>
      <div class="repo-tag" color="minor" v-if="node.isFork"><span>Forked</span></div>
      <div class="mt-10" color="minor">
          <template v-if="node.languages.nodes.length">
            <span class="cake mr-3" :style="{ background: node.languages.nodes[0].color }"></span><span class="ml-5 mr-20">{{ node.languages.nodes[0].name }}</span>
          </template>
          <span class="icon icon-stars"></span><span class="ml-5 mr-20">{{ node.stargazers.totalCount }}</span>
          <span class="icon icon-fork"></span><span class="ml-5 mr-20">{{ node.forks.totalCount }}</span>
      </div>
    </div>
  `
};

export default component;