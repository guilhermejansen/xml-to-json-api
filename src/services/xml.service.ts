import xmlParser from '../utils/xmlParser';

class XMLService {
  async parseXML(xmlData: string) {
    const jsonData = await xmlParser(xmlData);
    return jsonData;
  }
}

export default new XMLService();
