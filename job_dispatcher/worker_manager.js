// 사용 x
import { Piscina } from 'piscina';
import { AbortController } from 'abort-controller'
import { createArrayMap } from '../common/utils.js';
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class WorkerManager{
  constructor(partitions){
    this.piscina = new Piscina({filename: path.resolve(__dirname, 'worker.js')});
    this.abortController = new AbortController();

    this.partitions = partitions;
    this.numWorkers = 1;
    this.partitionWorkers = new Array(this.numWorkers).fill(null);
    this.workerIndexToPartitions = createArrayMap(this.numWorkers);
  }

  createWorkers(partitions){
    const { signal } = this.abortController;
    for(const partition of partitions){
      this.workerIndexToPartitions.get(partition % this.numWorkers).push(partition)
    }
    for(let i=0; i<this.numWorkers; i++){
      const thisWorkerPartitions = this.workerIndexToPartitions.get(i)
      if(thisWorkerPartitions.length == 0) continue
      const worker = this.piscina.run({partitions: thisWorkerPartitions}, signal)
      this.partitionWorkers[i] = worker
    }
  }

  shutdownWorkers(){
    this.abortController.abort();
  }

  async start(){
    this.createWorkers(this.partitions);
    // await this.piscina.run({partitions: [1,2,3]})
  }
}