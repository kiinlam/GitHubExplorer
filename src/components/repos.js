import repoComponent from '../components/repo.js';

var component = {
  components: {
    'repo-component': repoComponent
  },
  props: {
    nodesData: {
      type: Array,
      required: true
    }
  },
  template: `
    <div class="mt-10" border="top" v-if="nodesData.length">
      <p padding="10" border="bottom" bg="white">
        <slot></slot>
        <span class="flr" font="f12" color="minor">
          <slot name="desc"></slot>
        </span>
      </p>
      <template v-for="node in nodesData">
        <repo-component
          padding="10" 
          border="bottom" 
          bg="white"
          :node-data="node"
        ></repo-component>
      </template>
    </div>
  `
};

export default component;