// src/utils/WhatsAppFormatter.util.ts
import { decode } from 'html-entities';

class WhatsAppFormatter {
  static formatToWhatsApp(htmlContent: string): string {
    if (!htmlContent) return '';

    let content = htmlContent;

    // Limpeza inicial
    content = content
      .replace(/\t+/g, '') // Remove tabs
      .replace(/[ ]{2,}/g, ' ') // Remove múltiplos espaços
      .replace(/\*{2,}/g, '*'); // Remove múltiplos asteriscos

    // Remove div containers
    content = content.replace(/<div[^>]*>/g, '');
    content = content.replace(/<\/div>/g, '');

    // Converte quebras de linha HTML
    content = content.replace(/<br\s*\/?>/gi, '\n');

    // Formata títulos como negrito (com quebras de linha)
    content = content.replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g, (_, text) => {
      return `\n\n*${text.trim()}*\n`;
    });

    // Formata parágrafos com quebras de linha adequadas
    content = content.replace(/<p[^>]*>(.*?)<\/p>/g, (_, text) => {
      return `${text.trim()}\n\n`;
    });

    // Formata listas
    content = content.replace(/<ul[^>]*>(.*?)<\/ul>/gs, (_, listContent) => {
      return this.formatUnorderedList(listContent);
    });

    content = content.replace(/<ol[^>]*>(.*?)<\/ol>/gs, (_, listContent) => {
      return this.formatOrderedList(listContent);
    });

    // Formata texto em negrito (com quebras de linha para títulos)
    content = content.replace(
      /<(strong|b)[^>]*>(.*?)<\/\1>/g,
      (_, __, text) => {
        const trimmed = text.trim();
        // Se o texto parecer um título (começa com maiúscula e tem menos de 50 caracteres)
        if (/^[A-Z]/.test(trimmed) && trimmed.length < 50) {
          return `\n\n*${trimmed}*\n`;
        }
        return ` *${trimmed}* `;
      },
    );

    // Formata texto em itálico
    content = content.replace(/<(em|i)[^>]*>(.*?)<\/\1>/g, (_, __, text) => {
      const trimmed = text.trim();
      return ` _${trimmed}_ `;
    });

    // Formata código
    content = content.replace(/<code[^>]*>(.*?)<\/code>/g, (_, text) => {
      const trimmed = text.trim();
      return ` \`${trimmed}\` `;
    });

    // Formata citações
    content = content.replace(
      /<blockquote[^>]*>(.*?)<\/blockquote>/g,
      (_, text) => {
        return `\n\n> ${text.trim()}\n`;
      },
    );

    // Limpa tags HTML remanescentes
    content = content.replace(/<[^>]+>/g, '');

    // Decodifica entidades HTML
    content = decode(content);

    // Processo de limpeza e formatação final
    content = content
      .split('\n')
      .map((line) => line.trim())
      .join('\n')
      // Ajusta quebras de linha
      .replace(/\n{3,}/g, '\n\n') // Máximo de 2 quebras de linha
      .replace(/([.:!?])\s*\n*/g, '$1\n\n') // Adiciona quebra após pontuação
      .replace(/\*([^*\n]+)\*/g, '\n*$1*\n') // Adiciona quebras ao redor de títulos em negrito
      .replace(/\n{3,}/g, '\n\n') // Remove quebras extras
      .replace(/\s+([*_~`])/g, ' $1') // Espaço único antes de marcadores
      .replace(/([*_~`])\s+/g, '$1 ') // Espaço único depois de marcadores
      .replace(/([*_~`])\s*\n/g, '$1\n') // Remove espaços entre marcador e quebra
      .trim();

    // Ajustes finais de formatação
    return content
      .replace(/\*\s*\*/g, '') // Remove asteriscos vazios
      .replace(/_\s*_/g, '') // Remove itálicos vazios
      .replace(/~\s*~/g, '') // Remove tachados vazios
      .replace(/`\s*`/g, '') // Remove código vazio
      .replace(/^\s+|\s+$/gm, '') // Remove espaços no início e fim de cada linha
      .replace(/\n{3,}/g, '\n\n'); // Garante máximo de duas quebras consecutivas
  }

  private static formatUnorderedList(listContent: string): string {
    return (
      '\n' +
      listContent
        .split(/<li[^>]*>/)
        .slice(1)
        .map((item) => {
          const cleanedItem = item.replace(/<\/li>/g, '').trim();
          return cleanedItem ? `- ${cleanedItem}` : '';
        })
        .filter(Boolean)
        .join('\n') +
      '\n\n'
    );
  }

  private static formatOrderedList(listContent: string): string {
    return (
      '\n' +
      listContent
        .split(/<li[^>]*>/)
        .slice(1)
        .map((item, index) => {
          const cleanedItem = item.replace(/<\/li>/g, '').trim();
          return cleanedItem ? `${index + 1}. ${cleanedItem}` : '';
        })
        .filter(Boolean)
        .join('\n') +
      '\n\n'
    );
  }
}

export default WhatsAppFormatter;
