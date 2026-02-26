/** Environment names for config. */
export enum Env {
  development = 'development',
  production = 'production',
  staging = 'staging',
  test = 'test',
  local = 'local',
}

/** Mover lifecycle: resting → loading → on-mission → resting. */
export enum QuestState {
  resting = 'resting',
  loading = 'loading',
  onMission = 'on-mission',
}

/** MissionLog activity types for audit trail. */
export enum ActivityType {
  load = 'load',
  start = 'start',
  end = 'end',
}