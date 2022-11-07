export default class Schedule{
  constructor(ddbItem){
    this.shardId = ddbItem.shard_id.S
    this.dateToken = ddbItem.date_token.S
    this.jobStatus = ddbItem.job_status.S
    this.jobSpec = JSON.parse(ddbItem.job_spec.S)
  }
}