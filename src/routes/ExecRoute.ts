import { Router, Request, Response } from 'express';
import Joi from 'joi';
import ExecInfo from '../models/ExecInfo';
import HubInfoService from '../services/HubInfoService';
import webSocketAdapter from '../websocket/WebSocketAdapter';

// Schema for base request
const schema = Joi.object({
    cmd: Joi.string().required(),
    resourceType: Joi.string().required(),
    resourceAttribute: Joi.string().required(),
    sites: Joi.string(),
});
const router = Router();

router.get('/', async (req: Request, res: Response) => {

  const { error, value } = schema.validate(req.query);
  if (error) {
    res.status(400).send(`Invalid execution parameters, ${error.message}`);
    return;
  }

  const query: any = { 
    command: value.cmd, 
    resType: value.resourceType.toLowerCase(), 
    resAttribute: value.resourceAttribute.toLowerCase(),
    sites: value.sites ? value.sites.split(",") : []
  };

  const resultsWrapper = await webSocketAdapter.emit<ExecInfo>('getExecInfo', 'sendExecInfo', query)();
  const hubInfo = HubInfoService.unwrap(resultsWrapper);
  res.send(hubInfo);
});

export default router;
