import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '65m5tzie',
    dataset: 'production'
  },
  // Pin the hosted Studio hostname to avoid interactive prompts during deploy
  studioHost: 'lysechko-agency'
})