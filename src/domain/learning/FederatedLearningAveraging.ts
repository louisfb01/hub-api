const tf = require("@tensorflow/tfjs-node");
import HubTrainResponse from "../../models/Response/HubTrainResponse";
import Redis from "./RedisDataProcessor";

async function averageWeights(siteResults: HubTrainResponse[]) {
  const averageWeight = siteResults[0].weights;
  let jobID = siteResults[0].job;
  let currentMeanWeights: any = []

  for(let i = 0; i < averageWeight.weights.length; i++){
    let weightI: any = []
    siteResults.forEach(sr =>{
      let weight = sr.weights.weights[i].split(",");
      weightI.push(tf.tensor(new Float32Array(weight)))
    }) 
    currentMeanWeights.push(new Float32Array(tf.stack(weightI).mean(0).dataSync()).toString());
  }
  Redis.addList(jobID+'weight', currentMeanWeights)
  let oldMeans: any[] = []
  await Redis.listRange(jobID+'weight', 0, -1)
      .then(res => {
          if(res){
              res.forEach((r: string) => oldMeans.push(JSON.parse(r)))
          }
      }
  )
  let meanofAllWeights = [] //mean using all old weights
  for(let y = 0; y < oldMeans[0].length; y++){ //x = for each weights in weightArray
    let weightI: any = []
    for(let x = 0; x < oldMeans.length; x++){//y = for each previous mean
      weightI.push(tf.tensor(new Float32Array(oldMeans[x][y]))) //tensor of old mean
    }
    meanofAllWeights.push(new Float32Array(tf.stack(weightI).mean(0).dataSync()).toString())
  }

  averageWeight.weigths = meanofAllWeights;
  return averageWeight;
}

function averageMetrics(siteResults: any) {

  const numOfSites = siteResults.length;

  var averageMetrics = siteResults.reduce((accumulator:any, item:any) => {
    Object.keys(item).forEach(key => {
      accumulator[key] = (accumulator[key] || 0) + item[key];
    });
    return accumulator;
  }, {});

  Object.keys(averageMetrics).forEach(metric => {
    averageMetrics[metric] = averageMetrics[metric] / numOfSites 
  });

  return averageMetrics;
}

export default {
  averageWeights,
  averageMetrics,
};
