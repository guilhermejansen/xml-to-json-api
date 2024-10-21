import { Request, Response, NextFunction } from 'express';
import xmlService from '../services/xml.service';

class XMLController {
  async parseXML(req: Request, res: Response, next: NextFunction) {
    try {
      const xmlData = req.body;
      const jsonData = await xmlService.parseXML(xmlData);
      res.json(jsonData);
    } catch (error) {
      next(error);
    }
  }
}

export default new XMLController();
