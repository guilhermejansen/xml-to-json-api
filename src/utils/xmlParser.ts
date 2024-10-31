// src/utils/xmlParser.ts
import { XMLParser } from 'fast-xml-parser';
import WhatsAppFormatter from './WhatsAppFormatter.util';

/**
 * Parser XML para processar listagens e formatar texto para WhatsApp
 * @param xmlData String XML para processar
 */
const xmlParser = async (xmlData: string) => {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      allowBooleanAttributes: true,
      parseAttributeValue: true,
      parseTagValue: true,
    });

    const result = parser.parse(xmlData);
    const listings = extractListings(result);
    const processedListings = listings.map(processListing);

    return processedListings;
  } catch (error) {
    throw new Error('Erro ao converter XML para JSON: ' + error);
  }
};

/**
 * Extrai listagens do resultado do parser
 * @param result Resultado do parser XML
 */
const extractListings = (result: any): any[] => {
  let listings: any[] = [];

  if (result.listings) {
    if (Array.isArray(result.listings)) {
      result.listings.forEach((item: any) => {
        if (item.listing) {
          listings = listings.concat(
            Array.isArray(item.listing) ? item.listing : [item.listing],
          );
        }
      });
    } else if (result.listings.listing) {
      listings = Array.isArray(result.listings.listing)
        ? result.listings.listing
        : [result.listings.listing];
    }
  } else if (result.listing) {
    listings = Array.isArray(result.listing)
      ? result.listing
      : [result.listing];
  } else if (result.title && result.listing) {
    listings = Array.isArray(result.listing)
      ? result.listing
      : [result.listing];
  }

  return listings;
};

/**
 * Processa uma listagem individual
 * @param listing Listagem para processar
 */
const processListing = (listing: any) => {
  const {
    destination_id,
    name,
    description,
    short_description,
    address,
    latitude,
    longitude,
    neighborhood,
    image,
    type,
    price,
    price_change,
    url,
  } = listing;

  // Formata as descrições para WhatsApp
  const formattedShortDescription = short_description
    ? WhatsAppFormatter.formatToWhatsApp(short_description)
    : '';
  const formattedDescription = description
    ? WhatsAppFormatter.formatToWhatsApp(description)
    : '';

  // Monta a descrição completa
  let combinedDescription = '';

  if (formattedShortDescription) {
    combinedDescription += formattedShortDescription + '\n\n';
  }

  if (formattedDescription) {
    combinedDescription += formattedDescription;
  }

  // Processa o endereço
  const processedAddress = processAddress(address);

  // Processa imagem
  const processedImage = {
    url: image?.url || '',
    caption: image?.tag || '',
  };

  // Processa tipos
  const types = processTypes(type);

  // Formata preço
  const formattedPrice =
    price !== undefined ? `R$ ${Number(price).toFixed(2)}` : '';

  return {
    destination_id,
    name,
    description: combinedDescription.trim(),
    address: processedAddress,
    latitude,
    longitude,
    neighborhood,
    image: processedImage,
    types,
    price: formattedPrice,
    price_change,
    url,
  };
};

/**
 * Processa o endereço da listagem
 * @param address Objeto de endereço
 */
const processAddress = (address: any): string => {
  if (!address?.component) return '';

  const components = Array.isArray(address.component)
    ? address.component
    : [address.component];

  const orderedComponents = [
    'addr1',
    'city',
    'region',
    'country',
    'postal_code',
  ];

  const addressParts = orderedComponents
    .map((key) => {
      const component = components.find(
        (comp: any) =>
          comp['@_name'] === key || comp['@_name'] === key || comp.name === key,
      );
      return component
        ? (component['#text'] || component['_'] || '').trim()
        : null;
    })
    .filter(Boolean);

  return addressParts.join(', ');
};

/**
 * Processa os tipos da listagem
 * @param type Tipos da listagem
 */
const processTypes = (type: any): string => {
  if (!type) return '';
  const typesArray = Array.isArray(type) ? type : [type];
  return typesArray
    .filter(Boolean)
    .map((t) => t.trim())
    .join(', ');
};

export default xmlParser;
