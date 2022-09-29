import express from 'express';
import HospitalInfo from '../models/HospitalInfo';
import HospitalSummariesServices from '../services/HospitalSummariesServices';
import webSocketAdapter from '../websocket/WebSocketAdapter';

var router = express.Router();

router.get('/', async (req, res) => {
  const resultsWrapper = await webSocketAdapter.emit<HospitalInfo>('getHospitalInfo', 'sendHospitalInfo')();

  const hospitalSummaries = HospitalSummariesServices.calculateSummariesFromInfo(resultsWrapper);
  res.send(hospitalSummaries);
});

export default router;