// src/utils/xmlParser.ts
import { XMLParser } from 'fast-xml-parser';

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

    let listings: any[] = [];

    if (result.listings) {
      if (Array.isArray(result.listings)) {
        result.listings.forEach((item: any) => {
          if (item.listing) {
            if (Array.isArray(item.listing)) {
              listings = listings.concat(item.listing);
            } else {
              listings.push(item.listing);
            }
          }
        });
      } else if (result.listings.listing) {
        if (Array.isArray(result.listings.listing)) {
          listings = result.listings.listing;
        } else {
          listings = [result.listings.listing];
        }
      }
    } else if (result.listing) {
      if (Array.isArray(result.listing)) {
        listings = result.listing;
      } else {
        listings = [result.listing];
      }
    } else if (result.title && result.listing) {
      if (Array.isArray(result.listing)) {
        listings = result.listing;
      } else {
        listings = [result.listing];
      }
    }

    const processedListings = listings.map((listing: any) => {
      return processListing(listing);
    });

    return processedListings;
  } catch (error) {
    throw new Error('Erro ao converter XML para JSON: ' + error);
  }
};

const processListing = (listing: any) => {
  const {
    destination_id,
    name,
    description,
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

  let processedAddress = '';
  if (address && address.component) {
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
        const component = components.find((comp: any) => {
          return (
            comp['@_name'] === key ||
            comp['@_name'] === key ||
            comp.name === key
          );
        });
        if (component) {
          const value = component['#text'] || component['_'] || '';
          return value;
        }
        return null;
      })
      .filter(Boolean);

    processedAddress = addressParts.join(', ');
  }

  let imageUrl = '';
  let imageCaption = '';
  if (image) {
    imageUrl = image.url || '';
    imageCaption = image.tag || '';
  }

  let types = '';
  if (type) {
    const typesArray = Array.isArray(type) ? type : [type];
    types = typesArray.filter(Boolean).join(', ');
  }

  const formattedPrice = price !== undefined ? `R$ ${price}` : '';

  return {
    destination_id,
    name,
    description,
    address: processedAddress,
    latitude,
    longitude,
    neighborhood,
    image: {
      url: imageUrl,
      caption: imageCaption,
    },
    types,
    price: formattedPrice,
    price_change,
    url,
  };
};

export default xmlParser;
