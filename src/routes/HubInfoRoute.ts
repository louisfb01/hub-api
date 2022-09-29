import express from 'express';
import SiteInfo from '../models/SiteInfo';
import HubInfoService from '../services/HubInfoService';
import webSocketAdapter from '../websocket/WebSocketAdapter';

var router = express.Router();

router.get('/', async (req, res) => {
  const resultsWrapper = await webSocketAdapter.emit<SiteInfo>('getSiteInfo', 'sendSiteInfo')();

  const hubInfo = HubInfoService.unwrap(resultsWrapper);
  res.send(hubInfo);
});

export default router;